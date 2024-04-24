
# Simulador de E-commerce 

- El proyecto simula un E-Commerce de productos cannabicos, tiene una seccion tienda donde se listan productos desde una base de datos simulada, los productos de inyectan con JS. Tiene un modal hecho con Bootstrap que representa el carrito de compras donde se guardan los productos que elije el usuario, se pueden controlar las cantidades a agregar al carrito dentro de cada producto, pero el total se ve en el carrito. 

- Dentro del carrito se puede controlar la cantidad de objetos elegidos en el caso del que cliente se haya equivocado, puede eliminar el producto individual una vez la cantidad llegue a una unidad con el icono de eliminar remarcado en rojo. Dentro del mismo modal hay un boton para eliminar el total de los productos, tambien hay un boton "COMPRAR". Dentro de este carrito hay un subtotal, que va cambiando segundo la cantidad del producto individual, y un total que cambia segundo el subtotal de todos los productos.

- Al presionar COMPRAR AHORA, se abre un segundo modal para ingresar los datos de la factura, tiene validaciones por ende hay que ingresar datos validos, si pasan las validaciones se abre una alerta pidiendo la confirmacion de estos datos para continuar con la facturacion, tiene alerta en el caso de cancelar, si confirma se abre otra alerta con los datos que el usuario lleno, tiene alerta en caso de cancelar. Si el cliente confirma, se abre una alerta final despidiendolo y dandole opciones de seguir comprando o terminar con la interaccion de compra. En el caso de confirmar se limpia el storage, se actualizan todas las cantidades del carrito y se limpian los campos del formulario.

- En la seccion de Reprocann se debe ingresar datos via formulario para cargar al "supuesto usuario registrado en Reprocann", este formulario tiene validaciones, entonces el sistema busca en un archivo .json que simula una base de datos con los descuentos disponibles segun la categoria que se registre. Para todo hay un mensaje para el cliente, si encuentra una categoria indica que se aplicaron los descuentos y su porcentaje, si no encuentra la categoria le pide al usuario que ingrese la correcta dandole opciones, si hay una falla en el uso de fetch se muestra un mensaje tipo error 404 "intente nuevamente", si sale todo bien se visualizan los cambios en el listado de productos asi como en el carrito, luego de esto no se puede volver a hacer el descuento y en el mismo boton se muestra otro msj y color. Al confirmar el usuario y sale bien se almacenan algunos datos en sessionStorage para guardar los productos que compro y con que categoria reprocann. Al reiniciar el navegador se resetea la funcion actualizando todo los productos a sus precios originales, pero se actualiza el mensaje de bienvenida con el nombre de la persona que hizo la compra con el descuento, datos traidos del sessionStorage.

- En la seccion NUEVOS PRODUCTOS O ULTIMAS COMPRAS, mostramos datos random al principio simulando que son datos traidos en base a su fecha de ingreso al stock (esto deberia hacerse con un registro tipo fecha en una base de datos). Pero si hay datos en sessionStorage, esto se borra y se muestra un msj de "Productos que llamaron tu atencion" y los productos que compro con el descuento reprocann o que quiso aplicar el descuento.


- El resto del Javascript pertence a la experiencia de usuario para que no sea tan tosco. 



#### Hay 4 archivos " .js":

- main.js =>  Guarda la logica para mostrar los productos y la logica del carrito .
- desplazamientosDOM.js =>  Guarda los eventos de desplazamiento del navbar y botones de la seccion main (html)
- facturacion_y_Reprocann.js =>  Guarda la logica de la facturacion de la compra y el descuento Reprocann
- Productos.js =>  Guarda la clase de objetos que se maneja en el archivo " main.js"






### Aclaración:


>Me tome el trabajo de hacer la pagina que voy tratar de usar durante toda la carrera de backend, tanto en este curso como en los que vienen, por ende la seccion "Blog", "Envios", "Nuevos Productos", "Contacto" y el buscador inicial del navbar lo voy a utilizar cuando trabaje con Node.js o algun framework.



> El **_Blog_** lo voy a usar para crear un login/register para que el cliente pueda crear articulos sobre el mundo del cannabis medicinal. Tendra una base de datos con un patron MVC.

> La seccion **_Envios_** sera para que el cliente pueda controlar el estado de su envio simulando una API de seguimiento de producto mostrandole al cliente donde se encuentra el producto. Tendra base de datos y un patron MV

> La seccion **_Nuevos productos_** deberia tener una base de datos con un registro que indique cuando se agrego y es mostrarse en esta seccion segundo un rango de fecha establecido.

> La seccion **_Contacto_** deberia implementar una logica de envio de email cuando complete los datos, o guardarlas en una base de datos para luego "comunicarse" con el cliente.



**¡ IMPORTANTE !** 

> **LOS FORMULARIOS DEBEN COMPLETARSE A MANO PARA PROBAR LAS VALIDACIONES BASICAS DESDE EL CLIENTE Y ASI CHEQUEAR QUE FUNCIONEN COMO SE ESPERA NORMALMENTE**.