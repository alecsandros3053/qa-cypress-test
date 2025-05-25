/// <reference types="cypress" />

import LoginPage from '../../support/pages/LoginPage'


describe('Login invalido', () => {
  beforeEach(() => {
    cy.visit('https://homologlogin.cpb.org.br/realms/cpb/protocol/openid-connect/auth?response_type=code&client_id=cadastro-web&redirect_uri=https%3A%2F%2Fhomologcadastro.cpb.org.br%2Fcadastro-geral-web%2F&state=07fbc29e-6dc9-43cc-b664-636d2d5f512c&scope=openid')
  })

  it('Deve exibir a tela inicial', () => {
    cy.url().should('include', 'openid-connect/auth') // ou qualquer verificação
  })

  
  it('Validar usuario e ou senha invalidos', () => {
     LoginPage.preencherUsuario("vinicius")
     LoginPage.preencherSenha("123")
     LoginPage.clickEntrar()
     LoginPage.validandoMensagemUsuarioInvalido()
  })
})