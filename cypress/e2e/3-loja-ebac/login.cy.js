///<reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('dani.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, dani.teste')
    })


    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('dani@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')  
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('dani.teste@teste.com.br')
        cy.get('#password').type('teste12300')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail dani.teste@teste.com.br está incorreta.')
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, dani.teste')
    })

    it('Deve fazer login com sucesso - Usando Fixture', () => { //utilizando funções nativas do Cypress
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log: false}) // log false serve para esconder o dado no video de execuçao do cypress
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, dani.teste')
        })
    })

    it.only('Deve fazer login com sucesso usando comandos customizados', () => {
        //cy.login('dani.teste@teste.com.br', 'teste@123') //usando dados diretos
        //cy.login(perfil.usuario, perfil.senha) //usando massa de dados
        cy.fixture('perfil').then(dados => { //usando fixtures
            cy.login(dados.usuario, dados.senha)
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, dani.teste')
        })
        
    });
})
