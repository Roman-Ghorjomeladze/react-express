import { Contract } from "../models/contract";
import { Profile } from "../models/profile";
import { Job } from "../models/job";
import { CONTRACT_STATUSES, PROFILE_TYPES } from "../utils/constants/contract";

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Profile.sync({ force: true });
  await Contract.sync({ force: true });
  await Job.sync({ force: true });
  //insert data
  await Promise.all([
    Profile.create({
      id: 1,
      firstName: "Harry",
      lastName: "Potter",
      profession: "Wizard",
      balance: 1150,
      type: PROFILE_TYPES.CLIENT,
    }),
    Profile.create({
      id: 2,
      firstName: "Mr",
      lastName: "Robot",
      profession: "Hacker",
      balance: 231.11,
      type: PROFILE_TYPES.CLIENT,
    }),
    Profile.create({
      id: 3,
      firstName: "John",
      lastName: "Snow",
      profession: "Knows nothing",
      balance: 451.3,
      type: PROFILE_TYPES.CLIENT,
    }),
    Profile.create({
      id: 4,
      firstName: "Ash",
      lastName: "Kethcum",
      profession: "Pokemon master",
      balance: 1999.3,
      type: PROFILE_TYPES.CLIENT,
    }),
    Profile.create({
      id: 5,
      firstName: "John",
      lastName: "Lenon",
      profession: "Musician",
      balance: 3464,
      type: PROFILE_TYPES.CONTRACTOR,
    }),
    Profile.create({
      id: 6,
      firstName: "Linus",
      lastName: "Torvalds",
      profession: "Programmer",
      balance: 1214,
      type: PROFILE_TYPES.CONTRACTOR,
    }),
    Profile.create({
      id: 7,
      firstName: "Alan",
      lastName: "Turing",
      profession: "Programmer",
      balance: 2342,
      type: PROFILE_TYPES.CONTRACTOR,
    }),
    Profile.create({
      id: 8,
      firstName: "Aragorn",
      lastName: "II Elessar Telcontarvalds",
      profession: "Fighter",
      balance: 3314,
      type: PROFILE_TYPES.CONTRACTOR,
    }),
    Contract.create({
      id: 1,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.TERMINATED,
      clientId: 1,
      contractorId: 5,
    }),
    Contract.create({
      id: 2,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.IN_PROGRES,
      clientId: 1,
      contractorId: 6,
    }),
    Contract.create({
      id: 3,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.IN_PROGRES,
      clientId: 2,
      contractorId: 6,
    }),
    Contract.create({
      id: 4,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.IN_PROGRES,
      clientId: 2,
      contractorId: 7,
    }),
    Contract.create({
      id: 5,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.NEW,
      clientId: 3,
      contractorId: 8,
    }),
    Contract.create({
      id: 6,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.IN_PROGRES,
      clientId: 3,
      contractorId: 7,
    }),
    Contract.create({
      id: 7,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.IN_PROGRES,
      clientId: 4,
      contractorId: 7,
    }),
    Contract.create({
      id: 8,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.IN_PROGRES,
      clientId: 4,
      contractorId: 6,
    }),
    Contract.create({
      id: 9,
      terms: "bla bla bla",
      status: CONTRACT_STATUSES.IN_PROGRES,
      clientId: 4,
      contractorId: 8,
    }),
    Job.create({
      description: "work",
      price: 200,
      contractId: 1,
      paid: false,
      paymentDate: null,
    }),
    Job.create({
      description: "work",
      price: 201,
      contractId: 2,
      paid: false,
      paymentDate: null,
    }),
    Job.create({
      description: "work",
      price: 202,
      contractId: 3,
      paid: false,
      paymentDate: null,
    }),
    Job.create({
      description: "work",
      price: 200,
      contractId: 4,
      paid: false,
      paymentDate: null,
    }),
    Job.create({
      description: "work",
      price: 200,
      contractId: 7,
      paid: false,
      paymentDate: null,
    }),
    Job.create({
      description: "work",
      price: 2020,
      paid: true,
      paymentDate: "2020-08-15T19:11:26.737Z",
      contractId: 7,
    }),
    Job.create({
      description: "work",
      price: 200,
      paid: true,
      paymentDate: "2020-08-15T19:11:26.737Z",
      contractId: 2,
    }),
    Job.create({
      description: "work",
      price: 200,
      paid: true,
      paymentDate: "2020-08-16T19:11:26.737Z",
      contractId: 3,
    }),
    Job.create({
      description: "work",
      price: 200,
      paid: true,
      paymentDate: "2020-08-17T19:11:26.737Z",
      contractId: 1,
    }),
    Job.create({
      description: "work",
      price: 200,
      paid: true,
      paymentDate: "2020-08-17T19:11:26.737Z",
      contractId: 5,
    }),
    Job.create({
      description: "work",
      price: 21,
      paid: true,
      paymentDate: "2020-08-10T19:11:26.737Z",
      contractId: 1,
    }),
    Job.create({
      description: "work",
      price: 21,
      paid: true,
      paymentDate: "2020-08-15T19:11:26.737Z",
      contractId: 2,
    }),
    Job.create({
      description: "work",
      price: 121,
      paid: true,
      paymentDate: "2020-08-15T19:11:26.737Z",
      contractId: 3,
    }),
    Job.create({
      description: "work",
      price: 121,
      paid: true,
      paymentDate: "2020-08-14T23:11:26.737Z",
      contractId: 3,
    }),
  ]);
}
