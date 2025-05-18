"use strict";var T=Object.create;var l=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,w=Object.prototype.hasOwnProperty;var R=(o,s,e,t)=>{if(s&&typeof s=="object"||typeof s=="function")for(let r of A(s))!w.call(o,r)&&r!==e&&l(o,r,{get:()=>s[r],enumerable:!(t=O(s,r))||t.enumerable});return o};var D=(o,s,e)=>(e=o!=null?T(E(o)):{},R(s||!o||!o.__esModule?l(e,"default",{value:o,enumerable:!0}):e,o));var f=D(require("fastify"));var g=require("@prisma/client"),a=new g.PrismaClient({log:["query","info","warn","error"]});async function h(o){o.get("/user",async(s,e)=>{let t=await a.user.findMany({});return e.status(200).send({message:"Users fetched successfully",status:"success",data:t})}),o.get("/user/:email",async(s,e)=>{let{email:t}=s.params,r=await a.user.findUnique({where:{email:t}});return r?e.status(200).send({message:"User fetched successfully",status:"success",data:r}):e.status(404).send({message:"User not found",status:"error"})}),o.post("/login",async(s,e)=>{let{email:t,password:r}=s.body,d=await a.user.findUnique({where:{email:t}});return d?.email===t&&d?.password===r?e.status(200).send({message:"User logged in successfully",status:"success",data:d}):e.status(401).send({message:"Invalid email or password",status:"error"})}),o.post("/user",async(s,e)=>{let{name:t,email:r,password:d,phone:i,age:n,birthDate:c,type:u}=s.body,p=await a.user.create({data:{name:t,email:r,password:d,address:"rua teste",city:"Tangar\xE1 da Serra",state:"MT",country:"Brasil",phone:i,age:n,birthDate:new Date(c),emailVerified:!0,type:u}});return e.status(201).send({message:"User created successfully",status:"success",data:p})}),o.post("/produto",async(s,e)=>{let{name:t,description:r,price:d,categorie:i,image:n,isFreteGratuito:c,isOrganic:u,unit:p,userId:I}=s.body,P=await a.product.create({data:{name:t,description:r,price:d,categorie:i,image:n,isFreteGratuito:c,isOrganic:u,unit:p,user:{connect:{id:I}}}});return e.status(201).send({message:"Produto created successfully",status:"success",data:P})}),o.get("/produto/:userId",async(s,e)=>{let{userId:t}=s.params,r=await a.product.findMany({where:{userId:t}});return e.status(200).send({message:"Produtos fetched successfully",status:"success",data:r})}),o.post("/pedido",async(s,e)=>{let{userId:t,address:r,city:d,country:i,paymentMethod:n,state:c,type:u}=s.body,p=await a.pedido.create({data:{address:r,city:d,state:c,country:i,paymentMethod:n,total:0,type:u,user:{connect:{id:t}}}});return e.status(201).send({message:"Pedido created successfully",status:"success",data:p})}),o.post("/pedido-item",async(s,e)=>{let{pedidoId:t,productId:r,quantity:d,unitPrice:i}=s.body,n=await a.pedidoItem.create({data:{quantity:d,unitPrice:i,pedido:{connect:{id:t}},product:{connect:{id:r}}}});return e.status(201).send({message:"Pedido item created successfully",status:"success",data:n})}),o.get("/pedido-item",async(s,e)=>{let t=await a.pedidoItem.findMany({include:{pedido:!0,product:!0}});return e.status(200).send({message:"Pedido item fetched successfully",status:"success",data:t})}),o.get("/pedido",async(s,e)=>{let t=await a.pedido.findMany({include:{user:!0,items:{include:{product:!0}}}});return e.status(200).send({message:"Pedido fetched successfully",status:"success",data:t})}),o.get("/pedido/user/:userId",async(s,e)=>{let{userId:t}=s.params,r=await a.pedido.findMany({where:{userId:t},include:{user:!0,items:{include:{product:!0}}}});return e.status(200).send({message:"Pedido fetched successfully",status:"success",data:r})}),o.get("/pedido/type/:type",async(s,e)=>{let{type:t}=s.params;if(t!=="COMPRA"&&t!=="VENDA")return e.status(400).send({message:"Invalid type",status:"error"});let r=await a.pedido.findMany({where:{type:t},include:{user:!0,items:{include:{product:!0}}}});return e.status(200).send({message:"Pedido fetched successfully",status:"success",data:r})}),o.get("/pedido/:id",async(s,e)=>{let{id:t}=s.params,r=await a.pedido.findUnique({where:{id:t},include:{user:!0,items:{include:{product:!0}}}});return r?e.code(200).send({status:"success",data:r}):e.code(404).send({status:"error",message:"Not found"})})}async function y(o){o.get("/api/documentacao",async(s,e)=>(e.header("Content-Type","text/html; charset=utf-8"),e.send(`<!DOCTYPE html>
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
        <h1>Documenta\xE7\xE3o da API - Facilita Agro</h1>
        <p>Veja descri\xE7\xF5es, par\xE2metros e exemplos de uso de cada endpoint.</p>
      </header>
      
      <nav>
        <a href="#users">Usu\xE1rios</a>
        <a href="#login">Login</a>
        <a href="#products">Produtos</a>
        <a href="#orders">Pedidos</a>
      </nav>
      
      <section id="users">
        <h2>Usu\xE1rios</h2>
      
        <h3>GET /user</h3>
        <p>Retorna todos os usu\xE1rios.</p>
      
        <h3>GET /user/:email</h3>
        <p>Retorna o usu\xE1rio cujo <code>email</code> foi informado na URL.</p>
        <pre><code>curl -X GET "{{base_url}}/user/joao@exemplo.com"</code></pre>
      
        <h3>POST /user</h3>
        <p>Cria um novo usu\xE1rio.</p>
        <pre><code>{
        "name": "Jo\xE3o Silva",
        "email": "joao@exemplo.com",
        "password": "senha123",
        "phone": "65999991234",
        "age": 45,
        "birthDate": "1979-03-15",
        "type": "PRODUTOR"
      }</code></pre>
      </section>
      
      <section id="login">
        <h2>Autentica\xE7\xE3o</h2>
      
        <h3>POST /login</h3>
        <p>Valida credenciais e retorna dados do usu\xE1rio.</p>
        <pre><code>{
        "email": "joao@exemplo.com",
        "password": "senha123"
      }</code></pre>
      </section>
      
      <section id="products">
        <h2>Produtos</h2>
      
        <h3>POST /produto</h3>
        <p>Cria um novo produto vinculado a um usu\xE1rio.</p>
        <pre><code>{
        "name": "Tomate Org\xE2nico",
        "description": "Sem agrot\xF3xicos",
        "price": 5.5,
        "categorie": "VERDURAS",
        "image": "https://ex.com/img.jpg",
        "isFreteGratuito": true,
        "isOrganic": true,
        "unit": "KG",
        "userId": "cuid-do-usuario"
      }</code></pre>
      
        <h3>GET /produto/:userId</h3>
        <p>Lista todos os produtos do usu\xE1rio cujo <code>userId</code> foi informado.</p>
        <pre><code>curl -X GET "{{base_url}}/produto/cuid-do-usuario"</code></pre>
      </section>
      
      <section id="orders">
        <h2>Pedidos</h2>
      
        <h3>POST /pedido</h3>
        <p>Cria um novo pedido.</p>
        <pre><code>{
        "userId": "cuid-do-usuario",
        "address": "Rua A, 123",
        "city": "Tangar\xE1 da Serra",
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
        <p>Lista todos os pedidos com usu\xE1rio e itens.</p>
      
        <h3>GET /pedido/user/:userId</h3>
        <p>Lista todos os pedidos feitos pelo usu\xE1rio informado.</p>
      
        <h3>GET /pedido/type/:type</h3>
        <p>Lista pedidos filtrados por tipo: <code>COMPRA</code> ou <code>VENDA</code>.</p>
      
        <h3>GET /pedido/:id</h3>
        <p>Retorna detalhes de um pedido espec\xEDfico.</p>
      </section>
      

      <section id="footer" style="text-align:center; margin-top:2rem;">
        <p>API desenvolvida com \u{1F49C} por <a href="https://github.com/brennokayan" target="_blank" style="text-decoration:none; color:#000">Brenno Kayan</a> </p>
        <p>Facilita Agro - Todos os direitos reservados</p>
        <p id="Ano"></p>

        <script>
          const ano = new Date().getFullYear();
          document.getElementById("Ano").innerHTML = "\xA9 " + ano + " Facilita Agro";
        </script>
      </section>
      </body>
      </html>`)))}var m=(0,f.default)({});m.register(require("@fastify/cors"),{origin:"*"});m.get("/teste-route",async(o,s)=>{s.send({message:"Hello World!",status:"success"})});m.register(y);m.register(h);m.listen({port:process.env.PORT?Number(process.env.PORT):3e3,host:"0.0.0.0"}).then(()=>{console.log("Server is running on http://localhost:3000")}).catch(o=>{console.error("Error starting server:",o),process.exit(1)});
