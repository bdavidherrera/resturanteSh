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

export const methodHTPP = {
    getCalificaciones,
    getCalificacionesAdmin
}







