import { obtainRollos } from "../apiConnection/consumeApi.js";

// Variables globales
let rollosData = [];

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Cargar datos
        rollosData = await obtainRollos();
        mostrarRollos(rollosData);
        
        // Configurar filtros
        configurarFiltros();
    } catch (error) {
        mostrarError("No se pudieron cargar los rollos. Intente más tarde.");
    }
});

// Mostrar mensaje de error
function mostrarError(mensaje) {
    document.getElementById("rollos-container").innerHTML = 
        `<div class="col-12 text-center"><p>${mensaje}</p></div>`;
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

// Crear una tarjeta de rollo
function crearTarjetaRollo(rollo) {
    const { idrollos, nombre, descripccion, ingredientes, cantidad, calificacion, precio, idenc, imagen } = rollo;
    
    // Preparar la imagen
    const rutaImagen = !imagen || imagen === 'NULL' ? 'img/default_sushi.jpg' : 
                       imagen.toLowerCase().startsWith('img/') ? imagen : `img/${imagen}`;
    
    // Crear elemento columna
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 col-sm-6 mb-4';
    
    // Construir tarjeta
    colDiv.innerHTML = `
        <div class="rollo-card" data-id="${idrollos}" data-categoria="${idenc}" data-precio="${precio}">
            <div class="rollo-img-container">
                <img src="${rutaImagen}" width="100px" class="cuenta">
                <span class="cantidad-badge">Disponibles: ${cantidad}</span>
            </div>
            <div class="rollo-info">
                <h3 class="rollo-nombre">${nombre}</h3>
                <p class="rollo-descripcion">${descripccion}</p>
                <p class="rollo-ingredientes"><strong>Ingredientes:</strong> ${ingredientes}</p>
                <div class="rollo-rating">
                    ${generarEstrellas(calificacion)} <span class="rating-numero">(${calificacion})</span>
                </div>
                <div class="rollo-precio-container">
                    <span class="rollo-precio">$${parseInt(precio).toLocaleString()}</span>
                    <button class="btn-agregar-carrito" data-id="${idrollos}">
                        <i class="fas fa-shopping-cart"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return colDiv;
}

// Generar estrellas basadas en calificación
function generarEstrellas(calificacion) {
    const estrellaLlena = '★';
    const estrellaMedia = '½';
    const estrellaVacia = '☆';
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