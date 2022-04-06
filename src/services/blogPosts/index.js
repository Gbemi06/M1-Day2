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
    console.log("request");

    response.send();
  } catch (error) {}
});

blogPostRouter.delete("/:blogPostId", (request, response) => {
  try {
    console.log("request");

    response.send();
  } catch (error) {}
});

export default blogPostRouter;
