import Carrito from '../Pages/carrito'
import IndexPage from '../Pages/Index'
import DetalleProducto from "../Pages/detalleProducto"

export default class IndexValidator {

    /*
        Luego de agregar un producto podemos usar la siguiente funcion para validar si el badge del carrito sumo dicha unidad
    */
    validarBadgeCarrito(cantidad){
        const indexPage = new IndexPage()
        indexPage.getCarritoBadge().invoke('text').then(numeroBadge=>{
    
            expect(parseInt(numeroBadge)).to.equal(cantidad);
        })

    }

    /*
        Si hemos agregado varios articulos al carrito podemos usar para validar que los articulos que se estan en el carrito coinciden
        con el detalle de los productos en la web index. Solo le pasamos 
    */
    validarProductosEnCarritoPorCantidad(cantidadProducto){
        const indexPage = new IndexPage()
        const carrito = new Carrito()
        let nombreProducto, 
            descripcionProducto, 
            precioProducto, 
            nombreProductoCarrito, 
            descripcionProductoCarrito, 
            precioProductoCarrito

        for (let i=0; i< cantidadProducto; i++){

            indexPage.getContenedorProducto().eq(i).find(indexPage.producto.nombre).invoke('text').then(texto=>{
                nombreProducto = texto
            })
            indexPage.getContenedorProducto().eq(i).find(indexPage.producto.descripcion).invoke('text').then(texto=>{
                descripcionProducto = texto
            })
            indexPage.getContenedorProducto().eq(i).find(indexPage.producto.precio).invoke('text').then(texto=>{
                precioProducto = texto
            })

            indexPage.getCarrito().click()

            carrito.getContenedorProducto().eq(i).find(carrito.producto.nombre).invoke('text').then(texto=>{
                nombreProductoCarrito = texto
            })

            carrito.getContenedorProducto().eq(i).find(carrito.producto.descripcion).invoke('text').then(texto=>{
                descripcionProductoCarrito = texto
            })

            carrito.getContenedorProducto().eq(i).find(carrito.producto.precio).invoke('text').then(texto=>{
                precioProductoCarrito = texto
            }).then(()=>{
                expect(nombreProducto).to.be.equal(nombreProductoCarrito)
                expect(descripcionProducto).to.be.equal(descripcionProductoCarrito)
                expect(precioProductoCarrito).to.be.includes(precioProducto)
                carrito.getBotonVolver().click()
            })
        }
        
    }

    /*  
        Una vez que agregamos un producto al carrito se puede usar la siguiente funcion para validar que los datos del producto 
        coincidan con los datos del producto agregado dentro del carrito. Por parametros le pasamos i que es el indice para determinar
        que producto de la lista queremos agregar y el parametro agregado desde que acepta 'index' o 'detalle' y haciendo que compare
        los detalles del producto desde el listado principal de la web index, o los detalles que figuran en el producto una vez que hacemos click
        en dicho producto y accedemos a la web de detalle del mismo
    */
    validarProductosEnCarritoPorIndice(i, agregadoDesde){

        const indexPage = new IndexPage()
        const carrito = new Carrito()
        const detalleProductoPage = new DetalleProducto()
        let nombreProducto, 
            descripcionProducto, 
            precioProducto, 
            nombreProductoCarrito, 
            descripcionProductoCarrito, 
            precioProductoCarrito

        if (agregadoDesde == 'index'){

            indexPage.getContenedorProducto().eq(i).find(indexPage.producto.nombre).invoke('text').then(texto=>{
                nombreProducto = texto
            })
            indexPage.getContenedorProducto().eq(i).find(indexPage.producto.descripcion).invoke('text').then(texto=>{
                descripcionProducto = texto
            })
            indexPage.getContenedorProducto().eq(i).find(indexPage.producto.precio).invoke('text').then(texto=>{
                precioProducto = texto
            })

            indexPage.getCarrito().click()

            carrito.getContenedorProducto().eq(i).find(carrito.producto.nombre).invoke('text').then(texto=>{
                nombreProductoCarrito = texto
            })

            carrito.getContenedorProducto().eq(i).find(carrito.producto.descripcion).invoke('text').then(texto=>{
                descripcionProductoCarrito = texto
            })

            carrito.getContenedorProducto().eq(i).find(carrito.producto.precio).invoke('text').then(texto=>{
                precioProductoCarrito = texto
            }).then(()=>{
                expect(nombreProducto).to.be.equal(nombreProductoCarrito)
                expect(descripcionProducto).to.be.equal(descripcionProductoCarrito)
                expect(precioProductoCarrito).to.be.includes(precioProducto)
                carrito.getBotonVolver().click()
            })
        }else if(agregadoDesde == 'detalle'){

            indexPage.getContenedorProducto().eq(i).find(indexPage.producto.nombre).click()

            detalleProductoPage.getContenedorProducto().find(detalleProductoPage.producto.nombre).invoke('text').then(texto=>{
                nombreProducto = texto
            })
            detalleProductoPage.getContenedorProducto().find(detalleProductoPage.producto.descripcion).invoke('text').then(texto=>{
                descripcionProducto = texto
            })
            detalleProductoPage.getContenedorProducto().find(detalleProductoPage.producto.precio).invoke('text').then(texto=>{
                precioProducto = texto
            })

            indexPage.getCarrito().click()

            carrito.getContenedorProducto().eq(i).find(carrito.producto.nombre).invoke('text').then(texto=>{
                nombreProductoCarrito = texto
            })

            carrito.getContenedorProducto().eq(i).find(carrito.producto.descripcion).invoke('text').then(texto=>{
                descripcionProductoCarrito = texto
            })

            carrito.getContenedorProducto().eq(i).find(carrito.producto.precio).invoke('text').then(texto=>{
                precioProductoCarrito = texto
            }).then(()=>{
                expect(nombreProducto).to.be.equal(nombreProductoCarrito)
                expect(descripcionProducto).to.be.equal(descripcionProductoCarrito)
                expect(precioProductoCarrito).to.be.includes(precioProducto)
                carrito.getBotonVolver().click()
            })
        }

        
    }

    /*
        Valida que el detalle del producto coincida con el de la web principal mediante el parametro i le indicamos el indice
        del producto que queremos validar
    */
    validarDetalleArticulo(i){
        const indexPage = new IndexPage()
        const carrito = new Carrito()
        const detalleProductoPage = new DetalleProducto()

        let nombreProducto, 
            descripcionProducto, 
            precioProducto, 
            nombreProductoDetalle, 
            descripcionProductoDetalle, 
            precioProductoDetalle

        

        indexPage.getContenedorProducto().eq(i).find(indexPage.producto.nombre).invoke('text').then(texto=>{
            nombreProducto = texto
        })
        indexPage.getContenedorProducto().eq(i).find(indexPage.producto.descripcion).invoke('text').then(texto=>{
            descripcionProducto = texto
        })
        indexPage.getContenedorProducto().eq(i).find(indexPage.producto.precio).invoke('text').then(texto=>{
            precioProducto = texto
        })

        indexPage.getContenedorProducto().eq(i).find(indexPage.producto.nombre).click()

        detalleProductoPage.getContenedorProducto().find(detalleProductoPage.producto.nombre).invoke('text').then(texto=>{
            nombreProductoDetalle = texto
        })

        detalleProductoPage.getContenedorProducto().find(detalleProductoPage.producto.descripcion).invoke('text').then(texto=>{
            descripcionProductoDetalle = texto
        })

        detalleProductoPage.getContenedorProducto().find(detalleProductoPage.producto.precio).invoke('text').then(texto=>{
            precioProductoDetalle = texto
        }).then(()=>{
            expect(nombreProducto).to.be.equal(nombreProductoDetalle)
            expect(descripcionProducto).to.be.equal(descripcionProductoDetalle)
            expect(precioProductoDetalle).to.be.includes(precioProducto)
            detalleProductoPage.getBotonVolver().click()
        })

        
        
    }
}