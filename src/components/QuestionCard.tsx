import React from "react";
import { AnswerObject } from "../App";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

type Props = {
  question: string;
  answers: string[];
  callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
  useAnswer: AnswerObject;
  questionNbr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callBack,
  useAnswer,
  questionNbr,
  totalQuestions,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callBack(e);
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Question {questionNbr} / {totalQuestions}
        </Typography>
        <Typography variant="body2" component="p" sx={{ marginTop: 2 }}>
          {question}
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 4 }}>
          {answers.map((answer, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Button
                variant={"contained"}
                sx={{ backgroundColor: "primary.main" }}
                fullWidth
                value={answer}
                onClick={handleClick}
                disabled={!!useAnswer}
              >
                {answer}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
