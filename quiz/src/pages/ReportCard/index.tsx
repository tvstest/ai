import { Chip, Divider, Grid } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { IAnswerOption } from 'utilities/interfaces/answer-option'
import { IRegistrationHistoryState } from 'utilities/interfaces/registration-state'

const ReportCard: React.FC = () => {
  const {
    state: { questionAnswers },
  } = useLocation<IRegistrationHistoryState>()
  const getAnswerList = (
    correctAnswer: string | number[],
    answerOptions: IAnswerOption[]
  ) => {
    if (Array.isArray(correctAnswer)) {
      const data = correctAnswer.map((correct) =>
        answerOptions.find((ans) => ans.id === correct)
      )
      return data
        .map((elem) => {
          return elem.description
        })
        .join(', ')
    }
    return correctAnswer
  }

  const answerIdentify = (
    correctAnswer: string | number[],
    userAnswer: string | number[]
  ) => {
    if (Array.isArray(correctAnswer) && Array.isArray(userAnswer)) {
      return (
        correctAnswer.every((ai) => userAnswer.includes(ai)) &&
        correctAnswer.length === userAnswer.length
      )
    }
    return correctAnswer === userAnswer
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      style={{ minHeight: '100vh', paddingLeft: 20 }}
    >
      {questionAnswers.map((item, questionIndex) => {
        return (
          <>
            <Grid item xs={12} key={item.id} mt={5}>
              <b>Question {questionIndex + 1}) </b>
              {item.question}
              <br />
              {item.answerOptions.map((option, index) => (
                <p key={option.id}>{`${index + 1}) ${option.description}`}</p>
              ))}
              <p>
                <b>Correct Answer:</b>{' '}
                {getAnswerList(item.correctAnswer, item.answerOptions)}
              </p>
              <p>
                <b>Submitted Answer:</b>{' '}
                {getAnswerList(item.userAnswer, item.answerOptions)}
                <Chip
                  label={
                    answerIdentify(item.correctAnswer, item.userAnswer)
                      ? 'Correct'
                      : 'Incorrect'
                  }
                  style={{ marginLeft: 10 }}
                />
              </p>
            </Grid>
            <Divider light />
          </>
        )
      })}
    </Grid>
  )
}

export default ReportCard
