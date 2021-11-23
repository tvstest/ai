import React from 'react'
import { Grid } from '@mui/material'
import { QuestionType } from 'utilities/enum/question-type'
import FillInTheBlank from 'components/QuestionType/FillInTheBlanks'
import MultiSelect from 'components/QuestionType/MultiSelect'
import SingleSelect from 'components/QuestionType/SingleSelect'
import CorrectInCorrect from 'components/QuestionType/CorrectIncorrect'
import { IQuestionAnswerDetail } from 'utilities/interfaces/question-answer-detail'

interface IQuestionCardProps {
  questionData: IQuestionAnswerDetail
  handleAnswer: (userAnswer: string | number[]) => void
}

const QuestionCard: React.FC<IQuestionCardProps> = ({
  questionData: questionsData,
  handleAnswer,
}) => {
  return (
    <Grid item xs={12} key={questionsData.id}>
      <b>Question: </b>
      {questionsData.question}
      <br />
      {questionsData.questionType === QuestionType.FillInTheBlanks && (
        <FillInTheBlank
          handleAnswer={handleAnswer}
          userAnswer={questionsData.userAnswer}
        />
      )}
      {questionsData.questionType === QuestionType.MultiSelect && (
        <MultiSelect
          questionsData={questionsData}
          handleAnswer={handleAnswer}
        />
      )}
      {questionsData.questionType === QuestionType.SingleSelect && (
        <SingleSelect
          handleAnswer={handleAnswer}
          questionsData={questionsData}
        />
      )}
      {questionsData.questionType === QuestionType.CorrectIncorrect && (
        <CorrectInCorrect
          handleAnswer={handleAnswer}
          questionsData={questionsData}
        />
      )}
      <br />
    </Grid>
  )
}

export default QuestionCard
