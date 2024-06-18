import { tablaProductos } from "./src/componentes/TablaProductos"

document.querySelector('main').innerHTML = tablaProductos.template
tablaProductos.script()