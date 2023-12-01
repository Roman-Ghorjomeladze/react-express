import { Contract } from "./contract";
import { sequelize } from "./sequelize";
import { DataTypes, Model, Optional } from "sequelize";

type JobAttributes = {
  id: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate: string | null;
  contractId?: number;
};

type JobCreationAttributes = Optional<JobAttributes, "id">;
class Job extends Model<JobAttributes, JobCreationAttributes> {
  declare id: number;
  declare description: string;
  declare price: number;
  declare paid: boolean;
  declare paymentDate: string | null;
  declare contractId?: number;
  declare contract?: Contract;
}
Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "job",
  },
);

export { Job };
