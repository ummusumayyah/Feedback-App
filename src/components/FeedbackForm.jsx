import Card from "./shared/Card";
import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function FeedbackForm() {
  const [title, setTitle] = useState("");
  const { addFeedHandler, editFeedback, updateFeedback } =
    useContext(FeedbackContext);
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);
  const [state, dispatch] = useAuth()

  const isAuthenticated = state.accessToken !== null

  useEffect(() => {
    if (editFeedback.edit === true) {
      setbtnDisabled(false);
      setTitle(editFeedback.item.title);
    }
  }, [editFeedback]);

  const handleTextChange = (e) => {
    if (title === "") {
      setbtnDisabled(true);
      setMessage(null);
    } else if (title !== "" && title.trim().length <= 10) {
      setbtnDisabled(true);
      setMessage("Review must be atleast 10 characters");
    } else {
      setbtnDisabled(false);
      setMessage(null);
    }

    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length > 10) {
      const newFeedBack = {
        title,
        rating,
      };

      if (editFeedback.edit === true) {
        updateFeedback(editFeedback.item._id, newFeedBack);
      } else {
        addFeedHandler(newFeedBack);
      }

      setTitle("");
    }
  };

  const postForm = (<form onSubmit={handleSubmit}>
    <h3>How would you like to rate our service?</h3>
    <RatingSelect select={(rating) => setRating(rating)} />
    <div className="input-group">
      <input
        type="text"
        onChange={handleTextChange}
        value={title}
        placeholder="Write a review"
      />
      <Button type="submit" isDisabled={btnDisabled} version={"tertiary"}>
        Send
      </Button>
      {message && <div className="message">{message}</div>}
    </div>
  </form>
  )
  return (
    <Card>
      {isAuthenticated ? (postForm) : (<div>
        <h3>Please login to leave a feedback</h3>
        <Link to="/login">
        <Button>Login</Button></Link>
      </div>
        )}
    </Card>
  );
}

export default FeedbackForm;
