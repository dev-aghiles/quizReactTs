import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestion, difficulty, QuestionState } from "./Api";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  CardContent,
  Card,
} from "@mui/material";
const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [element, setElement] = useState<CSSStyleDeclaration>();

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestion = await fetchQuizQuestion(10, difficulty.EASY);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    setElement(e.currentTarget.style);
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      correct && setScore((prev) => prev + 1);
      correct
        ? (e.currentTarget.style.backgroundColor = "green")
        : (e.currentTarget.style.backgroundColor = "red");
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    if (element) {
      element.removeProperty("background-color");
    }
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber((prev) => prev + 1);
    }
  };
  fetchQuizQuestion(TOTAL_QUESTIONS, difficulty.EASY);
  return (
    <Card sx={{ maxWidth: 600, margin: "50px auto" }}>
      <CardContent>
        <Typography variant="h5" color="text.primary" align="center">
          React Quiz
        </Typography>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              className="start"
              onClick={startTrivia}
            >
              <Typography variant="body2" color="text.primary">
                Start
              </Typography>
            </Button>
          </Box>
        ) : null}
        {!gameOver && (
          <Typography variant="body1" color="text.primary" align="center">
            Score: {score}
          </Typography>
        )}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && !gameOver && (
          <QuestionCard
            questionNbr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number]?.question}
            answers={questions[number]?.answers}
            useAnswer={userAnswers && userAnswers[number]}
            callBack={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                className="next"
                onClick={nextQuestion}
              >
                <Typography variant="body2" color="text.primary">
                  Next Question
                </Typography>
              </Button>
            </Box>
          )}
      </CardContent>
    </Card>
  );
};

export default App;
