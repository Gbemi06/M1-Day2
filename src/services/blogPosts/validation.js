import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const blogPostSchema = {
  /*  id: {
    in: ["params", "query"],
    errorMessage: "ID validation failed!",
    isInt: true,
    toInt: true,
  }, */
  category: {
    in: ["body"],
    isString: {
      errorMessage:
        "Category validation failed! Category is mandatory and must be a string",
    },
  },
  title: {
    in: ["body"],
    isString: {
      errorMessage:
        "Title validation failed! Title is mandatory and must be a string",
    },
  },
  cover: {
    in: ["body"],
    isString: {
      errorMessage:
        "Category validation failed! Category is mandatory and must be a string",
    },
  },
  "readTime.value": {
    in: ["body"],
    isNumeric: {
      errorMessage:
        "readTime.value validation failed! readTime.value is mandatory and must be a Numeric",
    },
  },
  "readTime.unit": {
    in: ["body"],
    isString: {
      errorMessage:
        "readTime.unit validation failed! readTime.unit is mandatory and must be a string",
    },
  },
  "author.name": {
    in: ["body"],
    isString: {
      errorMessage:
        "Author.name validation failed! Author is mandatory and must be a string",
    },
  },
  "author.avatar": {
    in: ["body"],
    isString: {
      errorMessage:
        "Author.avatar validation failed! Author is mandatory and must be a string",
    },
  },
};

export const checkBlogPostSchema = checkSchema(blogPostSchema);

export const checkValidationResult = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    // There is validation error
    next(
      createError(400, "Validation problems in request.body", {
        errorList: errors.array(),
      })
    );
  } else {
    // All is fine
    next();
  }
};
