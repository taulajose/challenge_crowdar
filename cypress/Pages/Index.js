import DetalleProducto from "./detalleProducto"

export default class IndexPage {

    menu = {
        iconoMenu :     "[data-test='#react-burger-menu-btn']",
        inventario :    "[data-test='inventory-sidebar-link']",
        about :         "[data-test='about-sidebar-link']",
        logout :        "[data-test='logout-sidebar-link']",
        resetApp :      "[data-test='reset-sidebar-link']"
    }

    producto = {
        contenedor :    ".inventory_item",
        nombre :        ".inventory_item_name",
        descripcion :   ".inventory_item_desc",
        foto :          ".inventory_item_img",
        precio :        ".inventory_item_price",
        botonAddtoCart :".btn",
        botonRemove:    ".btn"
    }

    filtros = {
        select:         "[data-test-id='product-sort-container']",
        optionAZ :      "[data-test-id='product-sort-container option'] > [value=az]",
        optionZA :      "[data-test-id='product-sort-container option'] > [value=za]",
        optionLOHI :    "[data-test-id='product-sort-container option'] > [value=lohi]",
        optionHILO :    "[data-test-id='product-sort-container option'] > [value=hilo]",
    }

    carrito =       ".shopping_cart_link"   
    carritoBadge =  "[data-test='shopping-cart-badge']"
    
    listaProductos = ".inventory_list"
    
    
    getMenu()               { return cy.get(this.menu.iconoMenu)}
    getMenuInventario()     { return cy.get(this.menu.inventario)}
    getMenuAbout()          { return cy.get(this.menu.about)}
    getMenuLogout()         { return cy.get(this.menu.logout)}
    getMenuResetApp()       { return cy.get(this.menu.resetApp)}
    

    getContenedorProducto() { return cy.get(this.producto.contenedor)}
    getNombreProducto()     { return cy.get(this.producto.nombre)}
    getDescripcionProducto(){ return cy.get(this.producto.descripcion)}
    getFotoProducto()       { return cy.get(this.producto.foto)}
    getPrecioProducto()     { return cy.get(this.producto.precio)}
    getBotonAddtoCart()     { return cy.get(this.producto.botonAddtoCart).contains("Add to cart")}
    getBotonRemove()        { return cy.get(this.producto.botonRemove).contains("Remove")}

    getFiltroSelect()       { return cy.get(this.producto.filtros.select)}
    getFiltroOptionAZ()     { return cy.get(this.producto.filtros.optionAZ)}
    getFiltroOptionZA()     { return cy.get(this.producto.filtros.optionZA)}
    getFiltroOptionLOHI()   { return cy.get(this.producto.filtros.optionLOHI)}
    getFiltroOptionHILO()   { return cy.get(this.producto.filtros.optionHILO)}

    getCarrito()            { return cy.get(this.carrito)}
    getCarritoBadge()       { return cy.get(this.carritoBadge)}
    getListaProductos()     { return cy.get(this.listaProductos)}
  


    agregarProductosDesdeIndexPorCantidad(cantidad){

        for (let i=0; i<cantidad; i++){
            this.getContenedorProducto().eq(i).find(this.producto.botonAddtoCart).click()            
            
        }

    }

    agregarProductoDesdeIndexPorIndice(indice){


        this.getContenedorProducto().eq(indice).find(this.producto.botonAddtoCart).click()            
    
    }

    agregarProductoDesdeDetalle(cantidad){

        const detalleProducto = new DetalleProducto()

        for (let i=0; i<cantidad; i++){
            this.getContenedorProducto().eq(i).find(this.producto.nombre).click()
            detalleProducto.getContenedorProducto().find(detalleProducto.producto.botonAddtoCart).click()
            detalleProducto.getBotonVolver().click()   
        }

    }

    agregarProductoDesdeDetallePorIndice(indice){

        const detalleProducto = new DetalleProducto()

        this.getContenedorProducto().eq(indice).find(this.producto.nombre).click()
        detalleProducto.getContenedorProducto().find(detalleProducto.producto.botonAddtoCart).click()
        detalleProducto.getBotonVolver().click()
    
    }
    

}

