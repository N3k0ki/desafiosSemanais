// Importa módulos nativos do Node.js
const crypto = require('crypto'); // responsável pela criptografia
const readline = require('readline'); // permite ler entrada do usuário no terminal

// ------------------ CONFIGURAÇÃO DA CRIPTOGRAFIA ------------------

// Define o algoritmo de criptografia
const ALGORITMO = 'aes-256-cbc'; 
// AES-256 = criptografia forte com chave de 256 bits
// CBC = modo de operação (Cipher Block Chaining)

// Gera uma chave secreta aleatória de 32 bytes (necessário para AES-256)
const CHAVE_SECRETA = crypto.randomBytes(32);

// Gera um vetor de inicialização (IV) de 16 bytes
const IV = crypto.randomBytes(16);
// O IV garante que a mesma mensagem gere resultados diferentes ao criptografar

// ------------------ FUNÇÃO DE CRIPTOGRAFIA ------------------

function criptografarMensagem(mensagem) {
    // Cria o objeto de criptografia usando algoritmo, chave e IV
    const cipher = crypto.createCipheriv(ALGORITMO, CHAVE_SECRETA, IV);

    // Converte a mensagem de texto (utf8) para formato criptografado (hex)
    let criptografado = cipher.update(mensagem, 'utf8', 'hex');

    // Finaliza a criptografia (necessário para completar o processo)
    criptografado += cipher.final('hex');

    return criptografado;
}

// ------------------ FUNÇÃO DE DESCRIPTOGRAFIA ------------------

function descriptografarMensagem(mensagemCriptografada) {
    // Cria o objeto para reverter a criptografia
    const decipher = crypto.createDecipheriv(ALGORITMO, CHAVE_SECRETA, IV);

    // Converte de hex de volta para texto (utf8)
    let descriptografado = decipher.update(mensagemCriptografada, 'hex', 'utf8');

    // Finaliza o processo
    descriptografado += decipher.final('utf8');

    return descriptografado;
}

// ------------------ INTERAÇÃO COM O USUÁRIO ------------------

// Cria interface para entrada e saída no terminal
const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Solicita uma mensagem ao usuário
terminal.question('Digite a mensagem que deseja enviar: ', (mensagemOriginal) => {

    // Verifica se a mensagem não está vazia
    if (mensagemOriginal.trim() !== '') {

        // Criptografa a mensagem
        const mensagemCriptografada = criptografarMensagem(mensagemOriginal);

        // Descriptografa para validar o processo
        const mensagemDescriptografada = descriptografarMensagem(mensagemCriptografada);

        // Mostra os resultados
        console.log('\nOriginal:', mensagemOriginal);
        console.log('Criptografada:', mensagemCriptografada);
        console.log('Descriptografada:', mensagemDescriptografada);
    } else {
        console.log('Nenhuma mensagem foi digitada.');
    }
    
    // Fecha o terminal
    terminal.close();
});