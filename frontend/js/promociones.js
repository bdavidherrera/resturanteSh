import { obtainPromociones } from "../apiConnection/consumeApi.js";



// Función principal para mostrar las promociones
export const mostrarPromociones = async () => {
    try {
        // Obtener las promociones desde la API
        const promociones = await obtainPromociones();
        
        // Seleccionar el contenedor del carrusel
        const carouselInner = document.querySelector('#carouselPromos .carousel-inner');
        const indicatorsContainer = document.querySelector('#carouselPromos .carousel-indicators');
        
        // Limpiar el carrusel antes de agregar nuevas promociones
        carouselInner.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        
        // Verificar si hay promociones disponibles
        if (promociones && promociones.length > 0) {
            // Crear y agregar las slides al carrusel
            promociones.forEach((promo, index) => {
                const slide = crearSlidePromocion(promo, index === 0);
                carouselInner.appendChild(slide);
                
                // Crear indicadores
                const indicator = crearIndicadorPromocion(index);
                indicatorsContainer.appendChild(indicator);
            });
            
            // Inicializar el carrusel
            $('#carouselPromos').carousel();
        } else {
            // Mostrar mensaje si no hay promociones
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <div class="promo-image d-flex align-items-center justify-content-center" style="height: 500px; background-color: rgba(0,0,0,0.7);">
                        <div class="text-center">
                            <h3 class="glow-text">No hay promociones disponibles</h3>
                            <p class="text-white">Pronto tendremos nuevas ofertas especiales para ti</p>
                        </div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error al mostrar las promociones:', error);
        document.querySelector('#carouselPromos .carousel-inner').innerHTML = `
            <div class="carousel-item active">
                <div class="promo-image d-flex align-items-center justify-content-center" style="height: 500px; background-color: rgba(255,0,0,0.2);">
                    <div class="text-center">
                        <h3 class="text-danger">Error al cargar promociones</h3>
                        <p class="text-white">Por favor, intente más tarde</p>
                    </div>
                </div>
            </div>
        `;
    }
};

// Función para crear un slide de promoción
const crearSlidePromocion = (promo, esActivo) => {
    const slide = document.createElement('div');
    slide.className = `carousel-item ${esActivo ? 'active' : ''}`;
    
    slide.innerHTML = `
        <div class="promo-image">
            <img src="img/${promo.imagen}" alt="${promo.nombre}" class="img-fluid">
            <div class="carousel-caption">
                <h3 class="glow-text">${promo.nombre}</h3>
                <p>${promo.descripcion || '¡Promoción especial!'}</p>
                ${promo.precio ? `<div class="promo-price neon-text">$${promo.precio}</div>` : ''}
            </div>
        </div>
    `;
    
    return slide;
};

// Función para crear un indicador de promoción
const crearIndicadorPromocion = (index) => {
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselPromos');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) indicator.className = 'active';
    
    return indicator;
};

// Ejecutar la función principal cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', mostrarPromociones);