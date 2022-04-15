import UserModel from "../models/User";
import { Request, Response } from "express";
import { generateHash, validateHash } from "../services/hash";
import { createToken } from "../services/jwt";

export async function createUser(req: Request, res: Response) {
  try {
    let user = await UserModel.create(req.body);
    const hash = await generateHash(user.password!);
    user.password = hash;
    const userStored = await user.save();
    res.status(200).send({ user: userStored });
  } catch (error) {
    console.log("🚀 ~ file: users.ts ~ line 14 ~ createUser ~ error", error);
    return res.status(500).send({ message: error });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const params = req.body;
    let email = params.email;
    let password = params.password;
    let user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) {
      const validationHash = await validateHash(user.password!, password);
      if (validationHash) {
        const token = await createToken(user);
        res.status(200).send({ user: user, token: token });
      } else {
        res.status(500).send({
          message:
            "No se pudo iniciar sesión, usuario o contraseña incorrectos",
        });
      }
    } else {
      res.status(500).send({ message: "El usuario no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ file: users.ts ~ line 41 ~ login ~ error", error);
    return res.status(500).send({ message: error });
  }
}
