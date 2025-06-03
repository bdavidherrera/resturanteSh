import getConnection from "../db/database.js"

const getCalificaciones = async (req, res)=>{
    try {
        const connection = await getConnection();
        console.log("Conexión obtenida [GET /calificaciones]");
        const result= await connection.query("SELECT r.nombre AS 'Nombre del Rollo', r.imagen AS 'Imagen', r.precio AS 'Precio', r.id_categoria AS 'Categoria' ,c.puntuacion AS 'Calificación', c.comentario AS 'Comentario', u.correo AS 'Cliente', c.fecha AS 'Fecha de Calificación' FROM rollos r JOIN calificaciones c ON r.idrollos = c.fk_id_rollo JOIN usuarios u ON c.fk_id_cliente = u.idusuarios WHERE u.roles = 'cliente' ORDER BY c.fecha DESC;");
        res.json(result)
    } catch (error) {
    console.error("ERROR 500:", error);
    res.status(500).json({ message: "Error al obtener calificaciones", error: error.message });
}
}

const postCalificaciones = async (req, res) => {
  try {
    const { comentario, fk_id_cliente, fk_id_rollo, puntuacion } = req.body;

    const calificacion = {
      comentario,
      fk_id_cliente,
      fk_id_rollo,
      puntuacion,
    };

    const connection = await getConnection();
    console.log("Conexión obtenida [POST /calificaciones]");
    const result = await connection.query("INSERT INTO calificaciones SET ?", calificacion);
    res.json(result);
  } catch (error) {
    console.error("ERROR 500:", error);
    res.status(500).json({ message: "Error al crear calificación", error: error.message });
  }
};


const getCalificacionesAdmin = async (req, res)=>{
    try {
        const connection = await getConnection();
        console.log("Conexión obtenida [GET /categoriasAdmin]");
        const result= await connection.query("SELECT r.nombre AS 'NombreR' ,c.puntuacion AS 'Calificación', c.comentario AS 'Comentario', u.correo AS 'Cliente', c.fecha AS 'Fecha', c.idcalificacion FROM rollos r JOIN calificaciones c ON r.idrollos = c.fk_id_rollo JOIN usuarios u ON c.fk_id_cliente = u.idusuarios WHERE u.roles = 'cliente' ORDER BY c.fecha DESC;");
        res.json(result)
    } catch (error) {
        console.error("ERROR 500");
        console.error(error);
    }
    
}

const deleteCalificacionAdmin = async (req, res) => {   
    try {
        const { idcalificacion } = req.params;
        const connection = await getConnection();
        console.log("Conexión obtenida [DELETE /calificacionesAdmin/:idcalificacion]");
        const result = await connection.query("DELETE FROM calificaciones WHERE idcalificacion = ?", [idcalificacion]);
        res.json(result);
    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({ message: "Error al eliminar la calificación", error: error.message });
    }
}

export const methodHTPP = {
    getCalificaciones,
    getCalificacionesAdmin,
    deleteCalificacionAdmin,
    postCalificaciones
}







