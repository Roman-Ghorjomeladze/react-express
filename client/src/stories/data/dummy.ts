import { Contract, Job } from "../../interfaces/contract.interfaces";
import { User, UserType } from "../../interfaces/user.interfaces";
import { CONTRACT_STATUSES } from "../../utils/types/contract";

export const contracts : Contract[] = [
    {
      "id": 0,
      "terms": "bla bla bla",
      "status": CONTRACT_STATUSES.IN_PROGRESS,
      "createdAt": "2023-09-19T08:38:43.065Z",
      "contractorId": 7,
      "clientId": 4
    },
    {
      "id": 0,
      "terms": "bla bla bla",
      "status": CONTRACT_STATUSES.NEW,
      "createdAt": "2023-09-19T08:38:43.065Z",
      "contractorId": 6,
      "clientId": 4
    },
    {
      "id": 0,
      "terms": "bla bla bla",
      "status": CONTRACT_STATUSES.TERMINATED,
      "createdAt": "2023-09-19T08:38:43.065Z",
      "contractorId": 8,
      "clientId": 4
    }
  ]

  export const jobs : Job[] = [
    {
      "id": 0,
      "description": "work",
      "price": 202,
      "paid": false,
      "paymentDate": null,
      "createdAt": "2023-09-19T08:38:43.066Z",
      "updatedAt": "2023-09-19T08:38:43.066Z",
      "contractId": 3
    },
    {
      "id": 0,
      "description": "work",
      "price": 200,
      "paid": false,
      "paymentDate": null,
      "createdAt": "2023-09-19T08:38:43.066Z",
      "updatedAt": "2023-09-19T08:38:43.066Z",
      "contractId": 4
    }
  ]

  export const client: User = {
    id: 0,
    firstName: "John",
    lastName: "Doeh",
    balance: 400,
    createdAt: new Date().toDateString(),
    profession: "Developer",
    type: UserType.CLIENT
  }

  export const contractor: User = {
    id: 0,
    firstName: "Jane",
    lastName: "Doeh",
    balance: 400,
    createdAt: new Date().toDateString(),
    profession: "Developer",
    type: UserType.CONTRACTOR
  }