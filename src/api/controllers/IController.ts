import { Request, Response } from "express";

/**
 * Contract describing the minimum requirements for an controller by express.
 *
 * @interface
 */
export interface IController {
  run(req: Request, res: Response): Promise<void>;
}
