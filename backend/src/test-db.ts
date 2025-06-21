import "./loadEnv"; 
import prisma from "./prisma";

async function test() {
  try {
    const users = await prisma.user.findMany();
    console.log("Conexão OK, usuários:", users);
  } catch (error) {
    console.error("Erro ao conectar:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
