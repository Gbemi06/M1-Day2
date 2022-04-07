import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";

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

blogPostRouter.post("/", (request, response, next) => {
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
});

blogPostRouter.get("/", (request, response) => {
  try {
    console.log("request");

    response.send();
  } catch (error) {}
});

blogPostRouter.get("/:blogPostId", (request, response) => {
  try {
    console.log("request");

    response.send();
  } catch (error) {}
});

blogPostRouter.put("/:blogPostId", (request, response) => {
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

    updatedPost = getPosts[blogPostIndex];

    postBlogPosts(updatedPost);
    response.send(updatedPost);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.delete("/:blogPostId", (request, response) => {
  try {
    console.log("request");

    response.send();
  } catch (error) {}
});

export default blogPostRouter;
