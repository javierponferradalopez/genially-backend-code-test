import express from "express";
import createGenially from "./create.router";
import deleteGenially from "./delete.router";
import renameGenially from "./rename.router";

const router = express.Router();

createGenially(router);
renameGenially(router);
deleteGenially(router);

export default router;
