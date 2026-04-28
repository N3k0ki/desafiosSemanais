// Importa o módulo 'readline' do Node.js
// Esse módulo permite ler o que o usuário digita no terminal
const readline = require('readline');


// Expressão regular (regex) para encontrar vogais
// [] → conjunto de caracteres que queremos encontrar
// () → agrupa o resultado encontrado
// g → global (pega TODAS as ocorrências na frase)
// i → ignora maiúsculas/minúsculas (case insensitive)
const regexVogais = /([aeiouáéíóúâêîôûãõ])/gi;


// Função que traduz um texto para a "língua do P"
// Função = bloco de código reutilizável
// 'texto' é o parâmetro (entrada da função)
function traduzirParaLinguaDoP(texto) {

    // replace → percorre o texto e substitui partes dele
    // 1º parâmetro: o que procurar (regexVogais)
    // 2º parâmetro: função que define COMO substituir
    return texto.replace(regexVogais, (vogal) => {

        // Aqui usamos um operador ternário (? :)
        // Estrutura: condição ? valor_se_true : valor_se_false

        // vogal === vogal.toUpperCase()
        // === → operador de comparação (igualdade estrita)
        // Compara se a vogal já está em maiúsculo

        // Se for maiúscula → usa 'P'
        // Se for minúscula → usa 'p'
        const p = (vogal === vogal.toUpperCase()) ? 'P' : 'p';


        // + → operador de concatenação (juntar textos)
        // Monta a nova string no formato:
        // vogal + p + vogal  → exemplo: a → apa
        return vogal + p + vogal;
    });
}


// Cria uma interface de comunicação com o terminal
// readline.createInterface cria um "canal" de entrada/saída
const terminal = readline.createInterface({

    // process.stdin → entrada de dados (teclado)
    input: process.stdin,

    // process.stdout → saída de dados (tela)
    output: process.stdout
});


// Faz uma pergunta no terminal
// 1º argumento: texto exibido
// 2º argumento: função que executa depois da resposta
terminal.question('Digite a frase: ', (frase) => {

    // trim() → remove espaços do começo e do fim
    // !== → operador "diferente de"
    // Verifica se a frase NÃO está vazia
    if (frase.trim() !== '') {

        // console.log → mostra mensagem no terminal
        console.log('Original:', frase);

        // Chama a função de tradução e mostra o resultado
        console.log('Traduzida:', traduzirParaLinguaDoP(frase));

    } else {

        // Caso o usuário não digite nada
        console.log('Nenhuma frase foi digitada.');
    }

    // Fecha a interface do terminal
    // Isso encerra o programa corretamente
    terminal.close();
});