/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function() {
      cy.visit('./src/index.html');
   })

   it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
   })

   it('preenche os campos obrigatórios e envia o formulário', function() {
      const textLong = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor augue lorem, eu bibendum mauris blandit et. Vivamus eu scelerisque purus. Proin quis libero consequat, tempus nisl in, lacinia augue. Nunc eros augue, rutrum quis pretium ut, molestie sed turpis. Integer eget nibh dolor. Praesent iaculis ac ante sed luctus. Sed rhoncus accumsan cursus. Praesent hendrerit in tellus vel iaculis. Aenean ut condimentum sapien. Suspendisse mauris nisl, dignissim id porta ac, venenatis id sapien. Suspendisse at suscipit neque, vel rhoncus lacus. Mauris sem dolor, fermentum quis congue scelerisque, condimentum vel ex. Sed ut ex rhoncus, porttitor ipsum vitae, pellentesque dolor.'
      cy.get('#firstName').type('Aldiney')
      cy.get('#lastName').type('Ribeiro')
      cy.get('#email').type('aldiney.ribeiro@gmail.com')
      cy.get('#open-text-area').type(textLong, { delay: 0 })
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
   })

   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('Aldiney')
      cy.get('#lastName').type('Ribeiro')
      cy.get('#email').type('aldiney.ribeiro@gmail,com')
      cy.get('#open-text-area').type('teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
   })

   it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
      cy.get('#phone')
         .type('texto')
         .should('have.value', '')
   })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#firstName').type('Aldiney')
      cy.get('#lastName').type('Ribeiro')
      cy.get('#email').type('aldiney.ribeiro@gmail.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
   })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
      cy.get('#firstName')
         .type('Aldiney')
         .should('have.value', 'Aldiney')
         .clear()
         .should('have.value', '')
      cy.get('#lastName')
         .type('Ribeiro')
         .should('have.value', 'Ribeiro')
         .clear()
         .should('have.value', '')
      cy.get('#email')
         .type('aldiney.ribeiro@gmail.com')
         .should('have.value', 'aldiney.ribeiro@gmail.com')
         .clear()
         .should('have.value', '')
      cy.get('#phone')
         .type('123456789')
         .should('have.value', '123456789')
         .clear()
         .should('have.value', '')
   })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
   })

   it('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
   })

   it('seleciona um produto (YouTube) por seu texto', function(){
      cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')
   })

   it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product')
         .select('mentoria')
         .should('have.value', 'mentoria')
   })

   it.only('seleciona um produto (Blog) por seu índice', function() {
      cy.get('#product')
         .select(1)
         .should('have.value', 'blog')
   })
})

