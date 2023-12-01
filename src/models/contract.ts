import { sequelize } from "./sequelize";
import { Profile } from "./profile";
import { Job } from "./job";
import { DataTypes, Model, Optional } from "sequelize";
import { CONTRACT_STATUSES } from "../utils/constants/contract";

type ContractAttributes = {
  id: number;
  terms: string;
  status: CONTRACT_STATUSES;
  contractorId?: number;
  clientId?: number;
};

type ContractCreationAttributes = Optional<ContractAttributes, "id">;

class Contract extends Model<ContractAttributes, ContractCreationAttributes> {
  declare id: number;
  declare terms: string;
  declare status: CONTRACT_STATUSES;
  declare contractorId?: number;
  declare clientId?: number;
  declare client?: Profile;
  declare contractor?: Profile;
}

Contract.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(CONTRACT_STATUSES)),
    },
  },
  {
    sequelize,
    modelName: "contract",
  },
);

Contract.belongsTo(Profile, { as: "contractor", foreignKey: "contractorId" });
Contract.belongsTo(Profile, { as: "client", foreignKey: "clientId" });
Profile.hasMany(Contract, { as: "contractor", foreignKey: "contractorId" });
Profile.hasMany(Contract, { as: "client", foreignKey: "clientId" });
Contract.hasMany(Job, { as: "jobs", foreignKey: "contractId" });
Job.belongsTo(Contract, {
  as: "contract",
  foreignKey: "contractId",
  targetKey: "id",
});

export { Contract };
