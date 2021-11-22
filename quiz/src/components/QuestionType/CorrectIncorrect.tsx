import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Radio } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'
import { Language } from 'utilities/enum/language'

interface ICorrectIncorrectProps {
  handleAnswer: (userAnswer: string | number[]) => void
  questionsData: IQuestionDetail
  preferredLanguage: Language
}

const CorrectInCorrect: React.FC<ICorrectIncorrectProps> = ({
  handleAnswer,
  preferredLanguage,
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
        {questionsData.languages[preferredLanguage].answerOptions.map(
          (option) => (
            <FormControlLabel
              control={<Radio />}
              label={option.description}
              value={option.id}
              key={option.id}
            />
          )
        )}
      </RadioGroup>
    </FormGroup>
  )
}

export default CorrectInCorrect
