-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PRODUTOR', 'CONSUMIDOR');

-- CreateEnum
CREATE TYPE "unitType" AS ENUM ('UNIDADE', 'KG', 'LITRO', 'PACOTE', 'CAIXA', 'BOLSA', 'PCT', 'GRAMA', 'METRO');

-- CreateEnum
CREATE TYPE "categoriesType" AS ENUM ('FRUTAS', 'VERDURAS', 'LEGUMES', 'CARNES', 'LATICINIOS', 'PESCADOS', 'EMBUTIDOS', 'CONGELADOS', 'ENLATADOS', 'GRÃOS', 'TEMPEROS', 'CONDIMENTOS');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARTAO_CREDITO', 'CARTAO_DEBITO', 'DINHEIRO', 'PIX', 'BOLETO');

-- CreateEnum
CREATE TYPE "tipoPedido" AS ENUM ('VENDA', 'COMPRA');

-- CreateEnum
CREATE TYPE "PedidoStatus" AS ENUM ('PENDENTE', 'CONFIRMADO', 'ENVIADO', 'ENTREGUE', 'CANCELADO');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDENTE', 'APROVADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN,
    "image" TEXT,
    "type" "UserType",
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "age" INTEGER,
    "nota" INTEGER,
    "isAnalfabete" BOOLEAN DEFAULT false,
    "isDelivery" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "datePayment" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "image" TEXT,
    "unit" "unitType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "categorie" "categoriesType",
    "isActive" BOOLEAN DEFAULT true,
    "isDeleted" BOOLEAN DEFAULT false,
    "isOrganic" BOOLEAN DEFAULT false,
    "isPromo" BOOLEAN DEFAULT false,
    "isDestaque" BOOLEAN DEFAULT false,
    "isFreteGratuito" BOOLEAN DEFAULT false,
    "isNovo" BOOLEAN DEFAULT false,
    "isMaisVendido" BOOLEAN DEFAULT false,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "PedidoStatus" DEFAULT 'PENDENTE',
    "total" DOUBLE PRECISION,
    "type" "tipoPedido" NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" DEFAULT 'PENDENTE',

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoItem" (
    "id" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PedidoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItem" ADD CONSTRAINT "PedidoItem_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItem" ADD CONSTRAINT "PedidoItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
