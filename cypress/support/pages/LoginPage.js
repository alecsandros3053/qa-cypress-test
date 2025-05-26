class EsqueciSenhaPage {

  clickEntrar() {
     cy.get('#loginbtn').click()     
  }

  preencherUsuario(usuario){
    cy.get('#username').type(usuario)
  }

  preencherSenha(senha){
    cy.get('#password').type(senha)
  }

  validandoMensagemUsuarioInvalido(){
    cy.get('#swal2-html-container')
        .should('be.visible')
        .and('contain.text', 'Usuário ou senha inválidos, por favor, tente novamente!')
  }
}

export default new EsqueciSenhaPage()
