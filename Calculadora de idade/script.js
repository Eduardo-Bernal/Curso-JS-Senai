document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-cadastro");
    formulario.addEventListener("submit", calcularIdade);
    carregarUsuarios();
});

function pegarValores() {
    const nome = document.getElementById("nome").value.trim();
    const dia = parseInt(document.getElementById("dia").value);
    const mes = parseInt(document.getElementById("mes").value);
    const ano = parseInt(document.getElementById("ano").value);

    return {
        nome,
        dia,
        mes,
        ano
    };
}

function calcularIdade(event) {
    event.preventDefault();

    const dadosUsuario = pegarValores();

    const idadeCalculada = calcular(
        dadosUsuario.dia,
        dadosUsuario.mes,
        dadosUsuario.ano
    );

    const classificacao = classificarIdade(idadeCalculada);

    const usuarioFinal = organizarDados(
        dadosUsuario,
        idadeCalculada,
        classificacao
    );

    cadastrarUsuario(usuarioFinal);
    carregarUsuarios();

    document.getElementById("form-cadastro").reset();
}

function calcular(dia, mes, ano) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - ano;

    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    if (mesAtual < mes) {
        idade--;
    } else if (mesAtual === mes && diaAtual < dia) {
        idade--;
    }

    return idade;
}

function classificarIdade(idade) {
    if (idade >= 0 && idade <= 12) return "Criança";
    if (idade <= 17) return "Adolescente";
    if (idade <= 64) return "Adulto";
    if (idade >= 65) return "Idoso";

    return "Idade inválida";
}

function organizarDados(dadosUsuario, idade, classificacao) {
    const dataAtual = new Date().toLocaleString("pt-BR");

    return {
        nome: dadosUsuario.nome,
        idade: idade,
        classificacao: classificacao,
        dataCadastro: dataAtual
    };
}

function cadastrarUsuario(usuario) {
    let lista = [];
    const dadosSalvos = localStorage.getItem("usuariosCadastrados");

    if (dadosSalvos) {
        lista = JSON.parse(dadosSalvos);
    }

    lista.push(usuario);

    localStorage.setItem(
        "usuariosCadastrados",
        JSON.stringify(lista)
    );
}

function carregarUsuarios() {
    const tabela = document.getElementById("corpo-tabela");
    const dadosSalvos = localStorage.getItem("usuariosCadastrados");

    let lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    if (lista.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="4">Nenhum registro encontrado!</td>
            </tr>
        `;
        return;
    }

    let linhas = "";

    lista.forEach(function (pessoa) {
        linhas += `
        <tr>
            <td>${pessoa.nome}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.classificacao}</td>
            <td>${pessoa.dataCadastro}</td>
        </tr>
        `;
    });

    tabela.innerHTML = linhas;
}