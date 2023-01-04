import { json as jsonParse, urlencoded } from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";
import homeRoutes from "./routes/home";
import geniallyRoutes from "./routes/genially";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(jsonParse());
app.use(urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use("/", homeRoutes);
app.use("/api/genially", geniallyRoutes);

export default app;
