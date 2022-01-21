import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'haha';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User Tidak Ditemukan" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Maaf terdapat kesalahan, Mohon Ulangi Kembali" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User sudah ada" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret);

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Maaf terdapat kesalahan" });
    
    console.log(error);
  }
};

export const semua = async (req, res) => { 
  try {
      const postMessages = await UserModal.find();
              
      res.status(200).json(postMessages);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}
