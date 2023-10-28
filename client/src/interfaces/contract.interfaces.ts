import { CONTRACT_STATUSES } from "../utils/contstants/contract";

export interface Contract {
    id: number,
    ContractorId: number,
    ClientId: number,
    createdAt: string,
    status: CONTRACT_STATUSES,
    terms: string,
}

export interface Job {
    ContractId: number,
    createdAt: string, 
    description: string,
    id: number,
    paid: boolean,
    paymentDate: string | null,
    price: number,
    updatedAt: string,
}