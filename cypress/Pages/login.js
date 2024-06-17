export default class LoginPage {

    constructor(){
       
    }

    inputUsuario            = "#user-name"
    inputPassword           = "#password"
    botonLogin              = "#login-button"
    etiquetaErrorLogin      = ".error-message-container"
    textoLoginIncorrecto    = 'Username and password do not match any user in this service'

    getInputUsuario()           { return cy.get(this.inputUsuario)}
    getInputPassword()          { return cy.get(this.inputPassword)}
    getBotonLogin()             { return cy.get(this.botonLogin)}
    getTextoLoginIncorrecto()   { return this.textoLoginIncorrecto}
    getEtiquetaErrorLogin()     { return cy.get(this.etiquetaErrorLogin)}

    iniciarSesion(usuario, password){
        this.getInputUsuario().type(usuario)
        this.getInputPassword().type(password)
        this.getBotonLogin().click()
    }

}
