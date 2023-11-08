import Card from "./shared/Card";
import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const { addFeedHandler, editFeedback, updateFeedback } = useContext(FeedbackContext);
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);

  useEffect(() => {
    if(editFeedback.edit === true){
        setbtnDisabled(false)
        setText(editFeedback.item.text)
    }

  }, [editFeedback])


  const handleTextChange = (e) => {
    if (text === "") {
      setbtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setbtnDisabled(true);
      setMessage("Review must be atleast 10 characters");
    } else {
      setbtnDisabled(false);
      setMessage(null);
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedBack = {
        text,
        rating,
      };

      if (editFeedback.edit === true){
        updateFeedback(editFeedback.item.id, newFeedBack)
      } else{
        addFeedHandler(newFeedBack);
      }
      

      setText("");
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h3>How would you like to rate our service?</h3>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            onChange={handleTextChange}
            value={text}
            placeholder="Write a review"
          />
          <Button type="submit" isDisabled={btnDisabled} version={"tertiary"}>
            Send
          </Button>
          {message && <div className="message">{message}</div>}
        </div>
      </form>
    </Card>
  );
}

export default FeedbackForm;
