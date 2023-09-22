import HttpError from "./HttpError";

class Api404Error extends HttpError {
  constructor(message: string) {
    super(404, message);
    this.name = "Api404Error";
  }
}

export default Api404Error;
