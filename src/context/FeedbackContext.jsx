import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);
  const fetchFeedback = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/feedback`);
      const data = await response.json();
      setFeedback(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

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

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`http://localhost:3000/api/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });
    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item._id === id ? { ...item, ...updItem } : item))
    );
  };

  const addFeedHandler = async (newfeedback) => {
    const response = await fetch(`http://localhost:3000/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newfeedback),
    });
    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure that you want to delete?")) {
      setFeedback(feedback.filter((item) => item._id !== id));
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
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
