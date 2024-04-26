document.addEventListener('DOMContentLoaded', function () {
    selectPaymentMethod('card');
});

function selectPaymentMethod(method) {
    const cardOption = document.getElementById('card-option');
    const pixOption = document.getElementById('pix-option');

    if (method === 'card') {
        document.getElementById('card-section').style.display = 'block';
        document.getElementById('pix-section').style.display = 'none';
        cardOption.classList.add('selected');
        pixOption.classList.remove('selected');
    } else if (method === 'pix') {
        document.getElementById('card-section').style.display = 'none';
        document.getElementById('pix-section').style.display = 'block';
        cardOption.classList.remove('selected');
        pixOption.classList.add('selected');
    }
}

const chavePix = "pabluopayments+mp@gmail.com";
const valor = 24.97; // Exemplo de valor
const descricao = "Descrição do pagamento PIX"; // Descrição do pagamento

// Configuração do Mercado Pago
Mercadopago.setPublishableKey('APP_USR-bfa1f595-46ed-48d9-b26c-ce5d5194926a');

// Função para iniciar o pagamento PIX
function pagarComPix() {
    const pagamento = {
        method: 'pix',
        pix: {
            key: chavePix,
        },
        transaction_amount: valor,
        description: descricao,
    };

    // Realiza o pagamento
    Mercadopago.createPayment(pagamento, function (status, response) {
        if (status === 201) {
            // Pagamento realizado com sucesso
            console.log('Pagamento PIX realizado com sucesso:', response);
            // Redirecionar para página de sucesso ou fazer outras ações necessárias
        } else {
            // Erro ao processar pagamento
            console.error('Erro ao processar pagamento PIX:', response);
            // Exibir mensagem de erro para o usuário
        }
    });
}
