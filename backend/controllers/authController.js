const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email já cadastrado" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Cria o usuário com plano "withoutplan" e trial nulo
    const user = new User({
      name,
      email,
      passwordHash,
      plan: "withoutplan",
      trialExpiresAt: null,
    });

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
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Erro de configuração do servidor" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email ou senha inválidos" });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Email ou senha inválidos" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        trialExpiresAt: user.trialExpiresAt,
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};
