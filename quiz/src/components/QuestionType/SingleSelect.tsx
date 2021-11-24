import React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Radio } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import { IQuestionAnswerDetail } from 'utilities/interfaces/question-answer-detail'

interface ISingleSelectProps {
  handleAnswer: (userAnswer: string | number[]) => void
  questionsData: IQuestionAnswerDetail
}

const SingleSelect: React.FC<ISingleSelectProps> = ({
  handleAnswer,
  questionsData,
}) => {
  const singleSelectHandler = (value: string) => {
    handleAnswer([Number(value)])
  }

  return (
    <FormGroup>
      <RadioGroup
        aria-label="single-select-answer"
        name="answer-buttons-group"
        onChange={(e) => singleSelectHandler(e.target.value)}
        defaultValue={
          (questionsData.userAnswer as Array<number>)
            ? questionsData.userAnswer[0]
            : 0
        }
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

export default SingleSelect
