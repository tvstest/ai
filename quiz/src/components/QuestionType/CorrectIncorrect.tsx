import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Radio } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import { IQuestionAnswerDetail } from 'utilities/interfaces/question-answer-detail'

interface ICorrectIncorrectProps {
  handleAnswer: (userAnswer: string | number[]) => void
  questionsData: IQuestionAnswerDetail
}

const CorrectInCorrect: React.FC<ICorrectIncorrectProps> = ({
  handleAnswer,
  questionsData,
}) => {
  const [checked, setChecked] = useState([])

  const singleSelectHandler = (value: string) => {
    setChecked([value])
    handleAnswer([Number(value)])
  }

  return (
    <FormGroup>
      <RadioGroup
        aria-label="correct-incorrect-answer"
        name="answer-buttons-group"
        onChange={(e) => singleSelectHandler(e.target.value)}
        value={checked && checked.length > 0 ? checked[0] : null}
      >
        {questionsData.answerOptions.map((option) => (
          <FormControlLabel
            control={<Radio />}
            label={option.description}
            value={option.id}
            key={option.id}
          />
        ))}
      </RadioGroup>
    </FormGroup>
  )
}

export default CorrectInCorrect
