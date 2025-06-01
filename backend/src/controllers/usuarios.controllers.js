import getConnection from "../db/database.js"

const postUsuarios = async (req, res) => {
    try {
        const { cedula, nombre_completo, correo, contraseña, numero, estado, roles } = req.body;

        const usuario = {
            cedula, 
            nombre_completo, 
            correo, 
            contraseña, 
            numero, 
            estado, 
            roles
        };
        const connection =  await getConnection();
        console.log("Conexión obtenida [POST /Usuarios]");
        const result = await connection.query("INSERT INTO usuarios SET ?", usuario);
        res.json(result);

    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};


const getLoginUser= async (req, res)=>{
    try {
        console.log(req.body);
        const {correo, contraseña} =req.body
        const connection = await getConnection();
        console.log("Conexión obtenida [GET /LoginUser]");
        const result= await connection.query("SELECT idusuarios, cedula, correo, nombre_completo, contraseña, roles FROM usuarios WHERE correo = ? AND contraseña = ? AND estado=1 ", [correo, contraseña])
        res.json(result) 
        
    } catch (error) {
        console.error("ERROR 500");
    }
    
}

const getUsuriosAdmin= async (req, res)=>{
    
    try {
        const connection = await getConnection();
        console.log("Conexión obtenida [GET /UsuariosAdmin]");
        const result= await connection.query("SELECT * FROM usuarios WHERE roles= 'cliente' AND estado = 1")
        res.json(result) 
        
    } catch (error) {
        console.error("ERROR 500");
        console.error(error);
    }
    
}

const putUsuarios = async (req, res) => {
    try {
        const { idusuarios, cedula, nombre_completo, correo, contraseña, numero, estado, roles } = req.body;

        const usuario = {
            cedula, 
            nombre_completo, 
            correo, 
            contraseña, 
            numero, 
            estado, 
            roles
        };
        const connection =  await getConnection();
        console.log("Conexión obtenida [PUT /Usuarios]");
        const result = await connection.query("UPDATE usuarios SET ? WHERE idusuarios = ?", [usuario, idusuarios]);
        res.json(result);

    } catch (error) {
        console.error("ERROR 500:", error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
};


export const methodHTPP = {
    postUsuarios, 
    getLoginUser,
    getUsuriosAdmin,
    putUsuarios
}