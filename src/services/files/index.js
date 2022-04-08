import express from "express";
import multer from "multer";

import { saveBlogPostsAvatar } from "../../lib/fs-tools.js";

const filesRouter = express.Router();

filesRouter.post(
  "/:postsId/avatar",
  multer().single("avatar"),
  async (request, response, next) => {
    try {
      await saveBlogPostsAvatar(picture.jpeg.request.file.buffer);
      response.send();
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
