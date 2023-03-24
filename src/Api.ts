import axios from "axios";
import { shuffleArray } from "./Utils";
export const enum difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestion = async (
  amount: number,
  difficulty: difficulty
): Promise<QuestionState[]> => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = axios.get(endPoint);
    const datas = (await response).data.results;

    return datas.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (error) {
    throw error;
  }
};
