import { FeedbackType } from "../utils/contstants/general";

export interface IFeedback {
    message: string,
    id: string,
    visibilityDuration: number,
    type: FeedbackType
}