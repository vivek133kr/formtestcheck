import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import QuestionQuizCard from "./QiestionQuizCard";
import { useRouter } from "next/router";

const BASE_URL = "http://34.93.138.253/api/v1/quiz/";

const fetchAPI = (url, settings) => 
  fetch(url, settings)
    .then((response) => response.json())
    .catch((error) => {
      alert("Failed to fetch questions. Please try again." + error);
    });

function QuizComponent({ studentId }) {
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const settings = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetchAPI(`${BASE_URL}question?student_id=${studentId}`, settings)
      .then((response) => {
        const sortedQuestions = response.map((question) => {
          const sortedChoices = question.choices.sort(
            (a, b) => a.sort_order - b.sort_order
          );
          return { ...question, choices: sortedChoices };
        });

        setQuestions(sortedQuestions);
        setAnswers(new Array(sortedQuestions.length).fill(null));
      });
  }, [studentId]);

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedAnswer(answers[index]);
  }

  const handleNextQuestion = () => {
    navigateToQuestion(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    navigateToQuestion(currentQuestionIndex - 1);
  };

  const handleAnswerSelection = (event) => {
    const answerId = parseInt(event.target.value);
    setSelectedAnswer(answerId);
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = answerId;
      return updatedAnswers;
    });
  };

  const saveQuiz = () => {
    if (window.confirm("Are you sure you want to submit the quiz?")) {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          answers: questions.map((question, index) => ({
            question_id: question.id,
            choice_id: answers[index] || null,
          })),
        }),
      };

      fetchAPI(`${BASE_URL}answer`, settings)
        .then(() => {
          setAnswers([]);
          router.push({
            pathname: `/scholarships/demo`,
            query: { studentId: studentId },
          });
        });
    }
  };

  return (
    <React.Fragment>
      <header></header>
      <section>
        <div className="container border-b-2 py-2">
          <h3 className="text-start">Editorial Quiz (April 2023)</h3>
        </div>
        <div className="container">
          <ProgressBar width={((currentQuestionIndex+1) / questions.length) * 100} />
          <QuestionQuizCard
            currentQuestion={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswer}
            handleAnswerSelection={handleAnswerSelection}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
            saveQuiz={saveQuiz}
            questionNumber={currentQuestionIndex + 1}
            questions={questions}
          />
        </div>
      </section>
    </React.Fragment>
  );
}

export default QuizComponent;
