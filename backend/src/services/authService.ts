import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { sign, SignOptions } from "jsonwebtoken";
import validator from "validator";
import prisma from "../prisma";

const JWT_SECRET: string =
  process.env.JWT_SECRET || "umasecretamuitosegura123!";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    if (
      !name ||
      !email ||
      !password ||
      !validator.isEmail(email) ||
      password.length < 6
    ) {
      throw new Error("Dados inválidos");
    }

    const exists = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (exists) {
      throw new Error("Email já cadastrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        name: name.trim(),
        email: email.toLowerCase(),
        passwordHash,
      },
      select: { id: true, name: true, email: true },
    });

    return user;
  }

  static async login(email: string, password: string) {
    if (!email || !password || !validator.isEmail(email)) {
      throw new Error("Email e senha obrigatórios e válidos");
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error("Credenciais inválidas");
    }

    const token = sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as SignOptions);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  static async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
  }
}
