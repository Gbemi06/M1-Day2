import express from "express";
import uniqid from "uniqid";
import { getBlogPosts, postBlogPosts } from "../../lib/fs-tools.js";
import createError from "http-errors";
import {
  checkBlogPostSchema,
  checkValidationResult,
} from "./blogPostValidation.js";

const blogPostRouter = express.Router();

/* const blogPostJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "blogPost.json"
);

console.log(blogPostJSONPath);

const getBlogPosts = () => JSON.parse(fs.readFileSync(blogPostJSONPath));
console.log(getBlogPosts);

const postBlogPosts = (content) =>
  fs.writeFileSync(blogPostJSONPath, JSON.stringify(content));
console.log(postBlogPosts); */

blogPostRouter.post(
  "/",
  checkBlogPostSchema,
  checkValidationResult,
  async (request, response, next) => {
    try {
      const post = { ...request.body, createdAt: new Date(), id: uniqid() };
      console.log(post);

      const posts = await getBlogPosts();
      posts.push(post);
      postBlogPosts(posts);

      response.status(201).send("post sent!");
    } catch (error) {
      next(error);
    }
  }
);

blogPostRouter.get("/", async (request, response, next) => {
  try {
    const getPosts = await getBlogPosts();

    response.send(getPosts);
  } catch (error) {
    console.log(error);
    next(createError(500, "Server Error"));
  }
});

blogPostRouter.get("/:blogPostId", async (request, response, next) => {
  try {
    const postId = request.params.blogPostId;
    const getPosts = await getBlogPosts();

    const blogPost = getPosts.find((post) => post.id === postId);

    response.send(blogPost);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.put("/:blogPostId", async (request, response, next) => {
  try {
    const postId = request.params.blogPostId;
    const getPosts = await getBlogPosts();
    const blogPostIndex = getPosts.findIndex((post) => post.id === postId);
    const oldBlogPost = getPosts[blogPostIndex];
    const updatedPost = {
      ...oldBlogPost,
      ...request.body,
      updatedAt: new Date(),
    };

    getPosts[blogPostIndex] = updatedPost;
    postBlogPosts(getPosts);
    response.send(updatedPost);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.delete("/:blogPostId", async (request, response, next) => {
  try {
    const postId = request.params.blogPostId;
    const getPosts = await getBlogPosts();
    const remainingPost = getPosts.filter((posts) => posts.id !== postId);
    console.log(remainingPost);
    if (!postId !== 1) {
      postBlogPosts(remainingPost);

      response.send(`post with id: ${postId} is deleted`);
    } else {
      next(createError(404, `The Post with id ${postId} is not found`));
    }
  } catch (error) {
    next(error);
  }
});

export default blogPostRouter;
