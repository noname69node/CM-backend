import express, { Application } from "express";
import DB from "./db/connect";

class App {
  public app: Application;

  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.initDBConnection();
    this.initMiddlewares();
    this.initRoutes();
  }

  private initDBConnection() {
    const db = DB.getInstance("mongodb", "27017", "cm");
    db.connect();
  }

  private initMiddlewares() {
    this.app.use(express.json());
  }

  private initRoutes() {
    this.app.get("/", (req, res, next) => {
      console.log("Welcome!!!");
      res.send("Welcome to API!!!");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default App;
