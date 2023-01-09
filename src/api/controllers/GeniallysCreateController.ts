import { Request, Response } from "express";
import httpStatus from "http-status";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import { IController } from "./IController";

interface CreateGeniallyRequest extends Request {
  body: {
    id: string;
    name: string;
    description?: string;
  };
}

export class GeniallysCreateController implements IController {
  constructor(private readonly _createGeniallyService: CreateGeniallyService) {}

  async run(req: CreateGeniallyRequest, res: Response): Promise<void> {
    try {
      const { id, name, description } = req.body;
      await this._createGeniallyService.execute({ id, name, description });

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
