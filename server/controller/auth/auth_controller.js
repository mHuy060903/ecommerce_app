import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message:
          "User Already exits with the same email! Please change your email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashPassword });
    res
      .status(200)
      .json({ success: true, message: "Registration successfull" });
    await newUser.save();
  } catch (error) {
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.userName
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.userName
      },
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully!" });
};

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};
