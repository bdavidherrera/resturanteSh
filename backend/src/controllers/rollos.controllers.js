import getConnection from "../db/database.js"

const getRollos = async (req, res)=>{
    try {
        const connection = await getConnection();
        console.log("Conexión obtenida [GET /rollos]");
        const result= await connection.query("SELECT * FROM rollos ")
        res.json(result) 
    } catch (error) {
        console.error("ERROR 500");
    }
    
}

const postRollos = async (req, res)=>{
    try {
        const {nombre, descripccion, ingredientes, cantidad, calificacion, precio, id_categoria, imagen}= req.body;
        
        const rollos = {
            nombre, descripccion, ingredientes, cantidad, calificacion, precio, id_categoria, imagen
        }

        const connection =  await getConnection();
        console.log("Conexión obtenida [POST /categorias]");
        const result = await connection.query("INSERT INTO rollos SET ?", rollos);
        res.json(result);
    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({message:"error al crear el rollo", error: error.message});
        
    }
}





export const methodHTPP = {
    getRollos,
    postRollos
}