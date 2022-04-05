import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const authorsRouter = express.Router();

const currentPath = fileURLToPath(import.meta.url);
console.log(currentPath);

const parentFolderPath = dirname(currentPath);
console.log(parentFolderPath);

const authorsPath = join(parentFolderPath, "authors.json");
console.log(authorsPath);

authorsRouter.post("/", (request, response) => {
  console.log("request successful", request.body);

  response.status(200).send();
});

authorsRouter.get("/", (request, response) => {
  console.log("request successful", request.body);

  response.send();
});

authorsRouter.get("/:authorsId", (request, response) => {
  console.log("request successful", request.body);

  response.send();
});

authorsRouter.put("/:authorsId", (request, response) => {
  console.log("request successful", response.body);

  response.send();
});

authorsRouter.delete("/:authorsId", (request, response) => {
  console.log("request successful", response.body);

  response.send();
});

export default authorsRouter;
