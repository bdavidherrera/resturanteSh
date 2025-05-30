import { obtainCategorias } from "../apiConnection/consumeApi.js";

// Función principal para mostrar las categorías
export const mostrarCategorias = async () => {
    try {
        // Obtener las categorías desde la API
        const categorias = await obtainCategorias();
        
        // Seleccionar el contenedor donde se mostrarán las categorías
        const categoriasContainer = document.getElementById('categorias-container');
        
        // Limpiar el contenedor antes de agregar nuevas categorías
        categoriasContainer.innerHTML = '';
        
        // Verificar si hay categorías disponibles
        if (categorias && categorias.length > 0) {
            // Crear y agregar las cards de categorías al contenedor
            categorias.forEach(categoria => {
                const categoriaCard = crearCardCategoria(categoria);
                categoriasContainer.appendChild(categoriaCard);
            });

            // Agregar event listeners a los botones después de crear las cards
            agregarEventListeners();
        } else {
            // Mostrar mensaje si no hay categorías
            categoriasContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted">No hay categorías disponibles en este momento.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error al mostrar las categorías:', error);
        document.getElementById('categorias-container').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Error al cargar las categorías. Por favor, intente más tarde.</p>
            </div>
        `;
    }
};

// Función para crear una card de categoría
const crearCardCategoria = (categoria) => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';
    
    col.innerHTML = `
        <div class="categoria-card h-100">
            <div class="card-content">
                <h3 class="neon-text">${categoria.idcategoria} ${categoria.nombre}</h3>
                <p>${categoria.descripcion || 'Descubre nuestros deliciosos rollos en esta categoría.'}</p>
                <button class="btn btn-sm btn-custom ver-rollos-btn" data-categoria-id="${categoria.idcategoria}">
                    Ver rollos
                </button>
            </div>
        </div>
    `;
    
    return col;
};

// Función para agregar event listeners a los botones
const agregarEventListeners = () => {
    const botones = document.querySelectorAll('.ver-rollos-btn');
    
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const categoriaId = e.target.getAttribute('data-categoria-id');
            
            // Desplazarse a la sección de rollos
            document.getElementById('rollos').scrollIntoView({ behavior: 'smooth' });
            
        
            const filtroCategoria = document.getElementById('filtro-categoria');
            if (filtroCategoria) {
                filtroCategoria.value = categoriaId;
                
                // Disparar evento change para que se aplique el filtro
                const event = new Event('change');
                filtroCategoria.dispatchEvent(event);
            }
        });
    });
};

// Ejecutar la función principal cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', mostrarCategorias);