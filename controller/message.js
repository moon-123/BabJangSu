// CoolSMS SDK를 불러옵니다.
import coolsms from 'coolsms-node-sdk';
import { config } from '../config.js';

// config.js에서 불러온 CoolSMS API Key와 API Secret을 사용합니다.
const apiKey = config.message.apiKey;
const apiSecret = config.message.apiSecret;

const sms = coolsms.default;
const messageService = new sms(apiKey, apiSecret);

let verificationStorage = {};

// 랜덤 인증 번호를 생성하는 함수
function generateVerificationCode(length) {
  const numbers = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return code;
}

// 인증 문자를 보내는 함수
export async function sendVerificationMessage(phoneNumber) {
    // 이미 해당 번호로 인증 번호가 생성되어 있는지 확인
    if (verificationStorage[phoneNumber]) {
        return { verificationCode: verificationStorage[phoneNumber] };
    }

    // 인증 번호 생성
    const verificationCode = generateVerificationCode(6); // 6자리 인증 코드 생성
  
    try {
        // 메시지를 설정합니다.
        const params = {
            to: phoneNumber, // 수신 전화번호
            from: config.message.senderNumber, // 발신 전화번호도 config에서 불러옵니다.
            text: `인증 번호는 ${verificationCode}입니다.`, // 메시지 내용
            };
            
            // 메시지를 보냅니다.
            const response = await messageService.sendOne(params);
            verificationStorage[phoneNumber] = verificationCode;
            return { verificationCode, response }; // 인증 코드와 응답을 함께 반환
        } catch (error) {
            console.error(error); // 오류 로깅
            throw error; // 오류를 다시 던집니다.
        }
    
}

export function getVerificationCode(phoneNumber) {
    return verificationStorage[phoneNumber];
}

// 전화번호로 인증번호 보내기
async function sendVerification(req, res) {
    const phoneNumber = req.body.phnumber;
    try {
        const { verificationCode } = await sendVerificationMessage(phoneNumber);
        console.log(verificationCode)
        // 인증번호 저장 로직 필요
        res.status(200).json({ message: '인증번호가 전송되었습니다.', verificationCode });
         // 실제 운영시에는 인증번호를 반환하지 않습니다.
    } catch (error) {
        res.status(500).json({ message: '인증번호 전송 실패', error: error.toString() });
    }
}

// 인증번호 검증
async function verifyCode(req, res) {
    const { phnumber, verificationCode  } = req.body;
    // 나중에 삭제
    console.log(phnumber)
    console.log(verificationCode)
    try {
        // 저장된 인증번호와 제출된 인증번호를 비교합니다.
        const storedCode = verificationStorage[phnumber];
        if (verificationCode === storedCode) {
            res.status(200).json({ message: '인증 성공' });
        } else {
            res.status(400).json({ message: '잘못된 인증번호' });
        }
    } catch (error) {
        res.status(500).json({ message: '인증 검증 실패', error: error.toString() });
    }
}

export { sendVerification, verifyCode };