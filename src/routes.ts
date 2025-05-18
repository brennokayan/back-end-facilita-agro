import { FastifyInstance } from "fastify";
import { prisma } from "./prisma";

type unidade =
  | "UNIDADE"
  | "KG"
  | "LITRO"
  | "PACOTE"
  | "CAIXA"
  | "BOLSA"
  | "PCT"
  | "GRAMA"
  | "METRO";
type categoria =
  | "FRUTAS"
  | "VERDURAS"
  | "LEGUMES"
  | "CARNES"
  | "LATICINIOS"
  | "PESCADOS"
  | "EMBUTIDOS"
  | "CONGELADOS"
  | "ENLATADOS"
  | "GRÃOS"
  | "TEMPEROS"
  | "CONDIMENTOS";

export async function Routes(app: FastifyInstance) {
  //Get all users
  app.get("/user", async (req, rep) => {
    const getUser = await prisma.user.findMany({});
    return rep.status(200).send({
      message: "Users fetched successfully",
      status: "success",
      data: getUser,
    });
  });

  // Get unique user by email
  app.get("/user/:email", async (req, rep) => {
    const { email } = req.params as { email: string };

    const getUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!getUser) {
      return rep.status(404).send({
        message: "User not found",
        status: "error",
      });
    }
    return rep.status(200).send({
      message: "User fetched successfully",
      status: "success",
      data: getUser,
    });
  });

  //Login
  app.post("/login", async (req, rep) => {
    const { email, password } = req.body as { email: string; password: string };
    const getAuthEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (getAuthEmail?.email === email && getAuthEmail?.password === password) {
      return rep.status(200).send({
        message: "User logged in successfully",
        status: "success",
        data: getAuthEmail,
      });
    }
    return rep.status(401).send({
      message: "Invalid email or password",
      status: "error",
    });
  });

  //Create user
  app.post("/user", async (req, rep) => {
    const { name, email, password, phone, age, birthDate, type } = req.body as {
      name: string;
      email: string;
      password: string;
      phone: string;
      age: number;
      birthDate: string;
      type: "PRODUTOR" | "CONSUMIDOR";

    };
    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        address: "rua teste",
        city: "Tangará da Serra",
        state: "MT",
        country: "Brasil",
        phone: phone,
        age: age,
        birthDate: new Date(birthDate),
        emailVerified: true,
        type
      },
    });
    return rep.status(201).send({
      message: "User created successfully",
      status: "success",
      data: createUser,
    });
  });

  // create Produto
  app.post("/produto", async (req, rep) => {
    const {
      name,
      description,
      price,
      categorie,
      image,
      isFreteGratuito,
      isOrganic,
      unit,
      userId,
    } = req.body as {
      name: string;
      description: string;
      price: number;
      categorie: categoria;
      image: string;
      isFreteGratuito: boolean;
      isOrganic: boolean;
      unit: unidade;
      userId: string;
    };
    const createProduto = await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        categorie,
        image,
        isFreteGratuito,
        isOrganic,
        unit,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return rep.status(201).send({
      message: "Produto created successfully",
      status: "success",
      data: createProduto,
    });
  });

  // Get all produtos by userId
  app.get("/produto/:userId", async (req, rep) => {
    const { userId } = req.params as { userId: string };
    const getProduto = await prisma.product.findMany({
      where: {
        userId: userId,
      },
    });
    return rep.status(200).send({
      message: "Produtos fetched successfully",
      status: "success",
      data: getProduto,
    });
  });

  //Post pedido
  app.post("/pedido", async (req, rep) => {
    const { userId, address, city, country, paymentMethod, state, type } =
      req.body as {
        userId: string;
        address: string;
        city: string;
        state: string;
        country: string;
        paymentMethod: "CARTAO_CREDITO" | "CARTAO_DEBITO" | "DINHEIRO" | "PIX" | "BOLETO";
        type: "COMPRA" | "VENDA";
      };
    const createPedido = await prisma.pedido.create({
      data: {
        address,
        city,
        state,
        country,
        paymentMethod,
        total: 0,
        type,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return rep.status(201).send({
      message: "Pedido created successfully",
      status: "success",
      data: createPedido,
    });
  });

  app.post("/pedido-item", async (req, rep) => {
    const { pedidoId, productId, quantity, unitPrice } = req.body as {
      pedidoId: string;
      productId: string;
      quantity: number;
      unitPrice: number;
    };
    const createPedidoItem = await prisma.pedidoItem.create({
      data: {
        quantity,
        unitPrice,
        pedido: {
          connect: {
            id: pedidoId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
    return rep.status(201).send({
      message: "Pedido item created successfully",
      status: "success",
      data: createPedidoItem,
    });
  });

  //get all pedidos de item
  app.get("/pedido-item", async (req, rep) => {
    const getPedidoItem = await prisma.pedidoItem.findMany({
      include: {
        pedido: true,
        product: true,
      },
    });
    return rep.status(200).send({
      message: "Pedido item fetched successfully",
      status: "success",
      data: getPedidoItem,
    });
  });

  //get all pedidos
  app.get("/pedido", async (req, rep) => {
    const getPedido = await prisma.pedido.findMany({
        include: {
            user: true,
            items: {
                include: {
                    product: true,
                }
            }
        },
    });
    return rep.status(200).send({
      message: "Pedido fetched successfully",
      status: "success",
      data: getPedido,
    });
  });

  //get pedido by user
  app.get("/pedido/user/:userId", async (req, rep) => {
    const { userId } = req.params as { userId: string };
    const getPedido = await prisma.pedido.findMany({
      where: {
        userId: userId,
      },
        include: {
            user: true,
            items: {
            include: {
                product: true,
            },
            },
        },
    });
    return rep.status(200).send({
      message: "Pedido fetched successfully",
      status: "success",
      data: getPedido,
    });
  });

  //get pedido by type
  app.get("/pedido/type/:type", async (req, rep) => {
    const { type } = req.params as { type: "COMPRA" | "VENDA" };
    if (type !== "COMPRA" && type !== "VENDA") {
      return rep.status(400).send({
        message: "Invalid type",
        status: "error",
      });
    }
    const getPedido = await prisma.pedido.findMany({
      where: {
        type,
      },
        include: {
            user: true,
            items: {
            include: {
                product: true,
            },
            },
        },
    });
    return rep.status(200).send({
      message: "Pedido fetched successfully",
      status: "success",
      data: getPedido,
    });
  });

  //get pedido by id
  app.get("/pedido/:id", async (req, rep) => {
    const { id } = req.params as { id: string };
    const pedido = await prisma.pedido.findUnique({
      where: { id },
      include: { user: true, items: { include: { product: true } } }
    });
    if (!pedido) return rep.code(404).send({ status:"error", message:"Not found" });
    return rep.code(200).send({ status:"success", data: pedido });
  });
}
