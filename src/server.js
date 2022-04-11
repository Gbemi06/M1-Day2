import express from "express";
import cors from "cors";
import listUrl from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";
import blogPostRouter from "./services/blogPosts/index.js";
import filesRouter from "./services/files/index.js";

import {
  errorHandler,
  notFoundError,
  unauthorizedError,
  badRequestError,
} from "./errorHandler.js";
import { join } from "path";

const publicFolderPath = join(process.cwd(), "./public");

console.log(process.env.PORT);

const port = process.env.PORT || 3001;

const server = express();

// const wishList = [process.env.FE_DEV_URL];

server.use(express.static(publicFolderPath));
server.use(cors());
server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostRouter);
server.use("/files", filesRouter);

server.use(unauthorizedError);
server.use(badRequestError);
server.use(notFoundError);
server.use(errorHandler);

server.listen(port, () => {
  console.table(listUrl(server));
  console.log(`working server port is ${port}`);
});
