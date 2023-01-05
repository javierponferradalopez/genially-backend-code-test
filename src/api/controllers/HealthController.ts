import { Request, Response } from "express";
import { IController } from "./IController";

export class HealthController implements IController {
  async run(req: Request, res: Response): Promise<void> {
    res.status(200).send({ status: "ok" });
  }
}
