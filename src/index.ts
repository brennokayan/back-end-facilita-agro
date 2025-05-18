import fastify from "fastify";
import { Routes } from "./routes";
import { Documentacao } from "./documentacao";

const app = fastify({});
app.register(require("@fastify/cors"), {
  origin: "*",
});

app.get("/teste-route", async (request, reply) => {
    reply.send({message: "Hello World!", status: "success"});
})

app.register(Documentacao)
  
  


app.register(Routes)

app.listen({
  port: 3000,
  host: "0.0.0.0",
}).then(() => {
    console.log("Server is running on http://localhost:3000");
})
.catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
});
