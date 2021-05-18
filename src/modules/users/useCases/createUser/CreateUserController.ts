import { Response, Request } from "express";
import { User } from "modules/users/model/User";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response<User> {
    const { name, email } = request.body;

    const user = this.createUserUseCase.execute({ name, email });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
