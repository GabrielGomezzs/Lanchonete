# Sistema de Pedidos de Lanches

Este projeto é um sistema simples de pedidos de lanches implementado em Node.js, que simula a realização de pedidos e o cálculo de taxas de entrega. Ele também salva os pedidos em um arquivo JSON para armazenamento.

## Funcionalidades

- Escolha de itens de um cardápio pré-definido.
- Cálculo automático do valor do pedido e da taxa de entrega (17%).
- Inclusão ou censura do CPF do cliente na nota.
- Salvamento automático dos pedidos realizados em um arquivo `pedidosSalvos.json`.
- Data e hora do pedido são registradas automaticamente.
- Saída formatada para exibição clara dos itens, valores e total.

## Como Usar

### Pré-requisitos
- Node.js instalado.

### Instruções para rodar o projeto

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/GabrielGomezzs/Lanchonete.git
    cd seu-repositorio
    ```

2. **Instale as dependências (caso haja):**

    ```bash
    npm install
    ```

3. **Execute o script:**

    ```bash
    node lanchonete.js
    ```

    O script processa o pedido e imprime a nota no console, além de salvar o pedido no arquivo `pedidosSalvos.json`.

### Exemplo de Uso

Você pode usar a função `pedirLanche` passando os parâmetros do cliente, os itens do pedido, o endereço e se o CPF será mostrado completo ou censurado. Aqui está um exemplo:

```javascript
let resultado = pedirLanche(
    "Gabriel Gomes", 
    "57366263818", 
    ["Hambúrguer", "Combo Duo", "Milkshake", "Salada"], 
    "Rua Aprovada 610, 332",
    "sim"  // "sim" para exibir o CPF completo, "não" para censurar
);
console.log(resultado);
```

