import User from "../models/User.js";
import { hashPassword } from "../utils/helpers.js";

export const postRegister = async (request, response, next) => {
  const { username, email } = request.body;
  const userDB = await User.findOne({ username });
  if (userDB) {
    response.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(request.body.password);
    const newUser = await User.create({ username, password, email });
    response.send(201);
  }
};
