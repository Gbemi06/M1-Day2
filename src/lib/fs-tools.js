import fs from "fs-extra";
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const { writeJSON, readJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");
const authorsJSONFolderPath = join(dataFolderPath, "authors.json");
const blogPostsJSONFolderPath = join(dataFolderPath, "blogPost.json");

export const getBlogPosts = () => readJSON(blogPostsJSONFolderPath);
export const postBlogPosts = (content) =>
  writeJSON(blogPostsJSONFolderPath, content);
export const getAuthors = () => readJSON(authorsJSONFolderPath);
export const postAuthors = (content) =>
  writeJSON(authorsJSONFolderPath, content);
