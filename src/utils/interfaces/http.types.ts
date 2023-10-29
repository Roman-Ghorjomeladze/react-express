import { Request } from "express";
import { UserProfile } from "./general";

export type PaginationParams = {
    limit: number;
    offset: number;
    page: number;
}

export type CommonResponse = {
    data: any;
    meta?: PaginationParams;
    ok: boolean;
    error?: any;
}

export interface IRequest extends Request {
    profile: UserProfile
}