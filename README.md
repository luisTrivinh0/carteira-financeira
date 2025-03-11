💰 Carteira Financeira
Este projeto é uma carteira financeira simples que permite aos usuários se cadastrarem, autenticarem e realizarem transferências entre contas. O sistema inclui consulta de saldo e extrato de transações.

🚀 Tecnologias Utilizadas
Backend: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT para autenticação.
Frontend: React.js, TypeScript, Material UI, React Router.
Extras: React Toastify para notificações, Axios para requisições HTTP.

📂 Estrutura do Projeto
O projeto está organizado da seguinte forma:

A raiz contém o backend do projeto, implementado com Node.js e TypeScript.
A pasta frontend contém a aplicação React, desenvolvida com TypeScript e Material UI.
🛠️ Como Rodar o Projeto Sem Docker
📌 1. Configurar o Banco de Dados PostgreSQL
Instale o PostgreSQL caso ainda não tenha.

No Windows, baixe pelo site oficial do PostgreSQL.
No Linux (Ubuntu), instale com o comando: sudo apt install postgresql.
No Mac, instale via Homebrew com brew install postgresql.

Após instalar, crie um banco de dados chamado carteira_db.

Se estiver utilizando o terminal do PostgreSQL, execute o comando: CREATE DATABASE carteira_db;

Anote as credenciais do PostgreSQL, incluindo usuário, senha, host e porta.

📌 2. Configurar o Backend
Acesse o diretório raiz do projeto.

Instale as dependências com o comando: npm install.

Crie um arquivo chamado .env na raiz do projeto e adicione a configuração do banco de dados e JWT:

DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/carteira_db
JWT_SECRET=seu_segredo

Execute as migrações do banco de dados: npx prisma migrate dev --name init.

Inicie o backend com o comando: npm run dev.

O backend estará rodando em http://localhost:3000.

📌 3. Configurar o Frontend
Acesse a pasta frontend.

Instale as dependências com o comando: npm install.

Inicie o frontend com o comando: npm start.

O frontend estará disponível em http://localhost:3001.

🔄 Fluxo de Uso
Criar uma conta na tela de registro.
Fazer login para acessar a carteira.
Visualizar saldo e extrato de transações.
Realizar transferências para outros usuários.
⚠️ Situação do Docker
A configuração do Docker ainda não foi testada e pode não estar funcional. O arquivo docker-compose.yml está configurado, mas requer ajustes. Se for utilizar o Docker, siga os passos básicos:

Certifique-se de que o Docker está instalado e rodando no seu sistema.
Execute o comando docker-compose up --build na raiz do projeto.
Caso encontre problemas, ajuste as configurações do banco de dados e permissões.

📌 Próximos Passos
Implementar testes unitários e de integração.
Melhorar o tratamento de erros.
Melhorar a interface do usuário com feedback visual.
Ajustar e testar Docker.
Adicionar logging e monitoramento.
🤝 Contribuição
Se quiser contribuir, fique à vontade para abrir um PR ou relatar problemas na aplicação!

📜 Licença
Este projeto é open-source e pode ser usado livremente.