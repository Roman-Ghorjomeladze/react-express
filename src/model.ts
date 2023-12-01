// import { CONTRACT_TYPE } from "./types/contract";
// import { USER_TYPE } from "./types/user";

// import { DataTypes, Model, Optional, Sequelize } from 'sequelize'

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite3'
// });

// type ProfileAttributes = {
//   id: number,
//   firstName: string;
//   lastName: string;
//   profession: string;
//   balance: number;
//   type: USER_TYPE;
// }

// type ProfileCreationAttributes = Optional<ProfileAttributes, 'id'>

// class Profile extends Model<ProfileAttributes, ProfileCreationAttributes>  {}


// Profile.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     profession: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     balance:{
//       type:DataTypes.DECIMAL(12,2)
//     },
//     type: {
//       type: DataTypes.ENUM(...Object.values(USER_TYPE))
//     }
//   },
//   {
//     sequelize,
//     modelName: 'Profile'
//   }
// );

// type ContractAttributes = {
//   id: number,
//   terms: string,
//   status: CONTRACT_TYPE,
// }

// type ContractCreationAttributes = Optional<ContractAttributes, 'id'>

// class Contract extends Model<ContractAttributes, ContractCreationAttributes> {
//   term: string;
//   status: CONTRACT_TYPE;
// }
// Contract.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     terms: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     status:{
//       type: DataTypes.ENUM(...Object.values(CONTRACT_TYPE))
//     }
//   },
//   {
//     sequelize,
//     modelName: 'Contract'
//   }
// );

// type JobAttributes = {
//   id: number;
//   description: string;
//   price: number;
//   paid: boolean;
//   paymentDate: Date;
// }

// type JobCreationAttributes = Optional<JobAttributes, 'id'>
// class Job extends Model<JobAttributes, JobCreationAttributes> {}
// Job.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     price:{
//       type: DataTypes.DECIMAL(12,2),
//       allowNull: false
//     },
//     paid: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     paymentDate:{
//       type: DataTypes.DATE
//     }
//   },
//   {
//     sequelize,
//     modelName: 'Job'
//   }
// );

// Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
// Contract.belongsTo(Profile, {as: 'Contractor'})
// Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})
// Contract.belongsTo(Profile, {as: 'Client'})
// Contract.hasMany(Job)
// Job.belongsTo(Contract)

// export {
//   sequelize,
//   Profile,
//   Contract,
//   Job
// };
