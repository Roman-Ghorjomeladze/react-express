import { FeedbackType } from "../utils/types/general";

export interface IFeedback {
    message: string,
    id: string,
    visibilityDuration: number,
    type: FeedbackType
}