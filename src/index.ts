import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as WebSocket from "ws";
import "./config";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
const cors = require("cors");

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes("/api").forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    const server = http.createServer(app);

    // initialize the WebSocket server instance
    // const wss = new WebSocket.Server({ server });

    // wss.on("connection", (ws: WebSocket) => {
    //   ws.on("message", (message: string) => {
    //     ws.send(`Hello, you sent -> ${message}`);
    //   });
    // });

    // start our server
    server.listen(process.env.PORT || 8080, () => {
      const addressInfo = server.address() as WebSocket.AddressInfo;
      console.log(`Server started on port ${addressInfo.port} :)`);
    });

    console.log(
      `Express server has started on port ${
        process.env.PORT || 8080
      }. Open http://localhost:${process.env.PORT || 8080}/users to see results`
    );
  })
  .catch((error) => console.log(error));
