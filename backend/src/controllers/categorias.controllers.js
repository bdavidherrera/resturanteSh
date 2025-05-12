import getConnection from "../db/database.js"

const getCategorias = async (req, res)=>{
    try {
        const connection = await getConnection();
        const result= await connection.query("SELECT * FROM categorias ")
        res.json(result) 
    } catch (error) {
        console.error("ERROR 500");
    }
    
}

export const methodHTPP = {
    getCategorias
}