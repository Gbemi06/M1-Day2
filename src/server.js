import express from "express";

const server = express();

const port = 3001;

server.use(express.json());

server.listen(port, () => {
  console.log(`working server port is ${port}`);
});
