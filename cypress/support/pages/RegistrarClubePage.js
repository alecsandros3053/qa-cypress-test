import { Faker, pt_BR } from '@faker-js/faker';

const faker = new Faker({ locale: [pt_BR] });

class RegistrarClubePage {
  clickContinuar() {
    cy.wait(2000);
    cy.contains('button', 'Continuar').should('be.visible').click();
  }

gerarCpf() {
    const n = () => Math.floor(Math.random() * 9);
    const mod = (base) => {
      const sum = base.reduce((acc, val, i) => acc + val * ((base.length + 1) - i), 0);
      const mod = sum % 11;
      return mod < 2 ? 0 : 11 - mod;
    };

    const base = Array.from({ length: 9 }, n);
    base.push(mod(base));
    base.push(mod(base));

    return base.join('');
 }

  gerarCnpj() {
    const randomDigits = () => Math.floor(Math.random() * 9);
      
    let cnpj = Array(12).fill(0).map(randomDigits);
      
    const calcDigito = (cnpj, pos) => {
    let soma = 0;
    let pesos = pos === 12 ? [5,4,3,2,9,8,7,6,5,4,3,2] : [6,5,4,3,2,9,8,7,6,5,4,3,2];
        
    for(let i=0; i < pesos.length; i++) {
          soma += cnpj[i] * pesos[i];
    }
    let resto = soma % 11;
    return (resto < 2) ? 0 : 11 - resto;
    
    };
      
    cnpj.push(calcDigito(cnpj, 12));
    cnpj.push(calcDigito(cnpj, 13));
      
    return cnpj.join('');
  }

  preencherSenha(senha) {
    cy.get('#password').type(senha);
  }

  preencherCnpj() {

    const cnpj = this.gerarCnpj();
    cy.log('cnpj: ', cnpj);
     
    cy.get('[name="cnpjClube"]').then($input => {
      const nativeInput = $input[0];
      nativeInput.value = cnpj;
      nativeInput.dispatchEvent(new Event('input',  { bubbles: true }));
      nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  preencherDadosPessoa(){
    const telefone = faker.phone.number('(##) 9####-####');
    const sigla = faker.string.alpha({ count: 3, casing: 'upper' });
    const data = faker.date.anytime()

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const ano = data.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    cy.wait(2000)
    cy.get('#nomeCompletoClube').type(faker.person.fullName());
    cy.get('#emailClube').type(faker.internet.email());
    cy.get('#dataFundacaoClube').type(dataFormatada);
    cy.get('#telefoneClube').type(telefone);
    cy.get('#siglaClube').type(sigla);

  }

  preencherDadosEndereco(){  
     cy.get("#cepClube").type(faker.location.zipCode())
     cy.get("#enderecoClube").type(faker.location.street())
     cy.get("#numeroClube").type(faker.location.buildingNumber())
     cy.get("#bairroClube").type(faker.location.secondaryAddress())

    cy.get('div[role="combobox"]').first().find('input[type="text"]').type('ACRE');
    cy.wait(2000)
    cy.get('.ng-option.ng-option-marked').click();
    cy.get('div[role="combobox"]').eq(1).find('input[type="text"]').type('BUJARI');
    cy.wait(2000)
    cy.get('.ng-option.ng-option-marked').click();

  }

   preencherDadosPresidencia(){
      cy.get('[name="cpfPresidente"]').type(this.gerarCpf())
      cy.get('[title="Pesquisar CPF Presidente"]').click()
      cy.contains('button', 'OK').should('be.visible').click();

      cy.get("#nomePresidente").type(faker.internet.email())

      const data = faker.date.anytime()

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0'); // meses começam em 0
      const ano = data.getFullYear();

      const dataFormatada = `${dia}/${mes}/${ano}`;

      cy.wait(2000)
      cy.get('#dataEleicaoPresidente').type(dataFormatada)

      cy.get('#dataInicioMandatoPresidente').type(dataFormatada)
      cy.get('#dataTerminoMandatoPresidente').type(dataFormatada)
   }

   

   preencherDadosDiretor(){
      cy.get('[name="cpfDiretor"]').type(this.gerarCpf());
      cy.get('[title="Pesquisar CPF Diretor"]').click();
      cy.contains('button', 'OK').should('be.visible').click();
      cy.wait(2000)
      cy.get('#nomeDiretor').type(faker.internet.email());
  }


  selecionaModalidade(){
     cy.get('#modalidade-0').check();
  }

  modalSucesso(){
     cy.contains('button', 'Salvar').should('be.visible').click();
     cy.contains('h2', 'Sucesso').should('be.visible');
  }

  clickPesquisar() {
    cy.contains('button', 'Pesquisar').should('be.visible').click();
  }

  clickConfirmacaoModal(){
    cy.contains('button', 'OK').should('be.visible').click();
  }
}

export default new RegistrarClubePage();
