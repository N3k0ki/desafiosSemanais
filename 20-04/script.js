// :clipboard: 1. NOSSO CHECKLIST DE REGRAS
// Em vez de criar dezenas de "ifs", criamos uma lista (Array) de validações.
// Isso deixa o código limpo e fácil de adicionar novas regras no futuro.
const regrasDeSenha =[
    {
        // Regra do tamanho da senha
        teste: (senha) => senha.length >= 8,
        mensagem: "Ter pelo menos 8 caracteres"
    },
    {
        // O Regex (/[0-9]/) é o "cão farejador": procura qualquer número de 0 a 9
        teste: (senha) => /[0-9]/.test(senha),
        mensagem: "Conter pelo menos 1 número"
    },
    {
        // Procura qualquer letra maiúscula de A a Z
        teste: (senha) => /[A-Z]/.test(senha),
        mensagem: "Conter pelo menos 1 letra maiúscula"
    },
    {
        // Procura símbolos. Se achar, passa no teste.
        teste: (senha) => /[!@#$%^&*(),.?":{}|<>]/.test(senha),
        mensagem: "Conter pelo menos 1 caractere especial (!@#$%, etc.)"
    }
];

function validarSenha() {
    // :dart: 2. PEGAR OS DADOS DA TELA
    // Pega o que foi digitado e a caixinha vazia onde vamos mostrar a resposta
    const senha = document.getElementById('senhaInput').value;
    const divResultado = document.getElementById('resultado');

    // :detective: 3. A "PENEIRA" (A mágica acontece aqui)
    const erros = regrasDeSenha
        // O .filter passa a peneira: segura APENAS as regras que a senha NÃO passou (por causa do '!')
        .filter(regra => !regra.teste(senha))
        // O .map pega essas regras que falharam e extrai SÓ o texto da mensagem de erro

    // :partying_face: 4. O CAMINHO FELIZ (Tudo certo)
    // Se não sobrou nenhum erro na peneira (tamanho zero), a senha é forte!
    if (erros.length === 0) {
        divResultado.innerHTML = `<p class="sucesso">✅ Senha válida!</p>`;
        return; // O return encerra a função aqui. Não precisamos de um "Else" gigante!
    }

    // :rotating_light: 5. MOSTRANDO OS ERROS NA TELA (Se não parou no return, tem erro)
    // Transforma a listinha de textos em tags <li> (pontinhos de lista do HTML) e junta tudo com o .join('')
    const itensLista = erros.map(erro => `<li>${erro}</li>`).join('');
    
    // Joga o aviso vermelho e a lista de erros dentro da tela do usuário
    divResultado.innerHTML = `
        <p class="erro-titulo">:x: Senha inválida! Falta:</p>
        <ul class="erro-lista">
            ${itensLista}
        </ul>
    `;
}