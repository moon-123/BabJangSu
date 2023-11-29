import jwt from 'jsonwebtoken';
import * as userReository from '../data/auth.js';
import { config } from '../config.js';

const AUTH_ERROR = {message: '인증 에러!'};


export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!(authHeader && authHeader.startsWith('Bearer '))){
        console.log('에러1');
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        // decoded는 해독 결과가 들어감
        token, config.jwt.secretKey, async (error, decoded) => {
            if(error){
                console.log('에러2');
                return res.status(401).json(AUTH_ERROR);
            }
            
            console.log(decoded);
            const user = await userReository.findById(decoded.id);
            console.log(user);

            if(!user){
                console.log('에러3');
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            console.log(req.userId);
            next();
        }
    )    
};