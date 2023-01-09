import { Request, Response } from "express";
import httpStatus from "http-status";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import { IController } from "./IController";
import EntityNotExist from "../../contexts/shared/domain/EntityNotExist";

interface DeleteGeniallyRequest extends Request {
  params: {
    id: string;
  };
}

export class GeniallysDeleteController implements IController {
  constructor(private readonly _deleteGeniallyService: DeleteGeniallyService) {}

  async run(req: DeleteGeniallyRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this._deleteGeniallyService.execute({ id });

      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof EntityNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
