import { checkSchema, validationResult } from "express-validator";
import createError from "http-errors";

const authorSchema = {
  /*  id: {
    in: ["params", "query"],
    errorMessage: "ID validation failed!",
    isInt: true,
    toInt: true,
  }, */
  name: {
    in: ["body"],
    isString: {
      errorMessage:
        "Name validation failed! Name is mandatory and must be a string",
    },
  },
  surname: {
    in: ["body"],
    isString: {
      errorMessage:
        "surname validation failed! surname is mandatory and must be a string",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage:
        "Email validation failed! Email is mandatory and must be in a email format",
    },
  },
  date_of_birth: {
    in: ["body"],
    isString: {
      errorMessage:
        "Date of birth validation failed! Date of Birth is mandatory and must be a string",
    },
  },
  avatar: {
    in: ["body"],
    isString: {
      errorMessage:
        "avatar validation failed! avatar is mandatory and must be a string",
    },
  },
};

export const checkAuthorSchema = checkSchema(authorSchema);

export const checkValidationResult = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    // There is validation error
    next(
      createError(400, "Validation problems in request.body", {
        errorsList: errors.array(),
      })
    );
  } else {
    // All is fine
    next();
  }
};
