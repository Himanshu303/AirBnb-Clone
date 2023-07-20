const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const getJwtToken = async (user) => {
  const token = await jwt.sign(
    { email: user.email, id: user._id, name: user.name },
    process.env.JWT_SECRET
  );

  return token;
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT))
      ),
    });

    const token = await getJwtToken(user);

    return res.cookie("token", token).json(user);
  } catch (error) {
    res.status(422).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("invalid credentials");
    }
    const passOk = await bcrypt.compareSync(password, user.password);
    if (!passOk) {
      return res.status(401).send("invalid credentials");
    }

    token = await getJwtToken(user);
    return res.cookie("token", token).json(user);
  } catch (err) {
    return res.status(422).send("Something went wrong");
  }
};

const profile = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json(null);
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports = {
  register,
  login,
  profile,
  logout,
};
