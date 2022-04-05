import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

const currentPath = fileURLToPath(import.meta.url);
console.log(currentPath);

const parentFolderPath = dirname(currentPath);
console.log(parentFolderPath);

const authorsPath = join(parentFolderPath, "authors.json");
console.log(authorsPath);

// CREATE --> POST request on http://localhost:3001/authors/ (+ body)

authorsRouter.post("/", (request, response) => {
  console.log("request successful", request.body);
  const newAuthor = { ...request.body, createdAt: new Date(), id: uniqid() };

  const author = JSON.parse(fs.readFileSync(authorsPath));

  console.log("posted successful", author);

  author.push(newAuthor);

  fs.writeFileSync(authorsPath, JSON.stringify(author));

  response.status(200).send({ id: newAuthor.id });
});

// READ --> GET request on http://localhost:3001/authors/ (+ optional query parameters)
authorsRouter.get("/", (request, response) => {
  const authors = JSON.parse(fs.readFileSync(authorsPath, "utf-8"));

  response.send(authors);
});

// READ (single Author) --> GET request on http://localhost:3001/authors/:authorId

authorsRouter.get("/:authorId", (request, response) => {
  const authorId = request.params.authorId;
  const authorsArray = JSON.parse(fs.readFileSync(authorsPath));

  const getAuthor = authorsArray.find((author) => author.id === authorId);

  response.send(getAuthor);
});

//  UPDATE (single author) --> UPDATE request on http://localhost:3001/authors/:authorId

authorsRouter.put("/:authorId", (request, response) => {
  const authorId = request.params.authorId;
  const authorsArray = JSON.parse(fs.readFileSync(authorsPath));

  const authorIndex = authorsArray.find((author) => author.id === authorId);
  const authorToEdit = authorsArray[authorIndex];
  const editedAuthor = {
    ...authorToEdit,
    ...request.body,
    updatedAt: new Date(),
  };

  authorsArray[authorIndex] = editedAuthor;

  fs.writeFileSync(authorsPath, JSON.stringify(authorsArray));
  response.send(editedAuthor);
});

//  DELETE (single author) --> DELETE request on http://localhost:3001/authors/:authorId

authorsRouter.delete("/:authorId", (request, response) => {
  const authorId = request.params.authorId;

  const authorsArray = JSON.parse(fs.readFileSync(authorsPath));
  const otherAuthors = authorsArray.filter((author) => author.id !== authorId);

  fs.writeFileSync(authorsPath, JSON.stringify(otherAuthors));

  response.send();
});

export default authorsRouter;
