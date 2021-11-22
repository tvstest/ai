import React from 'react'
import { Grid, Radio } from '@mui/material'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'
import { Language } from 'utilities/enum/language'
import { QuestionType } from 'utilities/enum/question-type'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'

interface IQuestionCardProps {
  questionsData: IQuestionDetail
  preferredLanguage: Language
  onFillInBlankHandler: (value: string) => void
  fillInBlank: string
  multiSelectHandler: (id: number, checked: boolean) => void
  singleSelectHandler: (value: string) => void
}

const QuestionCard: React.FC<IQuestionCardProps> = ({
  questionsData,
  preferredLanguage,
  onFillInBlankHandler,
  fillInBlank,
  multiSelectHandler,
  singleSelectHandler,
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
        <TextField
          required
          id="outlined-required"
          value={fillInBlank}
          onChange={(e) => onFillInBlankHandler(e.target.value)}
          sx={{ width: 220, mt: 2 }}
        />
      )}
      {questionsData.questionType === QuestionType.MultiSelect && (
        <FormGroup key={questionsData.id}>
          {questionsData.languages[preferredLanguage].answerOptions.map(
            (option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e, checked) =>
                      multiSelectHandler(option.id, checked)
                    }
                    checked={
                      questionsData.answer
                        ? questionsData.answer?.includes(option.id)
                        : false
                    }
                  />
                }
                label={option.description}
              />
            )
          )}
        </FormGroup>
      )}
      {questionsData.questionType === QuestionType.SingleSelect && (
        <FormGroup>
          <RadioGroup
            aria-label="single-select-answer"
            name="answer-buttons-group"
            onChange={(e) => singleSelectHandler(e.target.value)}
            value={
              questionsData.answer && questionsData.answer.length > 0
                ? questionsData.answer[0]
                : null
            }
          >
            {questionsData.languages[preferredLanguage].answerOptions.map(
              (option) => (
                <FormControlLabel
                  control={<Radio />}
                  label={option.description}
                  value={option.id}
                />
              )
            )}
          </RadioGroup>
        </FormGroup>
      )}
      {questionsData.questionType === QuestionType.CorrectIncorrect && (
        <FormGroup>
          <RadioGroup
            aria-label="correct-incorrect-answer"
            name="answer-buttons-group"
            onChange={(e) => singleSelectHandler(e.target.value)}
            value={
              questionsData.answer && questionsData.answer.length > 0
                ? questionsData.answer[0]
                : null
            }
          >
            {questionsData.languages[preferredLanguage].answerOptions.map(
              (option) => (
                <FormControlLabel
                  control={<Radio />}
                  label={option.description}
                  value={option.id}
                />
              )
            )}
          </RadioGroup>
        </FormGroup>
      )}
      <br />
    </Grid>
  )
}

export default QuestionCard
