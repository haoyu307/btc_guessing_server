import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne({
      where: { username: request.params.username },
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async updateScore(request: Request, response: Response, next: NextFunction) {
    const reqBody = request.body as User;
    const username = reqBody.username;
    delete reqBody.username;
    if (username) {
      const user = await this.userRepository.findOneBy({ username });
      if (user) {
        this.userRepository.merge(user, request.body);
        return this.userRepository.save(user);
      }
      return response.status(409).json({ message: "user not found" });
    }
    return response.status(400).json({ username: "this field is required" });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    });
    await this.userRepository.remove(userToRemove);
  }
}
