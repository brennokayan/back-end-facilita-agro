import { FastifyInstance } from "fastify";

export async function Documentacao(app: FastifyInstance) {
  app.get("/api/documentacao", async (_req, rep) => {
    rep.header("Content-Type", "text/html; charset=utf-8");
    return rep.send(`<!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>API - Facilita Agro (Docs)</title>
        <style>
          body { font-family: sans-serif; margin:0; padding:0; }
          header { background:#2c3e50; color:white; padding:1rem; text-align:center; }
          nav { background:#f4f4f4; padding:1rem; }
          nav a { margin-right:1rem; color:#2c3e50; text-decoration:none; }
          section { padding:1rem 2rem; border-bottom:1px solid #eee; }
          h2 { color:#2c3e50; margin-top:2rem; }
          pre { background:#f0f0f0; padding:0.5rem; overflow-x:auto; }
          code { font-family: monospace; }
        </style>
      </head>
      <body>
      
      <header>
        <h1>Documentação da API - Facilita Agro</h1>
        <p>Veja descrições, parâmetros e exemplos de uso de cada endpoint.</p>
      </header>
      
      <nav>
        <a href="#users">Usuários</a>
        <a href="#login">Login</a>
        <a href="#products">Produtos</a>
        <a href="#orders">Pedidos</a>
      </nav>
      
      <section id="users">
        <h2>Usuários</h2>
      
        <h3>GET /user</h3>
        <p>Retorna todos os usuários.</p>
      
        <h3>GET /user/:email</h3>
        <p>Retorna o usuário cujo <code>email</code> foi informado na URL.</p>
        <pre><code>curl -X GET "{{base_url}}/user/joao@exemplo.com"</code></pre>
      
        <h3>POST /user</h3>
        <p>Cria um novo usuário.</p>
        <pre><code>{
        "name": "João Silva",
        "email": "joao@exemplo.com",
        "password": "senha123",
        "phone": "65999991234",
        "age": 45,
        "birthDate": "1979-03-15",
        "type": "PRODUTOR"
      }</code></pre>
      </section>
      
      <section id="login">
        <h2>Autenticação</h2>
      
        <h3>POST /login</h3>
        <p>Valida credenciais e retorna dados do usuário.</p>
        <pre><code>{
        "email": "joao@exemplo.com",
        "password": "senha123"
      }</code></pre>
      </section>
      
      <section id="products">
        <h2>Produtos</h2>
      
        <h3>POST /produto</h3>
        <p>Cria um novo produto vinculado a um usuário.</p>
        <pre><code>{
        "name": "Tomate Orgânico",
        "description": "Sem agrotóxicos",
        "price": 5.5,
        "categorie": "VERDURAS",
        "image": "https://ex.com/img.jpg",
        "isFreteGratuito": true,
        "isOrganic": true,
        "unit": "KG",
        "userId": "cuid-do-usuario"
      }</code></pre>
      
        <h3>GET /produto/:userId</h3>
        <p>Lista todos os produtos do usuário cujo <code>userId</code> foi informado.</p>
        <pre><code>curl -X GET "{{base_url}}/produto/cuid-do-usuario"</code></pre>
      </section>
      
      <section id="orders">
        <h2>Pedidos</h2>
      
        <h3>POST /pedido</h3>
        <p>Cria um novo pedido.</p>
        <pre><code>{
        "userId": "cuid-do-usuario",
        "address": "Rua A, 123",
        "city": "Tangará da Serra",
        "state": "MT",
        "country": "Brasil",
        "paymentMethod": "PIX",
        "total": 42.75,
        "type": "VENDA"
      }</code></pre>
      
        <h3>POST /pedido-item</h3>
        <p>Adiciona um item a um pedido existente.</p>
        <pre><code>{
        "pedidoId": "cuid-do-pedido",
        "productId": "cuid-do-produto",
        "quantity": 3,
        "unitPrice": 5.5
      }</code></pre>
      
        <h3>GET /pedido-item</h3>
        <p>Lista todos os itens de todos os pedidos.</p>
      
        <h3>GET /pedido</h3>
        <p>Lista todos os pedidos com usuário e itens.</p>
      
        <h3>GET /pedido/user/:userId</h3>
        <p>Lista todos os pedidos feitos pelo usuário informado.</p>
      
        <h3>GET /pedido/type/:type</h3>
        <p>Lista pedidos filtrados por tipo: <code>COMPRA</code> ou <code>VENDA</code>.</p>
      
        <h3>GET /pedido/:id</h3>
        <p>Retorna detalhes de um pedido específico.</p>
      </section>
      

      <section id="footer" style="text-align:center; margin-top:2rem;">
        <p>API desenvolvida com 💜 por <a href="https://github.com/brennokayan" target="_blank" style="text-decoration:none; color:#000">Brenno Kayan</a> </p>
        <p>Facilita Agro - Todos os direitos reservados</p>
        <p id="Ano"></p>

        <script>
          const ano = new Date().getFullYear();
          document.getElementById("Ano").innerHTML = "© " + ano + " Facilita Agro";
        </script>
      </section>
      </body>
      </html>`);
  });
}
