const fs = require('fs'); // Módulo para manipulação de arquivos

// Definindo o cardápio com preços
const cardapio = {
    "Hambúrguer":       15.00,
    "Batata Frita":     8.00,
    "Refrigerante":     5.00,
    "Milkshake":        10.00,
    "Salada":           12.00,
    "Combo Unitário":   25.00,       // 1 Hambúrguer, 1 Batata Frita, 1 Refrigerante
    "Combo Duo":        50.00        // 2 Hambúrgueres, 2 Batatas Fritas, 2 Refrigerantes
};

// Função para censurar o CPF (mantendo os últimos 3 dígitos visíveis)
function cpfCensurado(cpf) {
    return cpf.slice(0, 3) + ".***.***-" + cpf.slice(-3);
}

// Função para formatar a saída dos itens
function formatarItem(item, valor) {
    return `${item.padEnd(20)} R$ ${valor.toFixed(2)}`;
}

// Função para pedir um lanche e mostrar a quantidade de itens
function pedirLanche(nome, cpf, pedido, endereco, incluirCpfNaNota) {
    const quantidadeItens = {};
    let total = 0;

    // Criando o objeto do pedido completo com data e hora
    const pedidoCompleto = {
        nome: nome,
        cpf: incluirCpfNaNota.toLowerCase() === "sim" ? cpf : cpfCensurado(cpf),
        itens: [],
        endereco: endereco || "Retirada no local.",
        total: 0,
        taxaEntrega: 0,
        totalFinal: 0,
        dataHora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) // Formato de data e hora
    };

    let mensagemPedido = `------------\nPedido confirmado!\n------------\nData: ${pedidoCompleto.dataHora}\nNome: ${pedidoCompleto.nome}\nCPF: ${pedidoCompleto.cpf}\nItens pedidos:\n`;

    // Verificando se os itens pedidos estão no cardápio e somando o valor total
    for (let item of pedido) {
        if (cardapio[item]) {
            if (quantidadeItens[item]) {
                quantidadeItens[item]++;
            } else {
                quantidadeItens[item] = 1;
            }
            total += cardapio[item];
        } else {
            return `O item '${item}' não está no cardápio.`;
        }
    }

    // Exibindo a quantidade de cada item
    for (let item in quantidadeItens) {
        const valorItem = cardapio[item] * quantidadeItens[item];
        pedidoCompleto.itens.push({
            item: item,
            quantidade: quantidadeItens[item],
            valor: valorItem
        });
        mensagemPedido += formatarItem(`${quantidadeItens[item]}X ${item}`, valorItem) + "\n";
    }

    // Calculando a taxa de entrega (17% do total)
    pedidoCompleto.taxaEntrega = total * 0.17;

    // Adicionando o endereço de entrega
    mensagemPedido += `\nEndereço: ${pedidoCompleto.endereco}`;

    // Total a pagar com a taxa de entrega
    pedidoCompleto.total = total;
    pedidoCompleto.totalFinal = total + pedidoCompleto.taxaEntrega;

    mensagemPedido += `\n\nTotal do pedido: R$ ${pedidoCompleto.total.toFixed(2)}`;
    mensagemPedido += `\nTaxa de entrega: R$ ${pedidoCompleto.taxaEntrega.toFixed(2)}`;
    mensagemPedido += `\nTotal a pagar:   R$ ${pedidoCompleto.totalFinal.toFixed(2)}\n------------`;

    // Exibe o resumo do pedido no console
    console.log(mensagemPedido);

    // Salvar o pedido em um arquivo JSON
    salvarPedidoEmArquivo(pedidoCompleto);

    // Retorna a mensagem do pedido (isso resolve o erro de `undefined` no console)
    return mensagemPedido;
}

// Função para salvar o pedido em um arquivo JSON
function salvarPedidoEmArquivo(pedido) {
    const arquivo = 'pedidosSalvos.json';

    // Lendo o arquivo existente
    let pedidosExistentes = [];
    if (fs.existsSync(arquivo)) {
        const dadosExistentes = fs.readFileSync(arquivo, 'utf8');
        if (dadosExistentes) {
            pedidosExistentes = JSON.parse(dadosExistentes); // Lê e converte para objeto
        }
    }

    // Adicionando o novo pedido
    pedidosExistentes.push(pedido);

    // Salvando todos os pedidos de volta no arquivo
    fs.writeFileSync(arquivo, JSON.stringify(pedidosExistentes, null, 2), 'utf8');
}

// Exemplo de uso
let resultado1 = pedirLanche(
    "Gabriel Gomes", 
    "09345626810", 
    ["Hambúrguer", "Combo Duo", "Milkshake", "Salada"], 
    "Av Paulista, 1450",
    "sim"  // "sim" para mostrar CPF completo, "não" para censurar
);
let resultado2 = pedirLanche(
    "Flávia Antunes",
    "05346821091",
    ["Combo Unitário", "Batata Frita", "Salada"],
    "Passeio dos Estudantes, 258",
    "não"
)

// Saída em JSON
console.log(resultado1);
console.log(resultado2)

