const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// This fn we will able to use in signIn and LogIn (TO GENERATE THE JWT FOR US) fn down
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

/**
  fn takes _id as arguement which is part of payload
  and used sign method on jwt which has three arguement
   1) object (kind of payload on token) which has diff properties nd value but nothing put sensitive here
   2) SECRET string only known to server (put in env file)
   3) options - right now we only use expiresIn
   4) return it also
 */

// sign up
const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // creating jwt after user created
    const token = createToken(user._id);

    res.status(200).json({ email, token }); // in response we send user's email jis s signup kr rha tha and user object {which is new document of email and password}
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login
const logIn = async (req, res) => {
  // grab mail & password
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  logIn,
};
