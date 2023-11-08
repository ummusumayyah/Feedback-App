import FeedbackContext from "../context/FeedbackContext";
import FeedbackItem from "./FeedbackItem";
import { useContext } from "react";


function FeedbackList({ handleDelete }) {
    const {feedback} = useContext(FeedbackContext)
  if (!feedback || feedback.length === 0) {
    return <p className="nofeed">No feedback yet</p>;
  }
  return (
    <div>
      {feedback.map((item) => (
        <FeedbackItem
          key={item.id}
          feedbody={item}
          deleteFeedback={handleDelete}
        />
      ))}
    </div>
  );
}

export default FeedbackList;
