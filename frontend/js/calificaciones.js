import { obtainCalificaciones } from "../apiConnection/consumeApi.js";

export const mostrarCalificaciones = async () => {
    try {
        const calificaciones = await obtainCalificaciones();
        console.log("Calificaciones recibidas:", calificaciones);
        const contenedor = document.getElementById('calificaciones-container');

        // Limpiar contenedor antes de agregar nuevas calificaciones
        contenedor.innerHTML = '';

        if (calificaciones.length === 0) {
            contenedor.innerHTML = `
                <div class="col-12 text-center">
                    <p>No hay calificaciones disponibles</p>
                </div>
            `;
            return;
        }

        calificaciones.forEach(calificacion => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                            <div class="calificacion-card">
                                <div class="calificacion-header">
                                    <div class="usuario-info">
                                        <h4>${calificacion.Cliente}</h4>
                                        <div class="estrellas">
                                            ${generarEstrellas(calificacion.Calificación)}
                                        </div>
                                    </div>
                                </div>
                                <div class="calificacion-texto">
                                    <p>"${calificacion.Comentario}"</p>
                                </div>
                                <div class="rollo-info">
                                    <p><strong>Rollo:</strong> ${calificacion['Nombre del Rollo']}</p>
                                    <p><strong>Precio:</strong> $${calificacion.Precio}</p>
                                    <p><strong>Categoría:</strong> ${calificacion.Categoria}</p>
                                    <div class="rollo-imagen-container">
                                        <img src="img/${calificacion.Imagen}" alt="${calificacion['Nombre del Rollo']}" class="rollo-imagen">
                                    </div>
                                </div>
                                <div class="calificacion-fecha">
                                    ${formatearFecha(calificacion['Fecha de Calificación'])}
                                </div>
                            </div>     
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.log("Calificaciones recibidas:", calificaciones);
        console.error('Error al mostrar calificaciones:', error);
        document.getElementById('calificaciones-container').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Error al cargar las calificaciones</p>
            </div>
        `;
    }
};

// Función auxiliar para generar estrellas según la calificación
function generarEstrellas(puntuacion) {
    let estrellas = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= puntuacion) {
            estrellas += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= puntuacion) {
            estrellas += '<i class="fas fa-star-half-alt"></i>';
        } else {
            estrellas += '<i class="far fa-star"></i>';
        }
    }
    return estrellas;
}

// Función auxiliar para formatear la fecha
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

// Llamar a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', mostrarCalificaciones);



