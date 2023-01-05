import { Request, Response } from "express";
import httpStatus from "http-status";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";
import { IController } from "./IController";

interface RenameGeniallyRequest extends Request {
  body: {
    name: string;
  };
  params: {
    id: string;
  };
}

export class GeniallysRenameController implements IController {
  constructor(private readonly renameGeniallyService: RenameGeniallyService) {}

  async run(req: RenameGeniallyRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await this.renameGeniallyService.execute({ id, name });

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
