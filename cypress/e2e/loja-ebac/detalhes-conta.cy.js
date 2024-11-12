/// <reference types="cypress"/>

describe('Funcionalidade: Detalhes da conta', () => { // para entrar em uma parte do site que precise logar, usando comandos customizados

    beforeEach(() => {
        cy.visit('minha-conta/edit-account')
        cy.fixture('perfil').then(login => {
            cy.login(login.usuario, login.senha)
        })
    });

    it('Deve completar detalhes da conta com sucesso', () => {
        cy.detalhesConta('Daniella', 'Maleski', 'danimaleski')
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });
    
});