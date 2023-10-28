import "./feedback.css"; //
import { useFeedback } from "../../context/FeedbackContext";

export const ErrorComponent = () => {
  const { feedbacks, removeFeedback } = useFeedback();

  return (
    <div>
      {feedbacks.length > 0 && (
        <div className="feedback-container">
          <ul className="feedbacksList">
            {feedbacks.map((error, index) => (
              <li className={`error fb${error.type}`} key={error.id}>
                <span>{error.message}</span>
                <button
                  className="close-button"
                  onClick={() => removeFeedback(error.id)}
                >
                  <span className="close-icon">×</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ErrorComponent;
