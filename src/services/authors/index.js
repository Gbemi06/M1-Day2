import uniqid from "uniqid";
import { getAuthors, postAuthors } from "../../lib/fs-tools.js";
import express from "express";
import createError from "http-errors";
import {
  checkAuthorSchema,
  checkValidationResult,
} from "./authorsValidation.js";

const authorsRouter = express.Router();

authorsRouter.post(
  "/",
  checkValidationResult,
  checkAuthorSchema,
  async (request, response, next) => {
    try {
      console.log("request successful", request.body);
      const newAuthor = {
        ...request.body,
        createdAt: new Date(),
        id: uniqid(),
      };

      const author = await getAuthors();

      console.log("posted successful", author);

      author.push(newAuthor);

      postAuthors(author);

      response.status(200).send({ id: newAuthor.id });
    } catch (error) {
      next(error);
    }
  }
);

// READ --> GET request on http://localhost:3001/authors/ (+ optional query parameters)

authorsRouter.get("/", async (request, response, next) => {
  try {
    const authors = await getAuthors();

    response.send(authors);
  } catch (error) {
    next(error);
  }
});

// READ (single Author) --> GET request on http://localhost:3001/authors/:authorId

authorsRouter.get("/:authorId", async (request, response, next) => {
  try {
    const authorId = request.params.authorId;
    const authorsArray = await getAuthors();

    const getAuthor = authorsArray.find((author) => author.id === authorId);

    response.send(getAuthor);
  } catch (error) {
    next(error);
  }
});

//  UPDATE (single author) --> UPDATE request on http://localhost:3001/authors/:authorId

authorsRouter.put("/:authorId", async (request, response, next) => {
  try {
    const authorId = request.params.authorId;
    const authorsArray = await getAuthors();

    const authorIndex = authorsArray.findIndex(
      (author) => author.id === authorId
    );
    if (authorIndex !== -1) {
      const authorToEdit = authorsArray[authorIndex];
      const editedAuthor = {
        ...authorToEdit,
        ...request.body,
        updatedAt: new Date(),
      };
      authorsArray[authorIndex] = editedAuthor;

      postAuthors(authorsArray);
      response.send(editedAuthor);
    } else {
      next(createError(404, `Author with id ${authorId} is not found`));
    }
  } catch (error) {
    next(error);
  }
});

//  DELETE (single author) --> DELETE request on http://localhost:3001/authors/:authorId

authorsRouter.delete("/:authorId", async (request, response, next) => {
  try {
    const authorId = request.params.authorId;

    const authorsArray = await getAuthors();
    const otherAuthors = authorsArray.filter(
      (author) => author.id !== authorId
    );
    if (authorId !== 1) {
      postAuthors(otherAuthors);
      response.send(`Author with id ${authorId} was deleted successfully`);
    } else {
      next(createError(404, `The Author with id ${authorId} is not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default authorsRouter;
