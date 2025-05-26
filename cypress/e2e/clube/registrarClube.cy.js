/// <reference types="cypress" />

import RegistrarClubePage from '../../support/pages/RegistrarClubePage'

describe('Registrar clube', () => {
  beforeEach(() => {
    cy.visit('https://homolognovocadastro.cpb.org.br/public/clubes-externos')
  })

  it('Validar registrar clube com sucesso', () => {
      RegistrarClubePage.clickContinuar()
      RegistrarClubePage.preencherCnpj()
      RegistrarClubePage.clickPesquisar()
      RegistrarClubePage.clickConfirmacaoModal()
      RegistrarClubePage.preencherDadosPessoa()
      RegistrarClubePage.preencherDadosEndereco()
      RegistrarClubePage.preencherDadosPresidencia()
      RegistrarClubePage.preencherDadosDiretor()
      RegistrarClubePage.selecionaModalidade()
      RegistrarClubePage.modalSucesso()
  })

})