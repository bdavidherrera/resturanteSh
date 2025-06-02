//Rollos de la API
const url = "http://localhost:8000/api/rollos"
const urlRollos = "http://localhost:8000/api/rollos/RegistrarRollos"
const urlActualizarRollos = "http://localhost:8000/api/rollos/ActualizarRollos"
const urlEliminarRollos = "http://localhost:8000/api/rollos/EliminarRollos/:idrollos"

//Categorias de la API
const urlC = "http://localhost:8000/api/categorias"
const urlRegistrarCategoria = "http://localhost:8000/api/categorias/RegistrarAdmin"
const urlActualizarCategoria = "http://localhost:8000/api/categorias/ActualizarCategoria"

//promociones de la API
const urlP = "http://localhost:8000/api/Promociones"
const urlRegistrarPromocion = "http://localhost:8000/api/promociones/Registrar"
const urlActualizarPromocion = "http://localhost:8000/api/promociones/Actualizar"
const urlEliminarPromocion = "http://localhost:8000/api/Promociones/EliminarPromociones/:idPromociones"
//Calificaciones de la API
const urlCal = "http://localhost:8000/api/calificaciones"
const urlCalAdmin = "http://localhost:8000/api/calificaciones/admin"
const urlEliminarCalificacionAdmin = "http://localhost:8000/api/calificaciones/admindeleteCal/:idcalificacion"

//Usuarios de la API
const urlRegistarUsu = "http://localhost:8000/Registrar";
const urlLoginUsu = "http://localhost:8000/Login";
const urlUsuarios = "http://localhost:8000/api/usuarios/admin"
const urlActualizarUsuarios = "http://localhost:8000/api/usuarios/Actualizar";
const  urlEliminarUsuarios = "http://localhost:8000/api/usuarios/EliminarUsuario/:idusuarios";

export const obtainRollos = async ()=>{
    try {
        const resultado = await fetch(url);
        const rollos = await resultado.json();
        return rollos;
    } catch (error) {
        console.error("error al obtener los rollos");
    }
}

export const RegistrarRollosA = async (datosRollos) => {
    try {
        const response = await fetch(`${urlRollos}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosRollos)
            
        });
        
        
        const resultado = await response.json();
        return resultado;
        
    } catch (error) {
        console.error("Error al registrar rollos:", error);
    }
}

export const actualizarRollos = async (datosRollos) => {
    try {
        const response = await fetch(`${urlActualizarRollos}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosRollos)
        });
        const resultado = await response.json();
        return resultado;                                   
    } catch (error) {
        console.error("Error al actualizar rollos:", error);
    }
}

export const eliminarRollos = async (idrollos) => {
    try {
        const response = await fetch(`${urlEliminarRollos.replace(':idrollos', idrollos)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }   
        });
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error("Error al eliminar el rollo:", error);
    }
}

export const obtainCategorias = async ()=>{
    try {
        const resultadoCategoria = await fetch(urlC);
        const categorias = await resultadoCategoria.json();
        return categorias;
    } catch (error) {
        console.error("error al obtener las categorias");
    }
}

export const registrarCategoriasAdmin = async (datosCategorias) => {
    try {
        const response = await fetch(`${urlRegistrarCategoria}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosCategorias)
        });
        
        const resultado = await response.json();
        return resultado;
        
    } catch (error) {
        console.error("Error al registrar Categorias:", error);
    }
}

export const actualizarCategoriasAdmin = async (datosCategorias) => {
    try {
        const response = await fetch(`${urlActualizarCategoria}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosCategorias)
        });
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error("Error al actualizar Categorias:", error);
    }
}



export const obtainPromociones = async ()=>{
    try {
        const resultadoPromociones = await fetch(urlP);
        const Promociones = await resultadoPromociones.json();
        return Promociones;
    } catch (error) {
        console.error("error al obtener las Promociones");
    }
}

export const registrarPromociones = async (datosPromocion) => {
    try {
        const response = await fetch(`${urlRegistrarPromocion}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosPromocion)
        });
        
        const resultado = await response.json();
        return resultado;
        
    } catch (error) {
        console.error("Error al registrar Promocion:", error);
    }
}

export const actualizarPromociones = async (datosPromocion) => {
    try {
        const response = await fetch(`${urlActualizarPromocion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosPromocion)
        });
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error("Error al actualizar Promocion:", error);
    }
}

export const eliminarPromocion = async (idPromociones) => {
    try {
        const response = await fetch(`${urlEliminarPromocion.replace(':idPromociones', idPromociones)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const resultado = await response.json();
        return resultado;
        
    } catch (error) {
        console.error("Error al eliminar la promoción:", error);
    }   
}

export const obtainCalificaciones = async ()=>{
    try {
        const resultadoCalificaciones = await fetch(urlCal);
        const calificaciones = await resultadoCalificaciones.json();
        return calificaciones;
    } catch (error) {
        console.error("error al obtener las calificaciones");
    }
}

export const obtainCalificacionesAdmin = async ()=>{
    try {
        const resultadoCalificaciones = await fetch(urlCalAdmin);
        const calificaciones = await resultadoCalificaciones.json();
        return calificaciones;
    } catch (error) {
        console.error("error al obtener las calificaciones");
    }
}

export const deleteCalificacionAdmin = async (idcalificacion) => {
    try {
        const response = await fetch(`${urlEliminarCalificacionAdmin.replace(':idcalificacion', idcalificacion)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const resultado = await response.json();
        return resultado;
        
    }
    catch (error) {
        console.error("Error al eliminar la calificación:", error);
    }
}



export const registrarUsuario = async (datosUsuario) => {
    try {
        const response = await fetch(`${urlRegistarUsu}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosUsuario)
        });
        
        const resultado = await response.json();
        return resultado;
        
    } catch (error) {
        console.error("Error al registrar usuario:", error);
    }
}


export const loginUsuario = async (datosLogin) => {
    try {
        const response = await fetch(`${urlLoginUsu}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosLogin)
        });
        
        const resultado = await response.json();
        return resultado;
        
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
}



export const obtainUsuarios = async ()=>{
    try {
        const resultadousuarios = await fetch(urlUsuarios);
        const usuarios = await resultadousuarios.json();
        return usuarios;
    } catch (error) {
        console.error("error al obtener los usuarios");
    }
}

export const actualizarUsuarios = async (datosUsuarios) => {
    try {
        const response = await fetch(`${urlActualizarUsuarios}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosUsuarios)
        });
        const resultado = await response.json();
        return resultado;                                   
    } catch (error) {
        console.error("Error al actualizar usuarios:", error);
    }
} 

export const eliminarUsuarios = async (idusuarios) => {
    try {
        const response = await fetch(`${urlEliminarUsuarios.replace(':idusuarios', idusuarios)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }   
        });
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
    }
}





