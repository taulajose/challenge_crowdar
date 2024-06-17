import Carrito from '../../Pages/carrito'
import LoginPage from '../../Pages/login'
import IndexPage from '../../Pages/Index'
import Usuarios from '../../data/usuarios'
import IndexValidator from '../../PageValidator/indexValidator'


describe('Callenge', () => {

  beforeEach(() => {
  
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    
    cy.visit(Cypress.env('urlLogin'))
     
  })

  
  it('Iniciar sesion con datos validos', () => {
  
    const loginPage = new LoginPage()
    const tipoUsuario = new Usuarios().standard
  
    loginPage.iniciarSesion(tipoUsuario.usuario,tipoUsuario.password)
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
    
  })

  it('Iniciar sesion con datos invalidos', () => {

    const loginPage = new LoginPage()
    const tipoUsuario = new Usuarios().invalido
  
    loginPage.iniciarSesion(tipoUsuario.usuario,tipoUsuario.password)

    //Se verifica que este visible la etiqueta de error y se valida el texto
    loginPage.getEtiquetaErrorLogin().should('be.visible')
    loginPage.getEtiquetaErrorLogin().invoke('text').then(texto=>{
      expect(texto).to.contains(loginPage.getTextoLoginIncorrecto())
    })
    //Se verifica que los inputs tengan las class de error
    loginPage.getInputPassword().should('have.class','input_error')
    loginPage.getInputPassword().should('have.class','form_input error')
    loginPage.getInputUsuario().should('have.class','input_error')
    loginPage.getInputUsuario().should('have.class','form_input error')
    
  })

  it('Iniciar sesion con datos vacios', () => {

    const loginPage = new LoginPage()
    const tipoUsuario = new Usuarios().vacio
  
    loginPage.iniciarSesion(tipoUsuario.usuario,tipoUsuario.password)

    //Se verifica que este visible la etiqueta de error y se valida el texto
    loginPage.getEtiquetaErrorLogin().should('be.visible')
    loginPage.getEtiquetaErrorLogin().invoke('text').then(texto=>{
      expect(texto).to.contains(loginPage.getTextoLoginIncorrecto())
    })
    //Se verifica que los inputs tengan las class de error
    loginPage.getInputPassword().should('have.class','input_error')
    loginPage.getInputPassword().should('have.class','form_input error')
    loginPage.getInputUsuario().should('have.class','input_error')
    loginPage.getInputUsuario().should('have.class','form_input error')
    
  })

  it('Accesibilidad login', () => {

    cy.injectAxe()
    cy.checkA11y()
    
  })

  it('Agregar productos al carrito intercalando el add to cart desde index y desde la web de detalle del producto', () => {
   
    const loginPage = new LoginPage()
    const indexPage = new IndexPage()
    const indexValidator = new IndexValidator()
    const tipoUsuario = new Usuarios().standard
    let indicedProducto = 0
  
  
    loginPage.iniciarSesion(tipoUsuario.usuario,tipoUsuario.password)
    
    indexPage.agregarProductoDesdeIndexPorIndice(indicedProducto)
    indexValidator.validarBadgeCarrito(indicedProducto+1)
    indexValidator.validarProductosEnCarritoPorIndice(indicedProducto, 'index')
    indicedProducto = indicedProducto+1
    indexPage.agregarProductoDesdeDetallePorIndice(indicedProducto)
    indexValidator.validarBadgeCarrito(indicedProducto+1)
    indexValidator.validarProductosEnCarritoPorIndice(indicedProducto, 'detalle')
    indicedProducto = indicedProducto+1
    indexPage.agregarProductoDesdeIndexPorIndice(indicedProducto)
    indexValidator.validarBadgeCarrito(indicedProducto+1)
    indexValidator.validarProductosEnCarritoPorIndice(indicedProducto, 'index')
  })

  it('Remover Producto desde la web del carrito ', () => {
  
    const loginPage = new LoginPage()
    const indexPage = new IndexPage()
    const carritoPage = new Carrito()
    const tipoUsuario = new Usuarios().standard
    let indicedProducto = 0
  
    loginPage.iniciarSesion(tipoUsuario.usuario,tipoUsuario.password)
    indexPage.agregarProductoDesdeIndexPorIndice(indicedProducto)
    indexPage.getCarrito().click()
    carritoPage.getContenedorProducto().eq(indicedProducto).find(carritoPage.producto.botonRemove).click()
    //Se valida que el badge con el numero del carrito no exista
    indexPage.getCarritoBadge().should('not.exist')
    carritoPage.getBotonVolver().click()
    //Se valida que el boton del producto se visualice como Add to cart y no como Remove
    indexPage.getBotonAddtoCart(indicedProducto).should('be.visible')
    //Se ingresa nuevamente al carrito para validar que no existan productos
    indexPage.getCarrito().click()
    carritoPage.getListaProductos().should('not.exist')
  })

  it('Validar que el detalle de los productos coincida con el que se muestra en la web principal', () => {
   
    const loginPage = new LoginPage()
    const indexPage = new IndexPage()
    const carritoPage = new Carrito()
    const indexValidator = new IndexValidator()
    const tipoUsuario = new Usuarios().standard
    let cantidadProductos = 3
  
    loginPage.iniciarSesion(tipoUsuario.usuario,tipoUsuario.password)
    
    //Se obtiene la cantidad de productos en la lista y luego se valida cada uno con los datos de su detalle
    indexPage.getContenedorProducto().each(($el,$i,$list)=>{
      indexValidator.validarDetalleArticulo($i)
    })
    
  })

  it('Caso con fallo - Se valida texto incorrecto del titulo del producto en el carrito', () => {

    const loginPage = new LoginPage()
    const indexPage = new IndexPage()
    const carritoPage = new Carrito()
    const tipoUsuario = new Usuarios().standard
    let indicedProducto = 0
  
    loginPage.iniciarSesion(tipoUsuario.usuario,tipoUsuario.password)
    indexPage.agregarProductoDesdeIndexPorIndice(indicedProducto)
    indexPage.getCarrito().click()
    carritoPage.getContenedorProducto().find(carritoPage.producto.nombre).invoke('text').then(texto=>{
      expect(texto).to.be.equal('Hola')
    })

    
  })

  it('Verificar departamentos en API de Mercado libre ', () => {

    cy.request('GET', 'https://www.mercadolibre.com.ar/menu/departments')
      .then((response) => {
        // Verificar que la respuesta sea exitosa (código 200)
        expect(response.status).to.eq(200);

        // Se verifica que la respuesta no este vacia
        expect(response.body).to.have.property('departments').and.not.be.empty;

        // Se obtiene la lista de departamentos
        const departamentos = response.body.departments;

        // Validar que la lista de departamentos no esté vacía 
        expect(departamentos).to.be.an('array').and.not.be.empty;
        //Validar que exista el departamento llamado Tecnologia
        for (let i=0; i < departamentos.length; i++){
          expect(departamentos[i]).to.haveOwnProperty('name')
          expect(departamentos[i]['name']).to.be.equal('Tecnología')
        }

      });
  })

})
