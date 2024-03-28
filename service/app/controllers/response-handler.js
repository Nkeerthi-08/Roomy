export const setResponse = (object, response) => {
  return response.status(200).json(object);
};

export const setResponseWithError = (error, response) => {
  return response.status(500).json({
    error: {
      message: error.message,
      code: "INTERNAL_SERVER_ERROR",
    },
  });
};
