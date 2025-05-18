const url = "https://iki-sudhi-pokes-brayan-herrera-manuel.onrender.com/api/rollos"
const urlC = "https://iki-sudhi-pokes-brayan-herrera-manuel.onrender.com/api/categorias"
const urlP = "https://iki-sudhi-pokes-brayan-herrera-manuel.onrender.com/api/Promociones"

export const obtainRollos = async ()=>{
    try {
        const resultado = await fetch(url);
        const rollos = await resultado.json();
        return rollos;
    } catch (error) {
        console.error("error al obtener los rollos");
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

export const obtainPromociones = async ()=>{
    try {
        const resultadoPromociones = await fetch(urlP);
        const Promociones = await resultadoPromociones.json();
        return Promociones;
    } catch (error) {
        console.error("error al obtener las Promociones");
    }
}

