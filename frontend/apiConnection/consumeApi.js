//Rollos de la API
const url = "http://localhost:8000/api/rollos"
const urlRollos = "http://localhost:8000/api/rollos/RegistrarRollos"
//Categorias de la API
const urlC = "http://localhost:8000/api/categorias"
const urlRegistrarCategoria = "http://localhost:8000/api/categorias/RegistrarAdmin"
//promociones de la API
const urlP = "http://localhost:8000/api/Promociones"
const urlRegistrarPromocion = "http://localhost:8000/api/promociones/Registrar"
//Calificaciones de la API
const urlCal = "http://localhost:8000/api/calificaciones"
const urlCalAdmin = "http://localhost:8000/api/calificaciones/admin"

//Usuarios de la API
const urlRegistarUsu = "http://localhost:8000/Registrar";
const urlLoginUsu = "http://localhost:8000/Login";
const urlUsuarios = "http://localhost:8000/api/usuarios/admin"

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





