import express, { application, request, response }  from "express";
import SwaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json"
import { router } from "./routes";
const app = express();

app.use(express.json());

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

app.use(router)

app.listen(3333, () => console.log("Server is running"));
