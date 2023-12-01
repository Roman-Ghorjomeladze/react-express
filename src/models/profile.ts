import { PROFILE_TYPES } from "../utils/constants/contract";
import { sequelize } from "./sequelize";
import { DataTypes, Model, Optional } from "sequelize";

type ProfileAttributes = {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: PROFILE_TYPES;
};

type ProfileCreationAttributes = Optional<ProfileAttributes, "id">;
class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare profession: string;
  declare balance: number;
  declare type: PROFILE_TYPES;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2),
    },
    type: {
      type: DataTypes.ENUM(...Object.values(PROFILE_TYPES)),
    },
  },
  {
    sequelize,
    modelName: "profile",
  },
);

export { Profile };
