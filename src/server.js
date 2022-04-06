import express from "express";
import listUrl from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";
import blogPostRouter from "./services/blogPosts/index.js";

const server = express();

const port = 3001;

server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostRouter);

server.listen(port, () => {
  console.table(listUrl(server));
  console.log(`working server port is ${port}`);
});
