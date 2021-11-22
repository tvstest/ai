import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IQuestionAnswerDetail } from 'utilities/interfaces/question-answer-detail'

interface IMultiSelectProps {
  handleAnswer: (userAnswer: string | number[]) => void
  questionsData: IQuestionAnswerDetail
}

const MultiSelect: React.FC<IMultiSelectProps> = ({
  handleAnswer,
  questionsData,
}) => {
  const [answers, setAnswer] = useState<number[]>(
    (questionsData.userAnswer as Array<number>) ?? []
  )

  const multiSelectHandler = (id: number, checked: boolean) => {
    let newAnswer
    if (checked) {
      newAnswer = [...answers, id]
      setAnswer(newAnswer)
    } else {
      newAnswer = [...answers]
      newAnswer.splice(
        newAnswer.findIndex((e) => e === id),
        1
      )
      setAnswer(newAnswer)
    }
    handleAnswer(newAnswer)
  }

  return (
    <FormGroup>
      {questionsData.answerOptions.map((option) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e, checked) => multiSelectHandler(option.id, checked)}
              checked={answers.includes(option.id)}
            />
          }
          label={option.description}
        />
      ))}
    </FormGroup>
  )
}

export default MultiSelect
