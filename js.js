alert("Bem-vindo(a)!");

let Nome = prompt("Digite seu nome: ");

let OutroPedido = 1;

while (OutroPedido === 1) {
    let Bebida = prompt("Escolha alguma bebida: ");
    let Sugar = parseInt(prompt("Deseja adicionar açúcar?\nSe sim digite 1\nSe não digite 0"));

    if (Sugar === 1) {
        
        OutroPedido = parseInt(prompt("Ok, irei adicionar açúcar. Deseja algo mais?\nDigite 1 para sim\nDigite 0 para não"));
    } else {
        
        OutroPedido = parseInt(prompt("Ok. Deseja algo mais?\nDigite 1 para sim\nDigite 0 para não"));
    }

    if (OutroPedido == 0) {
        alert("Volte sempre!");
    }
}