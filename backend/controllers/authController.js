const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Criar conta
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email já cadastrado" });

    // Faz hash da senha
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Cria e salva o usuário
    const user = new User({ name, email, passwordHash });
    await user.save();

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    console.error("Erro no register:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    // Pega a variável JWT_SECRET dentro da função para garantir que dotenv já foi carregado
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET não está definido no .env");
      return res
        .status(500)
        .json({ message: "Erro de configuração no servidor" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email ou senha inválidos" });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Email ou senha inválidos" });

    // Cria o token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
