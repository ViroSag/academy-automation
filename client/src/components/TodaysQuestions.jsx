import React, { useState, useEffect } from "react";
import axios from "axios";
import socket from "./socket";

function TodaysQuestions({ sessionId }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    fetchQuestions(currentDate, false, sessionId);

    const handleNewQuestion = (newQuestion) => {
      setQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
      console.log("New question added");
    };

    socket.on("questionAdded", handleNewQuestion);

    return () => {
      socket.off("questionAdded", handleNewQuestion);
    };
  }, [sessionId]);

  const fetchQuestions = (date, answered, sessionId) => {
    axios
      .get("http://localhost:4000/questions", {
        params: {
          dateasked: date,
          answered: answered,
          sessionref: sessionId,
        },
      })
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };

  const handleStart = (questionId) => {
    const questionToUpdate = questions.find(
      (question) => question._id === questionId
    );

    if (questionToUpdate && !questionToUpdate.answered) {
      questionToUpdate.starttime = new Date().toLocaleTimeString();

      axios
        .put(`http://localhost:4000/questions/update/${questionId}`, {
          starttime: questionToUpdate.starttime,
        })
        .then((response) => {
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question._id === questionId
                ? { ...question, starttime: questionToUpdate.starttime }
                : question
            )
          );
        })
        .catch((error) => {
          console.error("Error starting the question:", error);
        });
    }
  };

  const handleStop = (questionId) => {
    const questionToUpdate = questions.find(
      (question) => question._id === questionId
    );

    if (questionToUpdate && questionToUpdate.answered === false) {
      questionToUpdate.endtime = new Date().toLocaleTimeString();
      questionToUpdate.answered = true;

      axios
        .put(`http://localhost:4000/questions/update/${questionId}`, {
          endtime: questionToUpdate.endtime,
          answered: true,
        })
        .then((response) => {
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question._id === questionId ? questionToUpdate : question
            )
          );
        })
        .catch((error) => {
          console.error("Error stopping the question:", error);
        });
    }
  };

  return (
    <div>
      <h2 className="tableheadings">Questions List</h2>

      {questions.map((question) => (
        <div
          key={question._id}
          className={
            question.answered
              ? "question-container-active"
              : "question-container-paused"
          }
        >
          <strong>Question Topic:</strong> {question.questiontopic}
          <br />
          <strong>Question Statement:</strong> {question.questionstatement}
          <br />
          <strong>Student Reference:</strong> {question.studentref}
          <br />
          <strong>Answered:</strong> {question.answered ? "Yes" : "No"}
          <br />
          <strong>Time Asked:</strong> {question.timeasked}
          <br />
          <button
            disabled={question.answered}
            className="activebuttonadmin"
            onClick={() => handleStart(question._id)}
          >
            Start
          </button>
          <button
            disabled={question.answered}
            className="pausedbuttonadmin"
            onClick={() => handleStop(question._id)}
          >
            Stop
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodaysQuestions;
