///<reference types="cypress"/>

beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
});

describe('Funcionalidade: Produtos', () => {

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block')
            //.first() primeiro item da lista
            //.last() último item da lista
            //.eq(2) pega um elemento específico da lista, só colocar a ordem em que o elemento está, neste caso seria o terceiro elemento da lista
            .contains('Apollo Running Short')
            .click()

            cy.get('#tab-title-description > a').should('contain', 'Descrição')
    });
});