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

const upatePromociones = async (req, res) => {
    try {
        const { idPromociones, nombre, descripcion, imagen, precio } = req.body;

        const Promociones = {
            nombre,
            descripcion,
            imagen,
            precio
        };

        const connection = await getConnection();
        console.log("Conexión obtenida [PUT /Promociones/:id]");
        
        const result = await connection.query(
            "UPDATE Promociones SET ? WHERE idPromociones = ?",
            [Promociones, idPromociones]
        );

        res.json(result);
    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({ message: "Error al actualizar la promoción" });
    }
};

const deletePromociones = async (req, res) => {
    try {
        const { idPromociones } = req.params;
        const connection = await getConnection();
        console.log("Conexión obtenida [DELETE /Promociones/:id]");
        const result = await connection.query("DELETE FROM Promociones WHERE idPromociones = ?", [idPromociones]);
        res.json(result);
    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({ message: "Error al eliminar la promoción", error: error.message });
    }
};

export const methodHTPP = {
    getPromociones,
    postPromociones,
    upatePromociones,
    deletePromociones
}