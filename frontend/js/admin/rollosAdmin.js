import { obtainRollos, RegistrarRollosA} from "../../apiConnection/consumeApi.js";


document.addEventListener("DOMContentLoaded", ()=>{
    const tablaRollos = document.querySelector('#Rollos-tbody')
    const registrarRollos = document.querySelector("#addRolloForm")
    if(tablaRollos){
        getRollos(),
        mostrarTotalRollos();
    }
    if(registrarRollos){
        registrarRollosAdmin();
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


async function registrarRollosAdmin() {
    const formAgregarRollos = document.getElementById("#addRolloForm");

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
            precio: document.getElementById("precio").value,
            id_categoria: document.getElementById("id_categoria").value,
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