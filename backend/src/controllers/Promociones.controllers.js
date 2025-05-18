import getConnection from "../db/database.js"

const getPromociones = async (req, res)=>{
    try {
        const connection = await getConnection();
        const result= await connection.query("SELECT * FROM Promociones");
        res.json(result) 
    } catch (error) {
        console.error("ERROR 500");
    }
    
}

export const methodHTPP = {
    getPromociones
}