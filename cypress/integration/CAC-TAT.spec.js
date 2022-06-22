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
      cy.get('button[type="submit"]').click()

      cy.get('.success').should('be.visible')
   })

   it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('Aldiney')
      cy.get('#lastName').type('Ribeiro')
      cy.get('#email').type('aldiney.ribeiro@gmail,com')
      cy.get('#open-text-area').type('teste')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
   })
})

