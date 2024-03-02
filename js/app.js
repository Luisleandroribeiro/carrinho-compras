let saldoTotal;
let carrinhoProdutos = {}; // Usar um objeto para armazenar os produtos no carrinho

limpar();

function adicionar() {
    let produtoElement = document.getElementById('produto');
    let quantidadeElement = document.getElementById('quantidade');

    let produto = produtoElement.value;
    let quantidade = parseFloat(quantidadeElement.value);

    if (!produto || produto.trim() === "") {
        alert("Selecione um produto válido.");
        return;
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Insira uma quantidade válida.");
        return;
    }

    let nomeProduto = produto.split('-')[0];
    let valorNumerico = parseFloat(produto.split('R$')[1]);

    let subtotal = valorNumerico * quantidade;

    // Verificar se o produto já está no carrinho
    if (carrinhoProdutos[nomeProduto]) {
        // Atualizar a quantidade se o produto já estiver no carrinho
        saldoTotal -= carrinhoProdutos[nomeProduto].subtotal; // Remover valor anterior
        carrinhoProdutos[nomeProduto].quantidade = quantidade;
        carrinhoProdutos[nomeProduto].subtotal = subtotal;
    } else {
        // Adicionar o produto ao carrinho
        carrinhoProdutos[nomeProduto] = {
            quantidade: quantidade,
            valorNumerico: valorNumerico,
            subtotal: subtotal
        };
    }

    // Atualizar a exibição do carrinho
    atualizarCarrinho();

    saldoTotal += subtotal;
    let campoTotal = document.getElementById('valor-total');
    campoTotal.textContent = `R$ ${saldoTotal.toFixed(2)}`;
    quantidadeElement.value = 0;
}

function limpar() {
    saldoTotal = 0;
    carrinhoProdutos = {};
    atualizarCarrinho();
    let campoTotal = document.getElementById('valor-total').textContent = 'R$ 0.00';
}

function atualizarCarrinho() {
    let carrinhoDeCompra = document.getElementById('lista-produtos');
    carrinhoDeCompra.innerHTML = '';

    for (let produto in carrinhoProdutos) {
        let item = carrinhoProdutos[produto];
        carrinhoDeCompra.innerHTML += `<section class="carrinho__produtos__produto">
            <span class="texto-azul">${item.quantidade}x</span> ${produto} <span class="texto-azul">R$${item.valorNumerico}</span>
        </section>`;
    }
}
