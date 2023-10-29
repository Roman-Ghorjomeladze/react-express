import {  PROFILE_TYPES } from '../utils/constants/contract';
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Contract } from './contract.model';

@Table({
  timestamps: true,
  tableName: "Profile",
})

class Profile extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  profession!: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  balance!: number;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
  })
  type!: PROFILE_TYPES;

  @HasMany(() => Contract, { foreignKey: 'ContractorId', as: 'Contractor' })
  Contractors: Profile

  @HasMany(() => Contract, { foreignKey: 'ClientId', as: 'Client' })
  Clients: Profile
}


// Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
// Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})

export {
  Profile,
};
