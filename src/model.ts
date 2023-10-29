// import {Sequelize, DECIMAL, ENUM, BOOLEAN, DATE, TEXT} from 'sequelize';
// import { CONTRACT_STATUSES, PROFILE_TYPES } from './utils/constants/contract';
// import { Table, Model, Column, DataType } from "sequelize-typescript";

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite3'
// });

// @Table({
//   timestamps: true,
//   tableName: "Profile",
// })

// class Profile extends Model {
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   firstName!: string;

  
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   lastName!: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   profession!: string;

//   @Column({
//     type: DataType.DECIMAL(12, 2),
//     allowNull: false,
//   })
//   balance!: string;

//   @Column({
//     type: DataType.ENUM,
//     allowNull: false,
//   })
//   type!: PROFILE_TYPES;


// }

// class Contract extends Model {
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   terms!: string;

  
//   @Column({
//     type: DataType.ENUM,
//     allowNull: false,
//   })
//   status!: CONTRACT_STATUSES;

// }
// Contract.init(
//   {
//     terms: {
//       type: TEXT,
//       allowNull: false
//     },
//     status:{
//       type: ENUM,
//       values: Object.values(CONTRACT_STATUSES),
//     }
//   },
//   {
//     sequelize,
//     modelName: 'Contract'
//   }
// );

// class Job extends Model {}
// Job.init(
//   {
//     description: {
//       type: TEXT,
//       allowNull: false
//     },
//     price:{
//       type: DECIMAL(12,2),
//       allowNull: false
//     },
//     paid: {
//       type: BOOLEAN,
//       defaultValue: false
//     },
//     paymentDate:{
//       type: DATE
//     }
//   },
//   {
//     sequelize,
//     modelName: 'Job'
//   }
// );

// Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
// Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})
// Contract.belongsTo(Profile, {as: 'Contractor'})
// Contract.belongsTo(Profile, {as: 'Client'})
// Contract.hasMany(Job)
// Job.belongsTo(Contract)

// export {
//   sequelize,
//   Profile,
//   Contract,
//   Job
// };
