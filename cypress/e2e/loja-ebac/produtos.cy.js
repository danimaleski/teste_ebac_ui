///<reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

beforeEach(() => {
	//cy.visit('produtos')
	produtosPage.visitarUrl();
});

describe("Funcionalidade: Produtos", () => {
	it("Deve selecionar um produto da lista", () => {
		cy.get(".product-block")
			//.first() primeiro item da lista
			//.last() último item da lista
			//.eq(2) pega um elemento específico da lista, só colocar a ordem em que o elemento está, neste caso seria o terceiro elemento da lista
			.contains("Apollo Running Short")
			.click();

		cy.get("#tab-title-description > a").should("contain", "Descrição");
	});

	it("Deve selecionar um produto da lista - usando PO", () => {
		produtosPage.buscarProdutoLista("Atlas Fitness Tank");

		cy.get("#tab-title-description > a").should("contain", "Descrição");
	});

	it("Deve buscar um produto com sucesso", () => {
		let produto = "Pierce Gym Short"; //variável, pode vir de uma lista
		produtosPage.buscarProduto(produto); //pode colocar o nome do produto ou o nome de uma variável
		cy.get(".product_title").should("contain", produto);
	});

	it("Deve visitar a página do produto ", () => {
		produtosPage.visitarProduto("Kratos Gym Pant");
		cy.get(".product_title").should("contain", "Kratos Gym Pant");
	});

	it("Deve adicionar produto ao carrinho", () => {
		let quant = 7; //usando variáveis para passar a quantidade

		produtosPage.buscarProduto("Autumn Pullie");
		produtosPage.addProdutoCarrinho("M", "Red", quant);

		cy.get(".woocommerce-message").should(
			"contain",
			quant + " × “Autumn Pullie” foram adicionados no seu carrinho"
		);
	});

	it.only("Deve adicionar produto ao carrinho buscando da massa de dados", () => {
		cy.fixture("produtos").then((dados) => {
			//com array
			produtosPage.buscarProduto(dados[4].nomeProduto);
			produtosPage.addProdutoCarrinho(
				dados[4].tamanho,
				dados[4].cor,
				dados[4].quantidade
			);

			cy.get(".woocommerce-message").should("contain", dados[4].nomeProduto);
		});
	});
});
