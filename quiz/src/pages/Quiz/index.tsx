import { Button, Grid } from '@mui/material'
import { useState } from 'react'
import { DEFAULT_QUESTION_INDEX } from 'utilities/constants'
import { Language } from 'utilities/enum/language'
import { questionsData } from '__mock__'
import StepperComponent, { IStep } from 'components/Stepper'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'

const Quiz: React.FC = () => {
  const [questions] = useState<IQuestionDetail[]>(questionsData)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(
    DEFAULT_QUESTION_INDEX
  )
  const [preferredLanguage] = useState(Language.English)
  const [username] = useState('Aakash')
  const getDefaultSteps = (data: IQuestionDetail[]): IStep[] => {
    return data.map((question, index) => {
      return { step: index + 1, status: 'not_answered' }
    })
  }

  const [steps] = useState(getDefaultSteps(questionsData))

  const handleBackClick = () => {
    if (activeQuestionIndex !== DEFAULT_QUESTION_INDEX) {
      setActiveQuestionIndex((index) => index - 1)
    }
  }

  const handleNextClick = () => {
    if (activeQuestionIndex !== questionsData.length - 1) {
      setActiveQuestionIndex((index) => index + 1)
    }
  }

  const handleQuestionClick = (questionNumber: number) => {
    setActiveQuestionIndex(questionNumber - 1)
  }

  const handleSubmit = () => {
    alert('thanks for submitting quiz')
  }

  return (
    <>
      Hello {username}
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <br />
          <StepperComponent steps={steps} onClick={handleQuestionClick} />
          <br />
        </Grid>
        <Grid item xs={12}>
          <b>Question: </b>
          {
            questions[activeQuestionIndex].languages.find(
              (item) => item.language === preferredLanguage
            ).question
          }
          <br />
          {questions[activeQuestionIndex].languages
            .find((item) => item.language === Language.English)
            .answerOptions.map((answerOption, index) => (
              <>
                <br />
                <b>Option {index + 1}</b> {answerOption.description}
              </>
            ))}
          <br />
        </Grid>
        <Grid item xs={12}>
          {activeQuestionIndex !== DEFAULT_QUESTION_INDEX && (
            <Button color="inherit" onClick={handleBackClick} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeQuestionIndex !== questionsData.length - 1 && (
            <Button color="inherit" onClick={handleNextClick} sx={{ mr: 1 }}>
              Next
            </Button>
          )}
          {activeQuestionIndex === questionsData.length - 1 && (
            <Button color="inherit" onClick={handleSubmit} sx={{ mr: 1 }}>
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Quiz
