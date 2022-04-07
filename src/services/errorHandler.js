export const errorHandler = (err, request, response, next) => {
  console.log(err);
  if (!request.headersSent) {
    response.send({ message: "This is a Server error" });
  }
};
