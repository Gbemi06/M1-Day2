import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import createError from "http-errors";
import { checkBlogPostSchema, checkValidationResult } from "./validation.js";

const blogPostRouter = express.Router();

const blogPostJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogPost.json"
);

console.log(blogPostJSONPath);

const getBlogPosts = () => JSON.parse(fs.readFileSync(blogPostJSONPath));
console.log(getBlogPosts);

const postBlogPosts = (content) =>
  fs.writeFileSync(blogPostJSONPath, JSON.stringify(content));
console.log(postBlogPosts);

blogPostRouter.post(
  "/",
  checkBlogPostSchema,
  checkValidationResult,
  (request, response, next) => {
    try {
      const post = { ...request.body, createdAt: new Date(), id: uniqid() };
      console.log(post);

      const posts = getBlogPosts();
      posts.push(post);
      postBlogPosts(posts);

      response.status(201).send("post sent!");
    } catch (error) {
      next(error);
    }
  }
);

blogPostRouter.get("/", (request, response, next) => {
  try {
    const getPosts = getBlogPosts();

    response.send(getPosts);
  } catch (error) {
    console.log(error);
    next(createError(500, "Server Error"));
  }
});

blogPostRouter.get("/:blogPostId", (request, response, next) => {
  try {
    const postId = request.params.blogPostId;
    const getPosts = getBlogPosts();

    const blogPost = getPosts.find((post) => post.id === postId);

    response.send(blogPost);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.put("/:blogPostId", (request, response, next) => {
  try {
    const postId = request.params.blogPostId;
    const getPosts = getBlogPosts();
    const blogPostIndex = getPosts.findIndex((post) => post.id === postId);
    const oldBlogPost = getPosts[blogPostIndex];
    const updatedPost = {
      ...oldBlogPost,
      ...request.body,
      updatedAt: new Date(),
    };

    // updatedPost = getPosts(blogPostIndex);

    postBlogPosts(updatedPost);
    response.send(updatedPost);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.delete("/:blogPostId", (request, response, next) => {
  try {
    const postId = request.params.blogPostId;
    const getPosts = getBlogPosts();
    const remainingPost = getPosts.filter((posts) => posts.id !== postId);
    postBlogPosts(remainingPost);

    response.send(`post with id: ${postId} deleted`);
  } catch (error) {
    next(error);
  }
});

export default blogPostRouter;
