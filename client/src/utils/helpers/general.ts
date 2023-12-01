import { API_HOST } from "../types/general";

export const getApiUrl = (endpoint: string) : string => {
    return `${API_HOST}${endpoint}`;
}

export const boolToYesNo = (value: boolean): string => {
    return value === true ? "YES" : "NO";
}

export const getJsonHeader = (userId: number|undefined): Headers => {
    const header = new Headers();
    header.append('profile_id', String(userId));
    header.append("Content-Type", 'application/json');
    return header;
}