import React from 'react'
import { Grid } from '@mui/material'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'
import { Language } from 'utilities/enum/language'
import { QuestionType } from 'utilities/enum/question-type'
import FillInTheBlank from 'components/QuestionType/FillInTheBlanks'
import MultiSelect from 'components/QuestionType/MultiSelect'
import SingleSelect from 'components/QuestionType/SingleSelect'
import CorrectInCorrect from 'components/QuestionType/CorrectIncorrect'

interface IQuestionCardProps {
  questionsData: IQuestionDetail
  preferredLanguage: Language
  handleAnswer: (userAnswer: string | number[]) => void
}

const QuestionCard: React.FC<IQuestionCardProps> = ({
  questionsData,
  preferredLanguage,
  handleAnswer,
}) => {
  return (
    <Grid item xs={12} key={questionsData.id}>
      <b>Question: </b>
      {
        questionsData.languages.find(
          (item) => item.language === preferredLanguage
        ).question
      }
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
          preferredLanguage={preferredLanguage}
          handleAnswer={handleAnswer}
        />
      )}
      {questionsData.questionType === QuestionType.SingleSelect && (
        <SingleSelect
          handleAnswer={handleAnswer}
          questionsData={questionsData}
          preferredLanguage={preferredLanguage}
        />
      )}
      {questionsData.questionType === QuestionType.CorrectIncorrect && (
        <CorrectInCorrect
          handleAnswer={handleAnswer}
          questionsData={questionsData}
          preferredLanguage={preferredLanguage}
        />
      )}
      <br />
    </Grid>
  )
}

export default QuestionCard
