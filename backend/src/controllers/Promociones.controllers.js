import getConnection from "../db/database.js"

const getPromociones = async (req, res)=>{
    try {
        const connection =  await getConnection();
        console.log("Conexión obtenida [GET /Promociones]");
        const result= await connection.query("SELECT * FROM Promociones");
        res.json(result) 

    } catch (error) {
        console.error("ERROR 500");
    }
    
}

const postPromociones = async (req, res) => {
    try {
        const { nombre, descripcion, imagen, precio} = req.body;

        const Promociones = {
            nombre,
            descripcion,
            imagen,
            precio
        };
        const connection = await getConnection();
        console.log("Conexión obtenida [POST /Promociones]");
        const result = await connection.query("INSERT INTO Promociones SET ?", Promociones);
        res.json(result);

    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({ message: "Error al insertar la promocion" });
    }
};


export const methodHTPP = {
    getPromociones,
    postPromociones
}