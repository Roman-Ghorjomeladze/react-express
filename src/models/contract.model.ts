import { CONTRACT_STATUSES } from '../utils/constants/contract';
import { Table, Model, Column, DataType, BelongsTo, HasMany } from "sequelize-typescript";
import { Profile } from './profile.model';
import { Job } from './job.model';

@Table({
  timestamps: true,
  tableName: "Contract",
})


class Contract extends Model {
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    terms!: string;
  
    
    @Column({
      type: DataType.ENUM,
      allowNull: false,
    })
    status!: CONTRACT_STATUSES;

    @BelongsTo(() => Profile, {as: 'Contractor', foreignKey: 'ContractorId'})
    Contractor: Profile;

    @BelongsTo(() => Profile, {as: 'Client', foreignKey: 'ClientId'})
    Client: Profile;

    @HasMany(() => Job)
    Jobs: Job[]
    
  }


Contract.belongsTo(Profile, {as: 'Contractor'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)

export {
  Contract,
};
