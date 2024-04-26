import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/generateQR', async function (req, res) {
    // Obter dados do formulário
    const { fullname, email, cpf, phone } = req.body;

    // Criar um pedido na API do PagSeguro
    let reqs = await fetch('https://sandbox.api.pagseguro.com/orders', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'SEU_TOKEN'
        },
        body: JSON.stringify({
            "reference_id": "ex-00001",
            "customer": {
                "name": fullname,
                "email": email,
                "tax_id": cpf,
                "phones": [
                    {
                        "country": "55",
                        "area": phone.substring(0, 2), // Pegando os primeiros 2 dígitos como código de área
                        "number": phone.substring(2), // Removendo os primeiros 2 dígitos para obter o número do telefone
                        "type": "MOBILE"
                    }
                ]
            },
            "items": [
                {
                    "name": "nome do item",
                    "quantity": 1,
                    "unit_amount": 500
                }
            ],
            "qr_codes": [
                {
                    "amount": {
                        "value": 500
                    },
                    "expiration_date": "2024-05-29T20:15:59-03:00",
                }
            ],
            "shipping": {
                "address": {
                    "street": "Avenida Brigadeiro Faria Lima",
                    "number": "1384",
                    "complement": "apto 12",
                    "locality": "Pinheiros",
                    "city": "São Paulo",
                    "region_code": "SP",
                    "country": "BRA",
                    "postal_code": "01452002"
                }
            },
            "notification_urls": [
                "https://meusite.com/notificacoes"
            ]
        })
    });

    let ress = await reqs.json();
    let qrUrl = ress.qr_codes[0].links[0].href;

    // Redirecionar para o HTML com os dados para exibir o QR code
    res.redirect(`/payment-success?qrUrl=${qrUrl}`);
});

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000!');
});
