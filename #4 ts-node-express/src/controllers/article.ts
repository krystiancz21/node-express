import { validationResult } from "express-validator";
import { RequestHandler } from "express";
import Article from "../models/article";
import { CustomError } from "../interfaces/error";

export const getArticles: RequestHandler = async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.status(200).json({
      message: "Fetched posts successfully.",
      articles: articles,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const createArticle: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomError = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { title, content } = req.body as { title: string; content: string };
  const newArticle = new Article({
    title,
    content,
  });

  try {
    await newArticle.save();
    res.status(201).json({
      message: "Created the article.",
      createdArticle: newArticle,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const updateArticle: RequestHandler<{id: string}> = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: CustomError = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const articleId = req.params.id;
  const { title, content } = req.body as { title: string; content: string };

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      const error: CustomError = new Error("Could not find article.");
      error.statusCode = 404;
      throw error;
    }
    if (title) article.title = title;
    if (content) article.content = content;
    const result = await article.save();
    res.status(200).json({
      message: "Article updated.",
      createdArticle: result,
    });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteArticle: RequestHandler<{id: string}> = async (req, res, next) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      const error: CustomError = new Error("Could not find article.");
      error.statusCode = 404;
      throw error;
    }
    await article.deleteOne();
    res.status(200).json({ message: "Deleted article." });
  } catch (err) {
    const error = err as CustomError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};