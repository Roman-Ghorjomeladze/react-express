import { Table, Model, Column, DataType, BelongsTo } from "sequelize-typescript";
import { Contract } from ".";

@Table({
  timestamps: true,
  tableName: "Job",
})


class Job extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    description!: string;
  
    
    @Column({
      type: DataType.DECIMAL(12,2),
      allowNull: false,
    })
    price!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
      })
    paid!: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
      })
    paymentDate!: string;

    @BelongsTo(() => Contract)
    Contract: Contract
  }

//   Job.belongsTo(Contract)

export {
  Job,
};
