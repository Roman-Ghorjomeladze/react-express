import { Profile } from "../models";
export const findById = async (profileId: number): Promise<Profile | null> => {
    return await Profile.findOne({
        where: {id: profileId},
    })
}