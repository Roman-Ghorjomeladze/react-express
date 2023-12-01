import { CONTRACT_STATUSES } from "../utils/types/contract";

export interface Contract {
    id: number,
    contractorId: number,
    clientId: number,
    createdAt: string,
    status: CONTRACT_STATUSES,
    terms: string,
}

export interface Job {
    contractId: number,
    createdAt: string, 
    description: string,
    id: number,
    paid: boolean,
    paymentDate: string | null,
    price: number,
    updatedAt: string,
}