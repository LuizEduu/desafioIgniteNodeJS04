import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;
    const parsedId = String(user_id);
    const users = this.listAllUsersUseCase.execute({ user_id: parsedId });

    return response.json(users);
  }
}

export { ListAllUsersController };
