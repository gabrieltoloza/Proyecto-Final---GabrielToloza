
# Simulador de E-commerce 

- El proyecto simula un E-Commerce de productos cannabicos, tiene una seccion tienda donde se listan productos desde una base de datos simulada, los productos de inyectan con JS. Tiene un modal hecho con Bootstrap que representa el carrito de compras donde se guardan los productos que elije el usuario, se pueden controlar las cantidades a agregar al carrito dentro de cada producto, pero el total se ve en el carrito. 

Dentro del carrito se puede controlar la cantidad de objetos elegidos en el caso del que cliente se haya equivocado, puede eliminar el producto individual una vez la cantidad llegue a una unidad con el icono de eliminar remarcado en rojo. Dentro del mismo modal hay un boton para eliminar el total de los productos, tambien hay un boton "COMPRAR". Dentro de este carrito hay un subtotal, que va cambiando segundo la cantidad del producto individual, y un total que cambia segundo el subtotal de todos los productos.

Al presionar COMPRAR AHORA, se abre un segundo modal para ingresar los datos de la factura, tiene validaciones por ende hay que ingresar datos validos, si pasan las validaciones se abre una alerta pidiendo la confirmacion de estos datos para continuar con la facturacion, tiene alerta en el caso de cancelar, si confirma se abre otra alerta con los datos que el usuario lleno, tiene alerta en caso de cancelar. Si el cliente confirma, se abre una alerta final despidiendolo y dandole opciones de seguir comprando o terminar con la interaccion de compra.

En el caso de confirmar se limpia el storage, se actualizan todas las cantidades del carrito y se limpian los campos del formulario.

El resto del Javascript pertence a la experiencia de usuario para que no sea tan tosco. 

#### Hay 3 archivos " .js":

- main.js =>  Guarda la logica para mostrar los productos y la logica del carrito .
- desplazamientosDOM.js =>  Guarda los eventos de desplazamiento del navbar y botones de la seccion main(html)
- facturacion.js =>  Guarda la logica de la facturacion de la compra.
- Productos.js =>  Guarda la clase de objetos que se maneja en el archivo " main.js"



**NOTA**    Me tome el trabajo de hacer la pagina que voy tratar de usar durante toda la carrera de backend, tanto en este curso como en los que vienen, por ende la seccion "Blog", "Envios", "Nuevos Productos", "Contacto" y el buscador inicial del navbar lo voy a utilizar cuando trabaje con Node.js o algun framework.


**NOTA 2**    El formulario debe completarse a mano para probar las validaciones basicas y asi chequear que tiene las validaciones.