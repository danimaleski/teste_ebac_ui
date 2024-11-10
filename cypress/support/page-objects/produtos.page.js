class ProdutosPage {

    visitarUrl() {
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get(' .button-search').eq(1).click()
    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.product-block')
        .contains(nomeProduto)
        .click()
    }

    visitarProduto(nomeProduto) {
        //cy.visit(`produtos/${nomeProduto}`) //interpolação são as crases, juntar o nome com o que vou receber no parâmetro = concatenação

        //o código abaixo serve para não ter problema com a url, não precisando colocar hífen no parâmetro desejado
        const urlFormatada = nomeProduto.replace(/ /g, '-') //g seria de forma global, replace colocar hífen nos espaços em branco
        cy.visit(`produtos/${urlFormatada}`)

    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        //código abaixo com string fixos do site

        //cy.get('.button-variable-item-M').click()
        //cy.get('.button-variable-item-Red').click()
        //cy.get('.input-text').clear().type(1)

        //código abaixo com parâmetros do teste + string 

        cy.get('.button-variable-item-' + tamanho).click() //uma das formas com parâmetro da função
        cy.get(`.button-variable-item-${cor}`).click() //uma das formas interpolação
        cy.get('.input-text').clear().type(quantidade)
        
        cy.get('.single_add_to_cart_button').click()
    }
}

export default new ProdutosPage