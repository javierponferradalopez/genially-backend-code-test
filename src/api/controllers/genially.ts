import { Request, Response } from "express";
import httpStatus from "http-status";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";

interface CreateGeniallyRequest extends Request {
  body: {
    id: string;
    name: string;
    description?: string;
  };
}

export const createGenially = async (
  req: CreateGeniallyRequest,
  res: Response,
) => {
  const createGeniallyService = new CreateGeniallyService(
    new InMemoryGeniallyRepository(),
  );

  try {
    const { id, name, description } = req.body;
    await createGeniallyService.execute({ id, name, description });

    res.status(httpStatus.CREATED).send();
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

interface DeleteGeniallyRequest extends Request {
  params: {
    id: string;
  };
}

export const deleteGenially = async (
  req: DeleteGeniallyRequest,
  res: Response,
) => {
  const deleteGeniallyService = new DeleteGeniallyService(
    new InMemoryGeniallyRepository(),
  );

  try {
    const { id } = req.params;
    await deleteGeniallyService.execute({ id });

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    if (error instanceof GeniallyNotExist) {
      res.status(httpStatus.NOT_FOUND).send();
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
};

interface RenameGeniallyRequest extends Request {
  body: {
    name: string;
  };
  params: {
    id: string;
  };
}

export const renameGenially = async (
  req: RenameGeniallyRequest,
  res: Response,
) => {
  const renameGeniallyService = new RenameGeniallyService(
    new InMemoryGeniallyRepository(),
  );

  try {
    const { id } = req.params;
    const { name } = req.body;

    await renameGeniallyService.execute({ id, name });

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    if (error instanceof GeniallyNotExist) {
      res.status(httpStatus.NOT_FOUND).send();
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
};
