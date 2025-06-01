import { obtainRollos, RegistrarRollosA , obtainCategorias, actualizarRollos} from "../../apiConnection/consumeApi.js";


 

document.addEventListener("DOMContentLoaded", ()=>{
    const tablaRollos = document.querySelector('#Rollos-tbody')
    const registrarRollosAdmins= document.querySelector('#addRolloForm')
    const formActualizarRollos = document.querySelector('#editRolloForm');
    if(tablaRollos){
        getRollos(),
        getCategoriasRollos(),
        mostrarTotalRollos();
    }
    if(registrarRollosAdmins){
        registrarRollosAdmin(registrarRollosAdmins);
    }
    if(formActualizarRollos){
        actualizarRollosAdmin(formActualizarRollos);
    }
})


async function getRollos(){
const rollosObtained = await obtainRollos();
const container = document.querySelector('#Rollos-tbody')
container.innerHTML = "";

rollosObtained.forEach((rollos)=>{

const{idrollos, nombre, descripccion, ingredientes, cantidad, calificacion, precio, id_categoria, imagen} = rollos

const row = document.createElement('tr')
row.innerHTML=`
<td>
${idrollos}
</td>
<td>
${nombre}
</td>
<td>
${descripccion}
</td>
<td>
${ingredientes}
</td>

<td>
${cantidad}
</td>
<td>
${calificacion}
</td>

<td>
${precio}
</td>
<td>
${id_categoria}
</td>

<td>
<div class="rollo-imagen-container">
    <img src="img/${imagen}" width="40px" class="rollo-imagen">
</div>
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

async function mostrarTotalRollos() {
    const rollosObtained = await obtainRollos();
    const total = rollosObtained.length;

    const totalElement = document.querySelector('#rollos-count');

    if (totalElement) {
        totalElement.textContent = `Total de rollos: ${total}`;
    }

    return total;
}

async function registrarRollosAdmin(formAgregarRollos) {
    const obtainCategoriasRollos = await obtainCategorias();
    formAgregarRollos.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        const inputImagen = document.getElementById("rolloImagen");
        const fileName= inputImagen.files[0]?.name || "";

        const datosRollos = {
            nombre: document.getElementById("rolloNombre").value,
            descripccion: document.getElementById("rolloDescripcion").value,
            ingredientes: document.getElementById("rolloIngredientes").value,
            cantidad: document.getElementById("rolloCantidad").value,
            calificacion: document.getElementById("rolloCalificacion").value,
            precio: document.getElementById("rolloPrecio").value,
            id_categoria: document.getElementById("rolloCategoria").value,
            imagen: fileName
        };

        try {
            const resultado = await RegistrarRollosA(datosRollos);
           if (resultado) {
                alert("Rollos registrada con éxito.");
                formAgregarRollos.reset();
                const modalElement = document.getElementById('addRolloModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
                getRollos();
                mostrarTotalRollos();
            } else {
                console.log("El resultado no fue válido:", resultado);
                }

        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Hubo un error al registrar el rollo.");
        }
    });
}


async function getCategoriasRollos() {
    try {
        const categoriasObtained = await obtainCategorias();
        
        // Obtener ambos selects
        const selectIngresar = document.querySelector('#rolloCategoria');
        const selectEditar = document.querySelector('#editRolloCategoria');
        
        // Limpiar selects
        selectIngresar.innerHTML = '<option value="">Seleccionar categoría</option>';
        selectEditar.innerHTML = '<option value="">Seleccionar categoría</option>';
        
        // Poblar los selects con las categorías obtenidas
        categoriasObtained.forEach((categoria) => {
            const { idcategoria, nombre } = categoria;
            
            // Crear opción para select de ingreso
            const optionIngresar = document.createElement('option');
            optionIngresar.value = idcategoria;
            optionIngresar.textContent = `${idcategoria} - ${nombre}`;
            selectIngresar.appendChild(optionIngresar);
            
            // Crear opción para select de edición
            const optionEditar = document.createElement('option');
            optionEditar.value = idcategoria;
            optionEditar.textContent = `${idcategoria} - ${nombre}`;
            selectEditar.appendChild(optionEditar);
        });
        
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        alert("No se pudieron cargar las categorías");
    }
}

async function actualizarRollosAdmin(formActualizarRollos) {
    formActualizarRollos.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const inputImagen = document.getElementById("editRolloImagen");
        const imagenActual = document.getElementById("editRolloImagenActual").value;

        const fileName = inputImagen.files.length > 0 ? inputImagen.files[0].name : imagenActual;

        const datosRollos = {
            idrollos: document.getElementById("editRolloId").value,
            nombre: document.getElementById("editRolloNombre").value,
            descripccion: document.getElementById("editRolloDescripcion").value,
            ingredientes: document.getElementById("editRolloIngredientes").value,
            cantidad: document.getElementById("editRolloCantidad").value,
            calificacion: document.getElementById("editRolloCalificacion").value,
            precio: document.getElementById("editRolloPrecio").value,
            id_categoria: document.getElementById("editRolloCategoria").value,
            imagen: fileName
        };

        try {
            const resultado = await actualizarRollos(datosRollos);
            if (resultado) {
                alert("Rollos actualizado con éxito.");
                formActualizarRollos.reset();
                const modalElement = document.getElementById('editRolloModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
                getRollos();
                mostrarTotalRollos();
            } else {
                console.log("El resultado no fue válido:", resultado);
            }
        } catch (error) {
            console.error("Error en la actualización:", error);
            alert("Hubo un error al actualizar el rollo.");
        }
    });
}   