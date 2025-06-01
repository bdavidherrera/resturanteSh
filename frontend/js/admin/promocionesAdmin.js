import { obtainPromociones, registrarPromociones , actualizarPromociones} from "../../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", ()=>{
    const tablaPromociones = document.querySelector('#promociones-tbody')
    const formAgregarUsuariof = document.getElementById("addPromocionForm");
    const formEditarPromocion = document.getElementById("editPromocionForm");
    if(tablaPromociones){
        getPromociones(),
        mostrarTotalPromociones();
    }
    if(formAgregarUsuariof){
        registrarPromocionesAdmin();
    }
    if(formEditarPromocion){
        editarPromocionesAdmin();
    }
})


async function getPromociones(){
const promocionesObtained = await obtainPromociones();
const container = document.querySelector('#promociones-tbody')

container.innerHTML = "";

promocionesObtained.forEach((promocion)=>{

const{idPromociones, nombre, descripcion, imagen, precio} = promocion

const row = document.createElement('tr')
row.innerHTML=`
<td>
${idPromociones}
</td>
<td>
${nombre}
</td>
<td>
${descripcion}
</td>
<td>
${precio}
</td>
<td>
<div class="rollo-imagen-container">
    <img src="img/${imagen}" width="50px" class="rollo-imagen">
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


async function mostrarTotalPromociones() {
    const promosionesObtained = await obtainPromociones();
    const total = promosionesObtained.length;

    const totalElement = document.querySelector('#promociones-count');

    if (totalElement) {
        totalElement.textContent = `Total de promociones: ${total}`;
    }

    return total;
}

async function registrarPromocionesAdmin() {
    const formAgregarPromocionf = document.getElementById("addPromocionForm");

    formAgregarPromocionf.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que el formulario se recargue
        const inputImagen = document.getElementById("promoImagen");
        const fileName = inputImagen.files[0]?.name || "";

        const datosPromocion = {
            nombre: document.getElementById("promoNombre").value,
            descripcion: document.getElementById("promoDescripcion").value,
            precio: document.getElementById("promoPrecio").value,
            imagen: fileName // solo el nombre del archivo
            
        };

        try {
            const resultado = await registrarPromociones(datosPromocion);
           if (resultado) {
                alert("Promocion registrada con éxito.");
                formAgregarPromocionf.reset();
                const modalElement = document.getElementById('addPromocionModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();

                getPromociones();
                mostrarTotalPromociones();
            } else {
                console.log("El resultado no fue válido:", resultado);
                }

        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Hubo un error al registrar la promocion.");
        }
    });
}


async function editarPromocionesAdmin() {
    const formEditarPromocion = document.getElementById("editPromocionForm");

    formEditarPromocion.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que recargue la página

        const imagenInput = document.getElementById("editPromoImagen");
        const imagenActual = document.getElementById("editPromoImagenActual").value;
        const imagen = imagenInput.files[0]?.name || imagenActual;

        const datosPromocion = {
            idPromociones: document.getElementById("editPromoId").value,
            nombre: document.getElementById("editPromoNombre").value,
            descripcion: document.getElementById("editPromoDescripcion").value,
            precio: document.getElementById("editPromoPrecio").value,
            imagen // solo se envía el nombre, no el archivo
        };

        try {
            const resultado = await actualizarPromociones(datosPromocion); 
            if (resultado) {
                alert("Promoción actualizada con éxito.");
                formEditarPromocion.reset();

                const modalElement = document.getElementById("editPromocionModal");
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();

                getPromociones(); 
            } else {
                alert("No se pudo actualizar la promoción.");
            }
        } catch (error) {
            console.error("Error al actualizar promoción:", error);
            alert("Ocurrió un error al intentar actualizar la promoción.");
        }
    });
}


