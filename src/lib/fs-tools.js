import fs from "fs-extra";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const { writeJSON, readJSON, writeFile } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const authorsJSONFolderPath = join(dataFolderPath, "authors.json");
const blogPostsJSONFolderPath = join(dataFolderPath, "blogPosts.json");

const blogPostsPublicFolderPath = join(process.cwd(), "./public/img/blogPost");

export const getBlogPosts = () => readJSON(blogPostsJSONFolderPath);
export const postBlogPosts = (content) =>
  writeJSON(blogPostsJSONFolderPath, content);
export const getAuthors = () => readJSON(authorsJSONFolderPath);
export const postAuthors = (content) =>
  writeJSON(authorsJSONFolderPath, content);

export const saveBlogPostsAvatar = (filename, contentBuffer) =>
  writeFile(join(blogPostsPublicFolderPath, filename), contentBuffer);
