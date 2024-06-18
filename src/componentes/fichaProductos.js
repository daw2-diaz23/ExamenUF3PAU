
export const productoFicha = (producto) => {
    const template = `
      <div class="card">
        <!-- Inserta la imagen del producto, o una imagen por defecto si no hay una imagen especificada -->
        <img src="${producto.imagen || 'https://via.placeholder.com/300'}" class="card-img-top" alt="Imagen del Producto">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p><strong>Precio: </strong><span>$${producto.precio}</span></p>
          <p><strong>Categoría: </strong><span>${producto.categoria}</span></p>
        </div>
      </div>
    `;
    
    return template;
  };
  
  // Define y exporta una función llamada 'mostrarDetalleProducto' que toma un objeto 'producto' y un 'contenedorId' como parámetros.
  export function mostrarDetalleProducto(producto, id) {
    const contenedor = document.getElementById(id);
    if (contenedor) {
      contenedor.innerHTML = productoFicha(producto);
    }
  }
  