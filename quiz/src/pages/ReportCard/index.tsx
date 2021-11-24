/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { Chip, Divider, Grid } from '@mui/material'
import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { PieChart, Pie, Cell } from 'recharts'
import { COLORS, RADIAN } from 'utilities/constants'
import {
  QuestionColor,
  QuestionCorrection,
} from 'utilities/enum/question-attempt-type'
import { IAnswerOption } from 'utilities/interfaces/answer-option'
import { IRegistrationHistoryState } from 'utilities/interfaces/registration-state'

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

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
    if (!userAnswer) {
      return {
        label: QuestionCorrection.NotAnswered,
        color: QuestionColor.WARNING,
      }
    }
    if (Array.isArray(correctAnswer) && Array.isArray(userAnswer)) {
      if (
        correctAnswer.every((ai) => userAnswer.includes(ai)) &&
        correctAnswer.length === userAnswer.length
      ) {
        return {
          label: QuestionCorrection.Correct,
          color: QuestionColor.SUCCESS,
        }
      }
      return { label: QuestionCorrection.Incorrect, color: QuestionColor.ERROR }
    }
    if (
      String(correctAnswer).toLowerCase() === String(userAnswer).toLowerCase()
    ) {
      return { label: QuestionCorrection.Correct, color: QuestionColor.SUCCESS }
    }
    return { label: QuestionCorrection.Incorrect, color: QuestionColor.ERROR }
  }

  const datas = useMemo(() => {
    let correct = 0
    let inCorrect = 0
    let notAnswered = 0
    questionAnswers.forEach((ques) => {
      const result = answerIdentify(ques.correctAnswer, ques.userAnswer).label
      switch (result) {
        case QuestionCorrection.NotAnswered:
          notAnswered += 1
          break
        case QuestionCorrection.Correct:
          correct += 1
          break
        case QuestionCorrection.Incorrect:
          inCorrect += 1
          break
        default:
          break
      }
    })
    return [
      { name: QuestionCorrection.Correct, value: correct },
      { name: QuestionCorrection.Incorrect, value: inCorrect },
      { name: QuestionCorrection.NotAnswered, value: notAnswered },
    ]
  }, [questionAnswers])

  return (
    <div>
      <PieChart width={200} height={200}>
        <Pie
          data={datas}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {datas.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <Chip
        label={QuestionCorrection.Correct}
        color={QuestionColor.SUCCESS}
        sx={{ ml: 1 }}
      />
      <Chip
        label={QuestionCorrection.Incorrect}
        color={QuestionColor.ERROR}
        sx={{ ml: 1 }}
      />
      <Chip
        label={QuestionCorrection.NotAnswered}
        color={QuestionColor.WARNING}
        sx={{ ml: 1 }}
      />
      <Divider light sx={{ mt: 2 }} />
      <Grid
        container
        spacing={1}
        direction="column"
        style={{ minHeight: '100vh', paddingLeft: 20 }}
      >
        {questionAnswers.map((item, questionIndex) => {
          return (
            <Grid data-testid="grid-item" item xs={12} key={item.id} mt={4}>
              <b>Question {questionIndex + 1}) </b>
              {item.question}
              <br />
              {item.answerOptions.map((option, index) => (
                <p key={option.id}>{`${index + 1}) ${option.description}`}</p>
              ))}
              <div>
                <b>Correct Answer:</b>{' '}
                {getAnswerList(item.correctAnswer, item.answerOptions)}
              </div>
              <br />
              <div>
                <b>Submitted Answer:</b>{' '}
                {getAnswerList(item.userAnswer, item.answerOptions)}
                <Chip
                  label={
                    answerIdentify(item.correctAnswer, item.userAnswer).label
                  }
                  style={{ marginLeft: 10 }}
                  color={
                    answerIdentify(item.correctAnswer, item.userAnswer).color
                  }
                />
              </div>
              <br />
              <Divider light />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default ReportCard
