import React, { useEffect, useState } from "react";
import axios from "axios";

function QuestionsList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const url = "http://localhost:4000/questions";

    axios
      .get(url)
      .then((response) => {
        const questionDocuments = response.data;

        questionDocuments.sort((a, b) => a.timeasked - b.timeasked);

        setQuestions(questionDocuments);
      })
      .catch((error) => {
        console.error("Error fetching question data:", error);
      });
  }, []);

  return (
    <div className="generalpage">
      <h2>Questions List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Session Subject</th>
            <th>Question Statement</th>
            <th>Question Topic</th>
            <th>Answered</th>
            <th>Student ID</th>
            <th>Time Asked</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question.subject}</td>
              <td>{question.questionstatement}</td>
              <td>{question.questiontopic}</td>
              <td>{question.answered ? "Yes" : "No"}</td>
              <td>{question.studentref}</td>
              <td>{question.timeasked}</td>
              <td>{question.starttime}</td>
              <td>{question.endtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionsList;
