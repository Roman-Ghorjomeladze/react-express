export enum UserType {
    CLIENT = 'client',
    CONTRACTOR = 'contractor',
}

export interface User {
    firstName: string;
    lastName: string;
    id: number;
    profession: string;
    type: UserType,
    balance: number,
    createdAt: string,
}