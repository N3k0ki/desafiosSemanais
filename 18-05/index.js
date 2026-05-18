const { error } = require('console');
const readline = require('readline/promises');

const obterSituacao = (nota) => {
    if (nota >= 7) return 'Aprovado';
    if (nota >= 5) return 'Recuperação';
    return 'reprovado'
}

const obterBonus = (nota) => {
    if (nota >= 9) return 'Excelente desempenho! <3';
    if (nota < 3) return 'Precisa melhorar';
    return null
}

const processarAvaliacao = (entradaUsuario) => {
    const nota = parseFloat(entradaUsuario.replace(',', '.'));

    if (isNaN(nota) || nota < 0 || nota > 10){
        throw new Error('nota invalida! Digite um número de 0 a 10.')
    }

    return{
        notaOriginal: nota.toFixed(1),
        situacao: obterSituacao(nota),
        bonus: obterBonus(nota)
    };
};

async function iniciarSistema() {
    const terminal = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\n === SISTEMA DE NOTAS ESCOLARES == \n')

     while (true) {
        try {
            const entrada = await terminal.question('Digite a nota do aluno (0 a 10): ');

            if (entrada.toLowerCase() === 'sair') {
                console.log('\nEncerrando sistema... 👋\n');
                break;
            }

            const resultado = processarAvaliacao(entrada);

            console.log(` Nota digitada: ${resultado.notaOriginal}`);
            console.log(` Situação final: ${resultado.situacao}`);

            if (resultado.bonus) {
                console.log(` Observação: ${resultado.bonus}`);
            }


        } catch (erro) {
            console.log(`\n Erro: ${erro.message}\n`);
        }
    }
}

iniciarSistema();