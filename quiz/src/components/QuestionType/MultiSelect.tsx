import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'
import { Language } from 'utilities/enum/language'

interface IMultiSelectProps {
  handleAnswer: (userAnswer: string | number[]) => void
  questionsData: IQuestionDetail
  preferredLanguage: Language
}

const MultiSelect: React.FC<IMultiSelectProps> = ({
  handleAnswer,
  preferredLanguage,
  questionsData,
}) => {
  const [answers, setAnswer] = useState<number[]>(
    (questionsData.userAnswer as Array<number>) ?? []
  )

  const multiSelectHandler = (id: number, checked: boolean) => {
    let newAnswer
    if (checked) {
      newAnswer = [...answers, id]
      newAnswer.sort((a, b) => a - b)
      setAnswer(newAnswer)
    } else {
      newAnswer = [...answers]
      newAnswer.splice(
        newAnswer.findIndex((e) => e === id),
        1
      )
      newAnswer.sort((a, b) => a - b)
      setAnswer(newAnswer)
    }
    handleAnswer(newAnswer)
  }

  return (
    <FormGroup>
      {questionsData.languages[preferredLanguage].answerOptions.map(
        (option) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e, checked) =>
                  multiSelectHandler(option.id, checked)
                }
                checked={answers.includes(option.id)}
              />
            }
            label={option.description}
            key={option.id}
          />
        )
      )}
    </FormGroup>
  )
}

export default MultiSelect
