import "./feedback.css"; //
import { useFeedback } from "../../context/FeedbackContext";
import { createPortal } from "react-dom";

export const ErrorComponent = () => {
  const { feedbacks, removeFeedback } = useFeedback();
  
  const content = (
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
  const container = document.getElementById('portal');
  return container ? createPortal(content, container) : null;
};

export default ErrorComponent;
