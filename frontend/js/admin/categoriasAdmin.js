import { obtainCategorias, registrarCategoriasAdmin, actualizarCategoriasAdmin } from "../../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", ()=>{
    const tablaCategorias = document.querySelector('#categorias-tbody')
    const insertarCategoria = document.querySelector('#addCategoriaForm')
    const ActualizarCategoria = document.querySelector('#editCategoriaForm')
    if(tablaCategorias){
        getCategorias();
    }
    if(insertarCategoria){
        registrarCategorias();
    }
    if(ActualizarCategoria){
        actualizarCategorias();
    }
})


async function getCategorias(){
const categoriasObtained = await obtainCategorias();
const container = document.querySelector('#categorias-tbody')
container.innerHTML = "";

categoriasObtained.forEach((categorias)=>{

const{idcategoria, nombre, descripcion, estado} = categorias

const row = document.createElement('tr')
row.innerHTML=`
<td>
${idcategoria}
</td>
<td>
${nombre}
</td>
<td>
${descripcion}
</td>
<td>
${estadoCategoria(estado)}
</td>
<td>
<button class="btn btn-sm btn-edit">
<i class="fas fa-edit"></i>
</button>
<button class="btn btn-sm btn-delete">
<i class="fas fa-trash"></i>
</button>
</td>
`;
container.appendChild(row);
})
}

function estadoCategoria(estado) {
    if (estado == 1) {
        return "activa";
    } else if(estado == 0){
        return "desactivada";
    }
}

async function registrarCategorias() {
    const formAgregarCategoria = document.getElementById("addCategoriaForm");

    formAgregarCategoria.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que el formulario se recargue

        const datosCategoria = {
            nombre: document.getElementById("categoriaNombre").value,
            descripcion: document.getElementById("categoriaDescripcion").value,
            estado: "1"

        };

        try {
            const resultado = await registrarCategoriasAdmin(datosCategoria);
           if (resultado.affectedRows > 0) {
                alert("Categoria registrado con éxito.");
                formAgregarCategoria.reset();
                const modalElementCategoria = document.getElementById('addCategoriaModal');
                const modalCategoria = bootstrap.Modal.getInstance(modalElementCategoria);
                if (modalCategoria) modalCategoria.hide();
                getCategorias();
            } else {
                alert("La categoria no se pudo registrar.", resultado);
                }

        } catch (error) {
            console.error("Error al registrar la categoria:", error);
            alert("Hubo un error al registrar la categoria. Revisa tus datos.");
            
        }
    });
}


async function actualizarCategorias() {
    const formActualizarCategoria = document.getElementById("editCategoriaForm");

    formActualizarCategoria.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que el formulario se recargue

        const datosCategoria = {
            idcategoria: document.getElementById("editCategoriaId").value,
            nombre: document.getElementById("editCategoriaNombre").value,
            descripcion: document.getElementById("editCategoriaDescripcion").value,
            estado: document.getElementById("editCategoriaEstado").value
        };

        try {
            const resultado = await actualizarCategoriasAdmin(datosCategoria);
            if (resultado.affectedRows > 0) {
                alert("Categoria actualizada con éxito.");
                formActualizarCategoria.reset();
                const modalElementCategoria = document.getElementById('editCategoriaModal');
                const modalCategoria = bootstrap.Modal.getInstance(modalElementCategoria);
                if (modalCategoria) modalCategoria.hide();
                getCategorias();
            } else {
                alert("La categoria no se pudo actualizar.", resultado);
            }
        } catch (error) {
            console.error("Error al actualizar la categoria:", error);
            alert("Hubo un error al actualizar la categoria. Revisa tus datos.");
        }
    });
}




