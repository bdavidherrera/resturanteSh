import getConnection from "../db/database.js"

const getCategorias = async (req, res)=>{
    try {
        const connection =  await getConnection();
        console.log("Conexión obtenida [GET /categorias]");
        const result= await connection.query("SELECT * FROM categorias WHERE estado = 1");
        res.json(result) 
    } catch (error) {
        console.error("ERROR 500", error);
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
    getCategorias,
    postCategoriasAdmin
}