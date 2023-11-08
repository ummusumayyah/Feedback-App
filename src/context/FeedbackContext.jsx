import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is coming from the context",
      rating: 10,
    },
    {
      id: 2,
      text: "This is coming from the context 2",
      rating: 8,
    },
    {
      id: 3,
      text: "This is coming from the context 3",
      rating: 9,
    },
    {
      id: 4,
      text: "This is coming from the context 4",
      rating: 10,
    },
  ]);

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
