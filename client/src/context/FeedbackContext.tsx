import { createContext, useContext, useState, ReactNode } from "react";
import { IFeedback } from "../interfaces/error.interface";
import { FeedbackType } from "../utils/contstants/general";

interface FeedbackContextType {
  feedbacks: IFeedback[];
  addError: (message: string, visibilityDuration?: number) => void;
  addSuccess: (message: string, visibilityDuration?: number) => void;
  addWarning: (message: string, visibilityDuration?: number) => void;
  removeFeedback: (id: string) => void;
}

const ErrorContext = createContext<FeedbackContextType | undefined>(undefined);

export function useFeedback() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useFeedback must be used within an ErrorProvider");
  }
  return context;
}

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

  const removeFeedback = (id: string) => {
    setFeedbacks((prev) => prev.filter((error) => error.id !== id));
  };

  const addFeedback = (
    message: string,
    type = FeedbackType.ERROR,
    visibilityDuration: number
  ) => {
    const id = String(Math.random());
    setFeedbacks((prev) => [
      ...prev,
      { id, message, type, visibilityDuration },
    ]);
    setTimeout(() => {
      removeFeedback(id);
    }, visibilityDuration);
  };

  const addError = (message: string, visibilityDuration = 6000) => {
    addFeedback(message, FeedbackType.ERROR, visibilityDuration);
  };

  const addSuccess = (message: string, visibilityDuration = 6000) => {
    addFeedback(message, FeedbackType.SUCCESS, visibilityDuration);
  };

  const addWarning = (message: string, visibilityDuration = 6000) => {
    addFeedback(message, FeedbackType.WARNING, visibilityDuration);
  };

  const contextValue: FeedbackContextType = {
    feedbacks,
    addError,
    addSuccess,
    addWarning,
    removeFeedback,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}
