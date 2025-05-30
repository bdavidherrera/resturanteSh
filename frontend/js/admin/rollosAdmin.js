import { obtainRollos } from "../../apiConnection/consumeApi.js";


document.addEventListener("DOMContentLoaded", ()=>{
    const tablaRollos = document.querySelector('#Rollos-tbody')
    if(tablaRollos){
        getRollos(),
        mostrarTotalRollos();
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
