export const API_HOST = 'http://localhost:3001/api/v1/';

export enum FeedbackType {
    SUCCESS = 'Success',
    ERROR = 'Error',
    WARNING = 'Warning',
}

export interface HTTPResponse { 
    ok: boolean, 
    data: unknown, 
    error: { message: string } 
}