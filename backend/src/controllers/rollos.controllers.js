import getConnection from "../db/database.js"

const getRollos = async (req, res)=>{
    try {
        const connection = await getConnection();
        const result= await connection.query("SELECT * FROM rollos ")
        res.json(result) 
    } catch (error) {
        console.error("ERROR 500");
    }
    
}

export const methodHTPP = {
    getRollos
}