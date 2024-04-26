document.addEventListener('DOMContentLoaded', function () {
    // Definindo o event listener para o submit do formulário
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário

        // Verifica se o método de pagamento é Pix
        if (document.getElementById('pix-option').classList.contains('selected')) {
            // Verifica se todos os campos estão preenchidos
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const confirmEmail = document.getElementById('confirm-email').value;
            const cpf = document.getElementById('cpf').value;
            const phone = document.getElementById('phone').value;

            // Verifica se todos os campos obrigatórios estão preenchidos
            if (fullname && email && confirmEmail && cpf && phone) {
                // Exibe o payment-success se todos os campos estiverem preenchidos
                document.getElementById('payment-success').style.display = 'block';
            } else {
                // Caso contrário, exibe uma mensagem de erro ou realiza outras ações necessárias
                alert('Por favor, preencha todos os campos.');
            }
        }
    });

    // Definindo event listeners para validação em tempo real
    const fullnameInput = document.getElementById('fullname');
    fullnameInput.addEventListener('input', function () {
        validateInput(fullnameInput);
    });

    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function () {
        validateInput(emailInput);
    });

    const confirmEmailInput = document.getElementById('confirm-email');
    confirmEmailInput.addEventListener('input', function () {
        validateInput(confirmEmailInput);
    });

    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function () {
        validateInput(cpfInput);
    });

    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function () {
        validateInput(phoneInput);
    });
});

function validateInput(input) {
    if (input.checkValidity()) {
        input.classList.remove('input-invalid');
        input.classList.add('input-valid');
    } else {
        input.classList.remove('input-valid');
        input.classList.add('input-invalid');
    }
}

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
