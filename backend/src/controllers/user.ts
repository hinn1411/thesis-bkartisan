import { Request, Response } from "express";
import UserModel, { User } from "../models/user.model.js";
import { hashPassword } from "../utils/helpers.js";

export const postRegister = async (request: Request, response: Response) => {
  const { username, email } = request.body;
  const userDB = await UserModel.findOne(username);
  if (userDB) {
    response.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(request.body.password);
    const newUser : User = {
      username,
      password,
      email,
      loginType: 'normal',
      status: 'N'
    }

    const result = await UserModel.create(newUser);
    if (result) {
      response.status(201).send({msg: "Created new account"});
    }
    else {
      response.status(500).send({msg: "Cannot create new account!"});
    }
  }
};
