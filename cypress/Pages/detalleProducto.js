export default class detalleProducto {

    producto = {
        contenedor :    ".inventory_details_container",
        nombre :        ".inventory_details_name",
        descripcion :   ".inventory_details_desc",
        precio :        ".inventory_details_price",
        botonAddtoCart :".btn",
        botonRemove:    ".btn"
    }

    botonVolver =       "#back-to-products"

    getContenedorProducto()     { return cy.get(this.producto.contenedor)}
    getNombreProducto()         { return cy.get(this.producto.nombre)}
    getDescripcionProducto()    { return cy.get(this.producto.descripcion)}
    getPrecioProducto()         { return cy.get(this.producto.precio)}
    getBotonRemove()            { return cy.get(this.producto.botonRemove).contains("Remove")}
    getBotonAddtoCart(indice)   { return cy.get(this.producto.botonAddtoCart).eq(indice)}
    getBotonVolver()            { return cy.get(this.botonVolver)}
}

