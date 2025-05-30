import { obtainCalificacionesAdmin } from "../../apiConnection/consumeApi.js";

document.addEventListener("DOMContentLoaded", ()=>{
    const tablaCalificaciones = document.querySelector('#calificaciones-tbody')
    if(tablaCalificaciones){
        getCalificaciones();
    }
})


async function getCalificaciones(){
const calificacionesObtained = await obtainCalificacionesAdmin();
const container = document.querySelector('#calificaciones-tbody')
container.innerHTML = "";

calificacionesObtained.forEach((calificacion)=>{

const{idcalificacion, Calificación, Comentario, Fecha, NombreR, Cliente} = calificacion

const row = document.createElement('tr')
row.innerHTML=`
<td>
${idcalificacion}
</td>
<td>
${Calificación}
</td>
<td>
${Comentario}
</td>
<td>
${formatearFecha(Fecha)}
</td>
<td>
${NombreR}
</td>
<td>
${Cliente}
</td>
<td>
<button class="btn btn-sm btn-delete">
<i class="fas fa-trash"></i>
</button>
</td>
`;
container.appendChild(row);
})
}

function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}