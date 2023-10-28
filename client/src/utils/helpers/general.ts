import { API_HOST } from "../contstants/general";

export const getApiUrl = (endpoint: string) : string => {
    return `${API_HOST}${endpoint}`;
}

export const boolToYesNo = (value: boolean): string => {
    return value === true ? "YES" : "NO";
}