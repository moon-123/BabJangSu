import * as ingredientsRepository from '../data/ingredient.js'



// 데이터 로드
const allData = await ingredientsRepository.fetch_data();
const healthInfo = await ingredientsRepository.getInfo();


// getCategory 함수에서 사용
export async function getCategory(req, res) {
    try {
        const categoryId = req.params.id;
        if (categoryId === '전체') {
            // console.log(healthInfo)
            res.status(200).json({allData: allData.Grid_20171128000000000572_1.row, healthInfo: healthInfo});
        } else {
            const filteredData = filterDataByCategory(allData, categoryId);
            const categoryInfo = healthInfo.filter(item => item.category === categoryId)
            res.status(200).json({allData: filteredData, healthInfo: categoryInfo });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// getOneEffect 함수에서 사용
export async function getOneEffect(req, res) {
    try {
        const ingredientID = req.params.id;
        console.log(ingredientID);
        const oneEffect = allData.Grid_20171128000000000572_1.row.filter((item) => item.PRDLST_NM.trim() == ingredientID);
        console.log(oneEffect);
        res.status(200).json(oneEffect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function filterDataByCategory(data, categoryId) {
    const filteredData = [];
    for (const item of data.Grid_20171128000000000572_1.row) {
        if (item.EFFECT.includes(categoryId)) {
            filteredData.push(item);
        }
    }
    return filteredData;
}
