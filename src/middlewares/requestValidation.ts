// function to validate the request body of an incoming request
export const requestValidation = async (
  schema: { validate: (request: object) => { error?: Error | null } },
  request: object,
) => {
  const { error } = schema.validate(request);
  if (error) throw { message: error?.message, status: 500 };
};
