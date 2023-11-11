import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);

  const [editFeedback, setEditFeedback] = useState({
    item: {},
    edit: false,
  });

  const feedbackEdit = (item) => {
    setEditFeedback({
      item,
      edit: true,
    });
  };

  const updateFeedback = (id, updItem) =>{
    setFeedback(
        feedback.map((item)=>(item.id === id ? {...item, ...updItem}: item))
    )
  }

  const addFeedHandler = (newfeedback) => {
    newfeedback.id = uuidv4();
    setFeedback([newfeedback, ...feedback]);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure that you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        addFeedHandler,
        deleteHandler,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
