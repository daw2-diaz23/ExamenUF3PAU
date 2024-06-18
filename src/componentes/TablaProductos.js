import { productos } from "../bd/productos";
import { productoFicha, mostrarDetalleProducto } from "./fichaProductos"; // Importa la ficha del producto

export const tablaProductos = {
  template: `
  
    <div class="container mt-5">
      <div id="alertContainer"></div>
      <div class="row">
        <div class="col-md-4" id="fichaProductoContainer">
          <!-- La ficha del producto se inyectará aquí -->
        </div>
        <div class="col-md-8">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h1>Administrar Productos</h1>
            <button class="btn btn-primary" id="btnAgregarProducto">Añadir Producto</button>
          </div>
          <table class="table table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tablaProductosBody"></tbody>
          </table>
        </div>
      </div>

      <!-- Modal para editar producto -->
      <div class="modal fade" tabindex="-1" id="modalEditarProducto">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editar Producto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="formEditarProducto">
                <input type="hidden" id="editId">
                <div class="form-group">
                  <label for="editNombre">Nombre</label>
                  <input type="text" class="form-control" id="editNombre">
                </div>
                <div class="form-group">
                  <label for="editPrecio">Precio</label>
                  <input type="number" class="form-control" id="editPrecio">
                </div>
                <div class="form-group">
                  <label for="editCategoria">Categoría</label>
                  <input type="text" class="form-control" id="editCategoria">
                </div>
                <div class="form-group">
                  <label for="editDescripcion">Descripción</label>
                  <textarea class="form-control" id="editDescripcion"></textarea>
                </div>
                <div class="form-group">
                  <label for="editImagen">URL de la Imagen</label>
                  <input type="text" class="form-control" id="editImagen">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" id="btnGuardarCambios">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para agregar nuevo producto -->
      <div class="modal fade" tabindex="-1" id="modalAgregarProducto">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Añadir Producto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="formAgregarProducto">
                <div class="form-group">
                  <label for="agregarNombre">Nombre</label>
                  <input type="text" class="form-control" id="agregarNombre">
                </div>
                <div class="form-group">
                  <label for="agregarPrecio">Precio</label>
                  <input type="number" class="form-control" id="agregarPrecio">
                </div>
                <div class="form-group">
                  <label for="agregarCategoria">Categoría</label>
                  <input type="text" class="form-control" id="agregarCategoria">
                </div>
                <div class="form-group">
                  <label for="agregarDescripcion">Descripción</label>
                  <textarea class="form-control" id="agregarDescripcion"></textarea>
                </div>
                <div class="form-group">
                  <label for="agregarImagen">URL de la Imagen</label>
                  <input type="text" class="form-control" id="agregarImagen">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary" id="btnAgregarNuevoProducto">Añadir Producto</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  script: () => {
    document.getElementById('fichaProductoContainer').innerHTML = productoFicha.template;

    let html = ''; // Define una variable 'html' 
    productos.forEach(producto => { // Actua sobre cada producto en el array 'productos'
      html += `
      <tr onclick="window.mostrarDetalleProducto(${producto.id}, 'fichaProductoContainer')">
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>${producto.categoria}</td>
        <td>${producto.descripcion}</td>
        <td class="actions">
          <button class="btn btn-primary btn-sm" onclick="editarProducto(${producto.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="borrarProducto(${producto.id})">Borrar</button>
        </td>
      </tr>`;
    });

    document.querySelector('#tablaProductosBody').innerHTML = html; // Inserta el HTML generado en el cuerpo de la tabla
    document.querySelector('#btnAgregarProducto').addEventListener('click', () => { // Añade un event listener al botón 'Añadir Producto'
      $('#modalAgregarProducto').modal('show'); // Muestra el modal para agregar producto
    });
    document.querySelector('#btnGuardarCambios').addEventListener('click', guardarCambios); // Añade un event listener al botón 'Guardar cambios'
    document.querySelector('#btnAgregarNuevoProducto').addEventListener('click', agregarNuevoProducto); // Añade un event listener al botón 'Añadir Producto'

    window.editarProducto = editarProducto;  // Esto permite que la función 'editarProducto' se pueda llamar desde cualquier lugar del código, incluyendo desde el DOM.
    
    window.mostrarDetalleProducto = (id) => { // Esta función toma un parámetro 'id', que es el ID del producto.
      const producto = productos.find(producto => producto.id === id); // Busca el producto en el array 'productos' cuyo ID coincida con el ID proporcionado.
      if (producto) {  // Si se encuentra el producto, llama a la función 'mostrarDetalleProducto' pasando el producto encontrado
        mostrarDetalleProducto(producto, 'fichaProductoContainer'); // el ID del contenedor 'fichaProductoContainer' para mostrar los detalles del producto.
      }
    };
    window.borrarProducto = borrarProducto;  // Esto permite que la función 'borrarProducto' se pueda llamar desde cualquier lugar del código, incluyendo desde el DOM.
  }
}

function agregarProducto() {
  $('#modalAgregarProducto').modal('show'); // Muestra el modal de agregar producto
}

function agregarNuevoProducto() {  // Función para agregar un nuevo producto
  const nombre = document.getElementById('agregarNombre').value; // Obtiene el valor del campo 'agregarNombre'
  const precio = document.getElementById('agregarPrecio').value; // Obtiene el valor del campo 'agregarPrecio'
  const categoria = document.getElementById('agregarCategoria').value; // Obtiene el valor del campo 'agregarCategoria'
  const descripcion = document.getElementById('agregarDescripcion').value; // Obtiene el valor del campo 'agregarDescripcion'
  const imagen = document.getElementById('agregarImagen').value; // Obtiene el valor del campo 'agregarImagen'

  const nuevoProducto = { // Crea un nuevo objeto 'producto' con los valores obtenidos
    id: productos.length + 1, // Asigna un ID al nuevo producto
    nombre: nombre, // Asigna el nombre al nuevo producto
    precio: precio, // Asigna el precio al nuevo producto
    categoria: categoria, // Asigna la categoría al nuevo producto
    descripcion: descripcion, // Asigna la descripción al nuevo producto
    imagen: imagen // Asigna la imagen al nuevo producto
  };

  productos.push(nuevoProducto); // Añade el nuevo producto al array 'productos'
  $('#modalAgregarProducto').modal('hide'); // Oculta el modal de agregar producto
  actualizarTabla(); // Actualiza la tabla de productos
  mostrarAlerta('Producto añadido correctamente'); // Muestra una alerta de éxito
}

function editarProducto(id) {
  const producto = productos.find(producto => producto.id === id); // Busca el producto por ID en el array 'productos'
  if (producto) {
    document.getElementById('editId').value = producto.id; // Asigna el ID del producto al campo 'editId'
    document.getElementById('editNombre').value = producto.nombre;  // Asigna el nombre del producto al campo 'editNombre'
    document.getElementById('editPrecio').value = producto.precio; // Asigna el precio del producto al campo 'editPrecio'
    document.getElementById('editCategoria').value = producto.categoria;  // Asigna la categoría del producto al campo 'editCategoria'
    document.getElementById('editDescripcion').value = producto.descripcion; // Asigna la descripción del producto al campo 'editDescripcion'
    document.getElementById('editImagen').value = producto.imagen; // Asigna la imagen del producto al campo 'editImagen'
    $('#modalEditarProducto').modal('show'); // Muestra el modal de editar producto
  }
}

function guardarCambios() {
  const id = parseInt(document.getElementById('editId').value); // Obtiene el ID del producto desde el campo 'editId'
  const nombre = document.getElementById('editNombre').value; // Obtiene el nombre del producto desde el campo 'editNombre'
  const precio = document.getElementById('editPrecio').value; // Obtiene el precio del producto desde el campo 'editPrecio'
  const categoria = document.getElementById('editCategoria').value; // Obtiene la categoría del producto desde el campo 'editCategoria'
  const descripcion = document.getElementById('editDescripcion').value; // Obtiene la descripción del producto desde el campo 'editDescripcion'
  const imagen = document.getElementById('editImagen').value; // Obtiene la imagen del producto desde el campo 'editImagen'

  const producto = productos.find(producto => producto.id === id);  // Busca el producto del producto en el array 'productos'
  if (producto) {  // Si el producto existe
    producto.nombre = nombre; // Actualiza el nombre del producto
    producto.precio = precio; // Actualiza el precio del producto
    producto.categoria = categoria; // Actualiza la categoría del producto
    producto.descripcion = descripcion; // Actualiza la descripción del producto
    producto.imagen = imagen;// Actualiza la imagen del producto
    actualizarTabla(); // Actualiza la tabla de productos
    $('#modalEditarProducto').modal('hide'); // Oculta el modal de editar producto
    mostrarAlerta('Producto actualizado correctamente'); // Muestra una alerta de éxito
  }
}

function borrarProducto(id) {
  const index = productos.findIndex(producto => producto.id === id); // Busca el índice del producto en el array 'productos'
  if (index !== -1) {  // Si el producto existe
    productos.splice(index, 1); // Elimina el producto del array 'productos'
    actualizarTabla(); // Actualiza la tabla de productos
    mostrarAlerta('Producto eliminado correctamente'); // Muestra una alerta de eliminación

  }
}

function actualizarTabla() {
  let html = ''; //Define una variable ' html '
  productos.forEach(producto => { // Actua sobre cada producto en el array 'productos'
    html += `
    <tr onclick="mostrarDetalleProducto()(${producto.id}, 'fichaProductoContainer')">
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.categoria}</td>
      <td>${producto.descripcion}</td>
      <td class="actions">
        <button class="btn btn-primary btn-sm" onclick="editarProducto(${producto.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="borrarProducto(${producto.id})">Borrar</button>
      </td>
    </tr>`;
  });
  document.querySelector('#tablaProductosBody').innerHTML = html;
}


