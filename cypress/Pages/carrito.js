export default class Carrito {


    producto = {
        contenedor :    ".cart_item",
        nombre :        ".inventory_item_name",
        descripcion :   ".inventory_item_desc",
        precio :        ".item_pricebar",
        botonRemove:    ".btn"
    }

    carrito =           "[data-test-id='shopping-cart-link']"   
    carritoBadge =      "[data-test-id='shopping-cart-badge']"  
    listaProductos =    ".cart-list"
    botonVolver =       "#continue-shopping"


    getContenedorProducto()     { return cy.get(this.producto.contenedor)}
    getNombreProducto()         { return cy.get(this.producto.nombre)}
    getDescripcionProducto()    { return cy.get(this.producto.descripcion)}
    getPrecioProducto()         { return cy.get(this.producto.precio)}
    getBotonRemove()            { return cy.get(this.producto.botonRemove).contains("Remove")}

    getCarrito()                { return cy.get(this.carrito)}
    getCarritoBadge()           { return cy.get(this.carritoBadge)}
    getListaProductos()         { return cy.get(this.listaProductos)}
    getBotonVolver()            { return cy.get(this.botonVolver)}


    s
}

