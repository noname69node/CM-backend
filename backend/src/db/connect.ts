import mongoose from "mongoose";

class DB {
  private static instance: DB | null = null;
  private db: mongoose.Mongoose | undefined;
  private server: string;
  private port: string;
  private dbName: string;

  constructor(server: string, port: string, dbName: string) {
    this.server = server;
    this.port = port;
    this.dbName = dbName;
  }

  public static getInstance(server: string, port: string, dbName: string): DB {
    if (!DB.instance) {
      DB.instance = new DB(server, port, dbName);
    }
    return DB.instance;
  }

  public async connect() {
    const uri = `mongodb://${this.server}:${this.port}/${this.dbName}`; // Remember we are in docker, so use service name of mongo
    console.log(uri);
    try {
      this.db = await mongoose.connect(uri);
      console.log("Connected to DB");
    } catch (error) {
      console.log(error);
    }
  }

  public getConnection() {
    return this.db;
  }
}

export default DB;
