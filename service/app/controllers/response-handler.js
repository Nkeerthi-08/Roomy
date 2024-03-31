export const setResponse = (response, object) => {
  return response.status(200).json(object);
};

export const setResponseWithError = (response, error) => {
  return response.status(500).json({
    error: {
      message: error.message,
      code: "INTERNAL_SERVER_ERROR",
    },
  });
};
