import { Request, Response } from "express";

/**
 * Contract describing the minimum requirements for an controller by express.
 *
 * @interface
 */
export interface IController {
  run(req: Request<unknown>, res: Response): Promise<void>;
}
