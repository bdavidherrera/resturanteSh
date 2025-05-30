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

const rollosPost = async (req, res)=>{
    try {
        const {nombre, descripccion, ingredientes, cantidad, calificacion, precio, id_categoria, imagen}= req.body;
        

        const rollos = {
            nombre, descripccion, ingredientes, cantidad, calificacion, precio, id_categoria, imagen
        }
    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({message:"error al crear el rollo", error: error.message});
        
    }
}


const postCategoriasAdmin = async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;

        const categoria = {
            nombre, 
            descripcion, 
            estado 
        };
        const connection =  await getConnection();
        console.log("Conexión obtenida [POST /categorias]");
        const result = await connection.query("INSERT INTO categorias SET ?", categoria);
        res.json(result);

    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({ message: "Error al crear la categoria" , error: error.message });

    }
};





export const methodHTPP = {
    getRollos
}