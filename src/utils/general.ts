import { PaginationParams } from "./interfaces/http.types";

export function isDateValid(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(Number(date)) ? date : null; //TODO Check if this works
}

export function getPaginationParams(params: any, defaultLimit = 20): PaginationParams {
    const limit = params.limit || defaultLimit;
    return {
        limit,
        offset: params.page ? (params.page - 1) * limit : 0,
        page: params.page || 1
    }
}
