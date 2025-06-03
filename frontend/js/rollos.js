import { obtainRollos } from "../apiConnection/consumeApi.js";

// Variables globales
let rollosData = [];

// Iconos para diferentes tipos de ingredientes
const ingredientesIconos = {
    'salmon': 'fas fa-fish',
    'atun': 'fas fa-fish',
    'camaron': 'fas fa-shrimp',
    'cangrejo': 'fas fa-crab',
    'aguacate': 'fas fa-leaf',
    'pepino': 'fas fa-leaf',
    'arroz': 'fas fa-seedling',
    'nori': 'fas fa-leaf',
    'sesamo': 'fas fa-circle',
    'tempura': 'fas fa-fire',
    'queso': 'fas fa-cheese',
    'mayonesa': 'fas fa-drop',
    'salsa': 'fas fa-tint',
    'philadelphia': 'fas fa-cheese',
    'mango': 'fas fa-apple-alt',
    'fresa': 'fas fa-strawberry',
    'kiwi': 'fas fa-kiwi-bird',
    'default': 'fas fa-utensils'
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Cargar datos
        rollosData = await obtainRollos();
        mostrarRollos(rollosData);
        
        // Configurar filtros
        configurarFiltros();
        
        // Configurar eventos de modales
        configurarModalEventos();
    } catch (error) {
        console.error('Error al cargar rollos:', error);
        mostrarError("No se pudieron cargar los rollos. Intente más tarde.");
    }
});

// Mostrar mensaje de error
function mostrarError(mensaje) {
    document.getElementById("rollos-container").innerHTML = 
        `<div class="col-12 text-center">
            <div class="alert alert-warning" role="alert">
                <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                <p class="mb-0">${mensaje}</p>
            </div>
        </div>`;
}

// Mostrar rollos como tarjetas
function mostrarRollos(rollos) {
    const container = document.getElementById("rollos-container");
    container.innerHTML = '';
    
    // Mostrar mensaje si no hay rollos
    if (rollos.length === 0) {
        mostrarError("No se encontraron rollos con los filtros seleccionados.");
        return;
    }
    
    // Actualizar opciones de categorías
    actualizarCategoriasFilter(rollos);
    
    // Crear tarjetas para cada rollo
    rollos.forEach(rollo => {
        container.appendChild(crearTarjetaRollo(rollo));
    });
}

// Actualizar filtro de categorías
function actualizarCategoriasFilter(rollos) {
    const filtroCategoria = document.getElementById("filtro-categoria");
    if (!filtroCategoria || filtroCategoria.options.length > 1) return;
    
    // Obtener categorías únicas
    const categorias = [...new Set(rollos.map(rollo => rollo.idenc).filter(Boolean))];
    
    // Agregar opciones al selector
    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = `Categoría ${categoria}`;
        filtroCategoria.appendChild(option);
    });
}

// Crear una tarjeta de rollo mejorada
function crearTarjetaRollo(rollo) {
    const { idrollos, nombre, descripccion, ingredientes, cantidad, calificacion, precio, idenc, imagen } = rollo;

    // Preparar la imagen
    const rutaImagen = !imagen || imagen === 'NULL' ? 'img/default_sushi.jpg' :
        imagen.toLowerCase().startsWith('img/') ? imagen : `img/${imagen}`;

    // Crear elemento columna con clases Bootstrap correctas
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';

    // Generar lista de ingredientes con iconos
    const ingredientesArray = ingredientes ? ingredientes.split(',').map(ing => ing.trim()) : [];
    const ingredientesHTML = ingredientesArray.slice(0, 3).map(ingrediente => {
        const icono = obtenerIconoIngrediente(ingrediente.toLowerCase());
        return `<span class="ingrediente-tag">
                    <i class="${icono}"></i> ${ingrediente}
                </span>`;
    }).join('');

    const masIngredientes = ingredientesArray.length > 3 ?
        `<span class="ingrediente-tag more">+${ingredientesArray.length - 3}</span>` : '';

    // Construir tarjeta con estructura Bootstrap estándar
    colDiv.innerHTML = `
        <div class="card rollo-card h-100" data-id="${idrollos}" data-categoria="${idenc}" data-precio="${precio}">
            <div class="position-relative">
                <img src="${rutaImagen}" 
                     class="card-img-top rollo-image" 
                     alt="${nombre}"
                     style="height: 200px; object-fit: cover;">
                
                <style>
    .btn-ver-detalle {
        background-color: var(--neon-red);
        color: var(--white);
        border: none;
        font-size: 0.85rem;
        padding: 0.4rem 0.75rem;
        border-radius: 4px;
        box-shadow: var(--neon-glow);
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .btn-ver-detalle:hover {
        background-color: var(--dark-red);
        box-shadow: 0 0 15px var(--neon-red);
    }

    .card-img-overlay-custom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: end;
        padding: 0;
        z-index: 10;
    }

    .btn-ver-detalle i {
        margin-right: 4px;
    }
</style>

<div class="card-img-overlay-custom">
    <button class="btn-ver-detalle m-2" data-id="${idrollos}">
        <i class="fas fa-eye"></i> Calificar
    </button>
</div>

                
                <div class="position-absolute" style="top: 10px; right: 10px;">
                </div>
            </div>
            
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${nombre}</h5>
                
                <p class="card-text text-muted small flex-grow-1">${descripccion}</p>
                
                <div class="ingredientes-section mb-3">
                    <h6 class="small text-muted mb-2">
                        <i class="fas fa-list-ul"></i> Ingredientes:
                    </h6>
                    <div class="ingredientes-container">
                        ${ingredientesHTML}
                        ${masIngredientes}
                    </div>
                </div>
                
                <div class="card-footer bg-transparent px-0 pb-0">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="rating-section">
                            <div class="d-flex align-items-center">
                                <div class="estrellas-small">
                                    ${generarEstrellas(calificacion)}
                                </div>
                                <span class="ml-2 text-muted small">(${calificacion})</span>
                            </div>
                        </div>
                        
                        <div class="precio-section">
                            <span class="h5 text-primary mb-0">$${parseInt(precio).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return colDiv;
}

// Obtener icono apropiado para cada ingrediente
function obtenerIconoIngrediente(ingrediente) {
    for (const [key, icono] of Object.entries(ingredientesIconos)) {
        if (ingrediente.includes(key)) {
            return icono;
        }
    }
    return ingredientesIconos.default;
}

// Generar estrellas basadas en calificación
function generarEstrellas(calificacion) {
    const estrellaLlena = '<i class="fas fa-star text-warning"></i>';
    const estrellaMedia = '<i class="fas fa-star-half-alt text-warning"></i>';
    const estrellaVacia = '<i class="far fa-star text-muted"></i>';
    const total = 5;
    
    let resultado = '';
    for (let i = 1; i <= total; i++) {
        if (i <= Math.floor(calificacion)) {
            resultado += estrellaLlena;
        } else if (i === Math.ceil(calificacion) && calificacion % 1 !== 0) {
            resultado += estrellaMedia;
        } else {
            resultado += estrellaVacia;
        }
    }
    
    return resultado;
}

// Configurar filtros
function configurarFiltros() {
    const filtros = ['filtro-categoria', 'filtro-precio'];
    filtros.forEach(id => {
        const filtro = document.getElementById(id);
        if (filtro) filtro.addEventListener("change", aplicarFiltros);
    });
}

// Aplicar filtros seleccionados
function aplicarFiltros() {
    const categoriaSeleccionada = document.getElementById("filtro-categoria")?.value || "";
    const ordenPrecio = document.getElementById("filtro-precio")?.value || "";
    
    // Filtrar por categoría
    let resultado = categoriaSeleccionada ? 
        rollosData.filter(rollo => rollo.idenc?.toString() === categoriaSeleccionada) : 
        [...rollosData];
    
    // Ordenar por precio
    if (ordenPrecio) {
        resultado.sort((a, b) => ordenPrecio === "asc" ? a.precio - b.precio : b.precio - a.precio);
    }
    
    // Mostrar resultados filtrados
    mostrarRollos(resultado);
}

// Configurar eventos del modal
function configurarModalEventos() {
    // Delegación de eventos para botones de ver detalle
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-ver-detalle')) {
            const rolloId = e.target.closest('.btn-ver-detalle').dataset.id;
            mostrarDetalleRollo(rolloId);
        }
    });
}

// Mostrar detalle del rollo en modal
function mostrarDetalleRollo(rolloId) {
    const rollo = rollosData.find(r => r.idrollos.toString() === rolloId);
    if (!rollo) return;
    
    const { idrollos, nombre, descripccion, ingredientes, cantidad, calificacion, precio, imagen } = rollo;
    
    // Preparar la imagen
    const rutaImagen = !imagen || imagen === 'NULL' ? 'img/default_sushi.jpg' : 
                       imagen.toLowerCase().startsWith('img/') ? imagen : `img/${imagen}`;
    
    // Llenar el modal con información
    const modalElements = {
        imagen: document.getElementById('modal-rollo-imagen'),
        nombre: document.getElementById('modal-rollo-nombre'),
        descripcion: document.getElementById('modal-rollo-descripcion'),
        precio: document.getElementById('modal-rollo-precio'),
        calificacion: document.getElementById('modal-rollo-calificacion'),
        ingredientes: document.getElementById('modal-rollo-ingredientes'),
        estrellas: document.getElementById('estrellas-container'),
        disponibilidad: document.getElementById('modal-disponibilidad')
    };
    
    // Verificar que los elementos existen antes de usarlos
    if (modalElements.imagen) modalElements.imagen.src = rutaImagen;
    if (modalElements.nombre) modalElements.nombre.textContent = nombre;
    if (modalElements.descripcion) modalElements.descripcion.textContent = descripccion;
    if (modalElements.precio) modalElements.precio.textContent = parseInt(precio).toLocaleString();
    if (modalElements.calificacion) modalElements.calificacion.textContent = `${calificacion}/5`;
    
    // Generar ingredientes con iconos en el modal
    if (modalElements.ingredientes) {
        const ingredientesArray = ingredientes ? ingredientes.split(',').map(ing => ing.trim()) : [];
        modalElements.ingredientes.innerHTML = ingredientesArray.map(ingrediente => {
            const icono = obtenerIconoIngrediente(ingrediente.toLowerCase());
            return `<div class="d-flex align-items-center mb-2">
                        <i class="${icono} text-primary mr-2"></i>
                        <span>${ingrediente}</span>
                    </div>`;
        }).join('');
    }
    
    // Generar estrellas en el modal
    if (modalElements.estrellas) {
        modalElements.estrellas.innerHTML = generarEstrellas(calificacion);
    }
    
    // Actualizar badge de disponibilidad
    if (modalElements.disponibilidad) {
        if (cantidad > 0) {
            modalElements.disponibilidad.className = 'badge badge-success';
            modalElements.disponibilidad.innerHTML = `<i class="fas fa-check-circle"></i> ${cantidad} disponibles`;
        } else {
            modalElements.disponibilidad.className = 'badge badge-danger';
            modalElements.disponibilidad.innerHTML = '<i class="fas fa-times-circle"></i> Agotado';
        }
    }
    
    // Mostrar el modal (verificar que jQuery y el modal existen)
    if (typeof $ !== 'undefined' && $('#rolloModal').length) {
        $('#rolloModal').modal('show');
    }
}

// Exportar funciones si es necesario
export { mostrarRollos, configurarFiltros };