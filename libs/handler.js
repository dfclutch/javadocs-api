import { get } from "lodash";

export default function handler(lambda) {
  return async function (event) {
    try {
      const result = await lambda(event);

      if (get(result, 'error')) {
        return {
          statusCode: 500,
          error: result.error
        };
      }

      return {
        statusCode: 200,
        body: result
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        error
      };
    }
  };
}