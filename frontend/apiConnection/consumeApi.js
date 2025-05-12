const url = "http://localhost:8000/api/rollos"
const urlC = "http://localhost:8000/api/categorias"

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

