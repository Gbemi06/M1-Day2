import express from "express";
import multer from "multer";

import { saveBlogPostsAvatar } from "../../lib/fs-tools.js";

const filesRouter = express.Router();

filesRouter.post(
  "/singleUpload",
  multer().single("avatar"),
  async (request, response, next) => {
    try {
      console.log("file", request.file);
      await saveBlogPostsAvatar(request.file.originalname, request.file.buffer);
      response.send();
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
