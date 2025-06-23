import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type User = Awaited<ReturnType<typeof prisma.user.findMany>>[number];

export class UserService {
  static async getUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  static async getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  static async createUser(
    name: unknown,
    email: unknown,
    password: unknown
  ): Promise<User> {
    if (
      !this.isValidName(name) ||
      !this.isValidEmail(email) ||
      !this.isValidPassword(password)
    ) {
      throw new Error("Nome, email e senha válidos são obrigatórios");
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    return await prisma.user.create({
      data: {
        id: uuidv4(),
        name: name.toString().trim(),
        email: email.toString().toLowerCase(),
        password: hashedPassword,
      },
    });
  }

  static async updateUser(
    id: string,
    name?: unknown,
    email?: unknown,
    password?: unknown
  ): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const data: Partial<User> = {};

    if (name !== undefined) {
      if (!this.isValidName(name)) {
        throw new Error("Nome inválido");
      }
      data.name = name.toString().trim();
    }

    if (email !== undefined) {
      if (!this.isValidEmail(email)) {
        throw new Error("Email inválido");
      }
      data.email = email.toString().toLowerCase();
    }

    if (password !== undefined) {
      if (!this.isValidPassword(password)) {
        throw new Error("Senha inválida");
      }
      const hashedPassword = await bcrypt.hash(password.toString(), 10);
      data.password = hashedPassword;
    }

    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  static async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await prisma.user.delete({
      where: { id },
    });
  }

  // 🔐 Validações internas
  private static isValidEmail(email: unknown): email is string {
    return typeof email === "string" && validator.isEmail(email);
  }

  private static isValidName(name: unknown): name is string {
    return typeof name === "string" && name.trim().length > 0;
  }

  private static isValidPassword(password: unknown): password is string {
    return typeof password === "string" && password.trim().length >= 6;
  }
}
