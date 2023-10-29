import { Model } from "sequelize";
import { PROFILE_TYPES } from "../constants/contract";
import { Profile } from "../../models";

export interface UserProfile extends Model {
    id: number;
    type: PROFILE_TYPES;
    balance: number;
}