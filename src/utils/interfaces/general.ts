import { Model } from "sequelize";
import { PROFILE_TYPES } from "../constants/contract";

export interface UserProfile extends Model {
    id: number;
    type: PROFILE_TYPES;
    balance: number;
}