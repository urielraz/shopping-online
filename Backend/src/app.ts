import express from "express";
import cors from "cors";
import appConfig from "./2-utils/AppConfig";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import dataController from "./6-controllers/data-controller";
import sanitaize from "./3-middleware/sanitize";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import expressFileUpload from "express-fileupload"



const server = express();

server.use(express.static('static'))

server.use(expressRateLimit({
    max: 10, // maximum calls
    windowMs: 1000, // per time
    message: 'Are You an Hacker?' // msg to send
}))

server.use(cors({ origin: 'http://localhost:4200' } ))

server.use(helmet())

server.use(express.json());

server.use(expressFileUpload())

server.use(sanitaize)


server.use("/api", authController);
server.use("/api", dataController);
server.use("*", routeNotFound);
server.use(catchAll);


server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));


