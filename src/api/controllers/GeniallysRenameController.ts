import { Request, Response } from "express";
import httpStatus from "http-status";
import EntityNotExist from "../../contexts/shared/domain/EntityNotExist";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import { IController } from "./IController";

export interface GeniallysRenameRequestBody {
  name: string;
}

interface RenameGeniallyRequest extends Request {
  body: GeniallysRenameRequestBody;
  params: {
    id: string;
  };
}

export class GeniallysRenameController implements IController {
  constructor(private readonly _renameGeniallyService: RenameGeniallyService) {}

  async run(req: RenameGeniallyRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await this._renameGeniallyService.execute({ id, name });

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
