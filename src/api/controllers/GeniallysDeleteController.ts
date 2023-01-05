import { Request, Response } from "express";
import httpStatus from "http-status";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import { IController } from "./IController";

interface DeleteGeniallyRequest extends Request {
  params: {
    id: string;
  };
}

export class GeniallysDeleteController implements IController {
  constructor(private readonly deleteGeniallyService: DeleteGeniallyService) {}

  async run(req: DeleteGeniallyRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteGeniallyService.execute({ id });

      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof GeniallyNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
