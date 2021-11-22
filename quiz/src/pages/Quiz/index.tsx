import { Button, Grid } from '@mui/material'
import { useState } from 'react'
import { DEFAULT_QUESTION_INDEX } from 'utilities/constants'
import { Language } from 'utilities/enum/language'
import { questionsData } from '__mock__'
import StepperComponent, { IStep } from 'components/Stepper'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'
import QuestionCard from 'components/QuestionCard'

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
  const [fillInBlank, setFillInBlank] = useState('')

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

  const multiSelectHandler = (id: number, checked: boolean) => {
    // we have to maintain answers from here
    console.log('selected-or-unselect', id, checked)
  }

  const singleSelectHandler = (value: string) => {
    // we have to maintain single select answer from here
    console.log('value', value)
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
        <QuestionCard
          questionsData={questions[activeQuestionIndex]}
          preferredLanguage={preferredLanguage}
          fillInBlank={fillInBlank}
          onFillInBlankHandler={setFillInBlank}
          multiSelectHandler={multiSelectHandler}
          singleSelectHandler={singleSelectHandler}
        />
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
