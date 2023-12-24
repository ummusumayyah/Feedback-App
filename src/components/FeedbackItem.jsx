import Card from "./shared/Card";
import { BsX, BsPencilSquare } from "react-icons/bs";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackItem({ feedbody }) {
  const { deleteHandler, feedbackEdit } = useContext(FeedbackContext);
  return (
    <Card>
      <div className="num-display">{feedbody.rating}</div>
      <button onClick={() => deleteHandler(feedbody._id)} className="close">
        <BsX />
      </button>
      <button onClick={() => feedbackEdit(feedbody)} className="edit">
        <BsPencilSquare />
      </button>
      <div className="text-display">{feedbody.title}</div>
    </Card>
  );
}

export default FeedbackItem;
