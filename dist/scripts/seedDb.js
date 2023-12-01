"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("../models/contract");
const profile_1 = require("../models/profile");
const job_1 = require("../models/job");
const contract_2 = require("../utils/constants/contract");
seed();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield profile_1.Profile.sync({ force: true });
        yield contract_1.Contract.sync({ force: true });
        yield job_1.Job.sync({ force: true });
        yield Promise.all([
            profile_1.Profile.create({
                id: 1,
                firstName: "Harry",
                lastName: "Potter",
                profession: "Wizard",
                balance: 1150,
                type: contract_2.PROFILE_TYPES.CLIENT,
            }),
            profile_1.Profile.create({
                id: 2,
                firstName: "Mr",
                lastName: "Robot",
                profession: "Hacker",
                balance: 231.11,
                type: contract_2.PROFILE_TYPES.CLIENT,
            }),
            profile_1.Profile.create({
                id: 3,
                firstName: "John",
                lastName: "Snow",
                profession: "Knows nothing",
                balance: 451.3,
                type: contract_2.PROFILE_TYPES.CLIENT,
            }),
            profile_1.Profile.create({
                id: 4,
                firstName: "Ash",
                lastName: "Kethcum",
                profession: "Pokemon master",
                balance: 1999.3,
                type: contract_2.PROFILE_TYPES.CLIENT,
            }),
            profile_1.Profile.create({
                id: 5,
                firstName: "John",
                lastName: "Lenon",
                profession: "Musician",
                balance: 3464,
                type: contract_2.PROFILE_TYPES.CONTRACTOR,
            }),
            profile_1.Profile.create({
                id: 6,
                firstName: "Linus",
                lastName: "Torvalds",
                profession: "Programmer",
                balance: 1214,
                type: contract_2.PROFILE_TYPES.CONTRACTOR,
            }),
            profile_1.Profile.create({
                id: 7,
                firstName: "Alan",
                lastName: "Turing",
                profession: "Programmer",
                balance: 2342,
                type: contract_2.PROFILE_TYPES.CONTRACTOR,
            }),
            profile_1.Profile.create({
                id: 8,
                firstName: "Aragorn",
                lastName: "II Elessar Telcontarvalds",
                profession: "Fighter",
                balance: 3314,
                type: contract_2.PROFILE_TYPES.CONTRACTOR,
            }),
            contract_1.Contract.create({
                id: 1,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.TERMINATED,
                clientId: 1,
                contractorId: 5,
            }),
            contract_1.Contract.create({
                id: 2,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.IN_PROGRES,
                clientId: 1,
                contractorId: 6,
            }),
            contract_1.Contract.create({
                id: 3,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.IN_PROGRES,
                clientId: 2,
                contractorId: 6,
            }),
            contract_1.Contract.create({
                id: 4,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.IN_PROGRES,
                clientId: 2,
                contractorId: 7,
            }),
            contract_1.Contract.create({
                id: 5,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.NEW,
                clientId: 3,
                contractorId: 8,
            }),
            contract_1.Contract.create({
                id: 6,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.IN_PROGRES,
                clientId: 3,
                contractorId: 7,
            }),
            contract_1.Contract.create({
                id: 7,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.IN_PROGRES,
                clientId: 4,
                contractorId: 7,
            }),
            contract_1.Contract.create({
                id: 8,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.IN_PROGRES,
                clientId: 4,
                contractorId: 6,
            }),
            contract_1.Contract.create({
                id: 9,
                terms: "bla bla bla",
                status: contract_2.CONTRACT_STATUSES.IN_PROGRES,
                clientId: 4,
                contractorId: 8,
            }),
            job_1.Job.create({
                description: "work",
                price: 200,
                contractId: 1,
                paid: false,
                paymentDate: null,
            }),
            job_1.Job.create({
                description: "work",
                price: 201,
                contractId: 2,
                paid: false,
                paymentDate: null,
            }),
            job_1.Job.create({
                description: "work",
                price: 202,
                contractId: 3,
                paid: false,
                paymentDate: null,
            }),
            job_1.Job.create({
                description: "work",
                price: 200,
                contractId: 4,
                paid: false,
                paymentDate: null,
            }),
            job_1.Job.create({
                description: "work",
                price: 200,
                contractId: 7,
                paid: false,
                paymentDate: null,
            }),
            job_1.Job.create({
                description: "work",
                price: 2020,
                paid: true,
                paymentDate: "2020-08-15T19:11:26.737Z",
                contractId: 7,
            }),
            job_1.Job.create({
                description: "work",
                price: 200,
                paid: true,
                paymentDate: "2020-08-15T19:11:26.737Z",
                contractId: 2,
            }),
            job_1.Job.create({
                description: "work",
                price: 200,
                paid: true,
                paymentDate: "2020-08-16T19:11:26.737Z",
                contractId: 3,
            }),
            job_1.Job.create({
                description: "work",
                price: 200,
                paid: true,
                paymentDate: "2020-08-17T19:11:26.737Z",
                contractId: 1,
            }),
            job_1.Job.create({
                description: "work",
                price: 200,
                paid: true,
                paymentDate: "2020-08-17T19:11:26.737Z",
                contractId: 5,
            }),
            job_1.Job.create({
                description: "work",
                price: 21,
                paid: true,
                paymentDate: "2020-08-10T19:11:26.737Z",
                contractId: 1,
            }),
            job_1.Job.create({
                description: "work",
                price: 21,
                paid: true,
                paymentDate: "2020-08-15T19:11:26.737Z",
                contractId: 2,
            }),
            job_1.Job.create({
                description: "work",
                price: 121,
                paid: true,
                paymentDate: "2020-08-15T19:11:26.737Z",
                contractId: 3,
            }),
            job_1.Job.create({
                description: "work",
                price: 121,
                paid: true,
                paymentDate: "2020-08-14T23:11:26.737Z",
                contractId: 3,
            }),
        ]);
    });
}
