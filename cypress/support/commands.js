Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
   cy.get('#firstName').type('Aldiney')
   cy.get('#lastName').type('Ribeiro')
   cy.get('#email').type('aldiney.ribeiro@gmail.com')
   cy.get('#open-text-area').type('teste')
   cy.get('button[type="submit"]').click()
})