import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser'; // Importe o body-parser
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Adicione o body-parser para interpretar JSON

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/generateQR', async function (req, res) {
    // Obter dados do formulário
    const { fullname, email, cpf, phone } = req.body;

    // Criar um pedido na API do PagSeguro
    try {
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
                            "area": phone.substring(0, 2),
                            "number": phone.substring(2),
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
    } catch (error) {
        console.error("Erro ao gerar o QR:", error);
        res.status(500).send("Erro ao gerar o QR.");
    }
});

