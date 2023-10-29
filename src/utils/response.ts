import { CommonResponse, PaginationParams } from "./interfaces/http.types";

/*
    To ensure that response will always be an object with the same structure, we can use such handler
    Also it's handy when working api's with pagination, we can add meta key in response and set pagination data in it
*/
export const formatResponse = (data: any, meta?: PaginationParams): CommonResponse => {
  return meta ? { data, meta, ok: true } : { data, ok: true }
}

/* 
    For consistency I always prefer not to change response structure, that's why I'm returning
    an array of error texts. So if there will be multiple errors, I'll include them in this array
*/
export const formatError = (message: string, errors: any[] = []): CommonResponse => {
  return {
    data: null,
    error: {
      message,
      details: errors,
    },
    ok: false
  };
}
