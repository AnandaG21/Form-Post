import express from 'express';
const app = express();
const host = 'localhost';
const porta = 3009;

app.use(express.urlencoded({ extended: true }));

// Array para armazenar os pacientes cadastrados
const paciente = [];

app.get('/', (req, res) => {
    // Gerar a lista de pacientes cadastrados para exibição
    const listaPaciente = paciente.map((p, index) => `
    <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
        <h3>Paciente #${index + 1}</h3>
        <p><strong>Nome:</strong> ${p.nome}</p>
        <p><strong>Idade:</strong> ${p.Idade}</p>
        <p><strong>Sexo:</strong> ${p.Sexo}</p>
        <p><strong>Convênio:</strong> ${p.convenio || 'Sem convênio'}</p>
        <p><strong>Endereço:</strong> ${p.Endereco}</p>
        <p><strong>Número:</strong> ${p.Numero}</p>
        <p><strong>Bairro:</strong> ${p.Bairro}</p>
        <p><strong>Cidade:</strong> ${p.Cidade}</p>
        <p><strong>Estado:</strong> ${p.Estado}</p>
        <p><strong>CEP:</strong> ${p.CEP}</p>
        <p><strong>Celular:</strong> ${p.Celular}</p>
    </div>
    `).join('');

    res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Cadastro do Paciente</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #b5b5f7;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                height: 100%;
                margin: 0;
                padding: 20px;
                overflow-y: auto; /* Permite rolagem da página inteira */
            }
            .form-container {
                width: 700px;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
                margin-bottom: 20px;
            }
            .form-container h2 {
                text-align: center;
                color: #4a4a8c;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            ul li {
                background-color: #f0f0f0;
                margin: 5px 0;
                padding: 10px;
                border-radius: 8px;
            }
            .form-container form {
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 20px;
                row-gap: 10px;
            }
            .form-container label {
                color: #333333;
                font-weight: bold;
            }
            .form-container input,
            .form-container select {
                padding: 10px;
                border-radius: 8px;
                border: 1px solid #ccc;
                font-size: 14px;
                width: 100%;
                box-sizing: border-box;
            }
            .address-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 10px;
                grid-column: span 2;
            }
            .complement-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 10px;
                grid-column: span 2;
            }
            .three-column {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 10px;
                grid-column: span 2;
            }
            .button-container {
                grid-column: span 2;
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }
            .form-container button {
                width: 48%;
                padding: 10px;
                border-radius: 8px;
                border: none;
                color: white;
                cursor: pointer;
                font-weight: bold;
                font-size: 14px;
            }
            .form-container button[type="submit"] {
                background-color: #4a4a8c;
            }
            .form-container button[type="reset"] {
                background-color: #888888;
            }
            .form-container button:hover {
                opacity: 0.9;
            }

            /* Estilo para a lista de pacientes */
            .patient-list {
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        <div class="form-container">
            <h2>Cadastro do Paciente</h2>
            <form action="/submit" method="POST">
                <div>
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" required>
                </div>
                <div>
                    <label for="Idade">Idade:</label>
                    <input type="number" id="Idade" name="Idade" required>
                </div>
                <div>
                    <label for="Sexo">Sexo:</label>
                    <select id="Sexo" name="Sexo">
                        <option>Masculino</option>
                        <option>Feminino</option>
                        <option>Não binário</option>
                    </select>
                </div>
                <div>
                    <label for="convenio">Convênio:</label>
                    <input type="text" id="convenio" name="convenio">
                </div>

                <label for="Endereco">Endereço:</label>
                <div class="address-grid">
                    <input type="text" id="Endereco" name="Endereco" placeholder="Rua" required>
                    <input type="text" id="Numero" name="Numero" placeholder="Número" required>
                </div>

                <div class="complement-grid">
                    <input type="text" id="Complemento" name="Complemento" placeholder="Complemento">
                    <input type="text" id="Bairro" name="Bairro" placeholder="Bairro" required>
                    <input type="text" id="CEP" name="CEP" placeholder="Cep" onkeyup="mCEP(event)" maxlength="8" required>
                </div>

                <div class="three-column">
                    <div>
                        <label for="Cidade">Cidade:</label>
                        <input type="text" id="Cidade" name="Cidade"  required>
                    </div>
                    <div>
                        <label for="Estado">Estado:</label>
                        <input type="text" id="Estado" name="Estado" required>
                    </div>
                    <div>
                        <label for="Celular">Celular:</label>
                        <input type="tel" id="Celular" name="Celular" placeholder="(99)99999-9999" onkeyup="mTel(event)" maxlength="14" required>
                    </div>
                </div>

                <div class="button-container">
                    <button type="submit">Cadastrar</button>
                    <button type="reset">Limpar</button>
                </div>
            </form>
        </div>

        <div class="patient-list">
            <h2>Pacientes Cadastrados</h2>
            <ul>
                ${listaPaciente || '<li>Nenhum paciente cadastrado.</li>'}
            </ul>
        </div>

        <script>
            // Função para formatar o celular
            function mTel(event) {
                var tel = event.target.value;
                // Remove todos os caracteres não numéricos
                tel = tel.replace(/\D/g, "");
                // Aplica a máscara para o celular (formato (99)99999-9999 ou (99)9999-9999)
                if (tel.length <= 10) {
                    tel = tel.replace(/^(\d{2})(\d)/, "($1)$2");  // Formata o DDD (99)
                    tel = tel.replace(/(\d{5})(\d)/, "$1-$2");    // Formata o número (99999-9999)
                } else {
                    tel = tel.replace(/^(\d{2})(\d)/, "($1)$2");  // Formata o DDD (99)
                    tel = tel.replace(/(\d{5})(\d)/, "$1-$2");    // Formata o número (99999-9999)
                }
                // Atualiza o valor do campo com a formatação
                event.target.value = tel;
            }

            // Função para formatar o Cep
            function mCEP (event) {
                var cep = event.target.value;
                cep = cep.replace(/\D/g, "")
                cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
                cep = cep.replace(/.(\d{3})(\d)/, ".$1-$2")
                event.target.value = cep;
            }
        </script>
    </body>
    </html>`);
});

app.post('/submit', (req, res) => {
    const { nome, Idade, Sexo, convenio, Endereco, Numero, Complemento, Bairro, CEP, Cidade, Estado, Celular } = req.body;

    // Validar os campos
    if (!nome || !Idade || !Sexo || !Endereco || !Numero || !Bairro || !CEP || !Cidade || !Estado || !Celular) {
        return res.send('<h2>Todos os campos são obrigatórios!</h2>');
    }

    // Adicionar o paciente à lista
    paciente.push({ nome, Idade, Sexo, convenio, Endereco, Numero, Complemento, Bairro, CEP, Cidade, Estado, Celular });

    // Redirecionar para a página inicial
    res.redirect('/');
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
