import express, { Application } from "express";
import DB from "./db/connect";

import userRoutes from "./routes/UserRoutes";

import errorMiddleware from "./middlewares/error";

class App {
  public app: Application;

  private port: string | number;
  private db: any;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.initDBConnection();
    this.initMiddlewares();
    this.initPublicRoutes();
    this.initPrivateRoutes();
    this.initOtherRoutes();
    this.initErrorHandler();
  }

  private initDBConnection() {
    this.db = DB.getInstance("mongodb", "27017", "cm");
    this.db.connect();
  }

  private initMiddlewares() {
    this.app.use(express.json());
  }

  private initPublicRoutes() {
    console.log("Public routes initialization");
    this.app.get("/", (req, res, next) => {
      console.log("Welcome!!!");
      res.send("Welcome to API!!!");
    });
  }

  private initPrivateRoutes() {
    console.log("Private routes initialization");
    this.app.use("/users", userRoutes);
  }

  private initOtherRoutes() {
    console.log("Other routes initialization");
    this.app.all("*", (req, res, next) => {
      res.send("404");
      next();
    });
  }

  private initErrorHandler() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default App;
