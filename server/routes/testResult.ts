import { Router } from "express";
import * as controllers from "../controllers/testResult";

const testResult: Router = Router();

testResult.route("/").get(controllers.readAll);
testResult.route("/create").post(controllers.add);

export default testResult;
