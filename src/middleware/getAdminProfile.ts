import { NextFunction, Response } from "express";
import { IRequest } from "../utils/interfaces/http.types";
import { Profile } from "../models/profile";

export const getAdminProfile = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const profile = await Profile.findOne({
    where: { id: req.get("profile_id") || 0 },
  });
  if (!profile) return res.status(401).end();
  req.profile = profile;
  return next();
};
