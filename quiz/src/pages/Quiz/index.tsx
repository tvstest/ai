import { Button, Grid, Alert } from '@mui/material'
import { useState } from 'react'
import { DEFAULT_QUESTION_INDEX } from 'utilities/constants'
import { Language } from 'utilities/enum/language'
import { questionsData } from '__mock__'
import StepperComponent, { IStep } from 'components/QuestionStepper'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'
import { useLocation } from 'react-router-dom'
import QuestionCard from 'components/QuestionCard'

const Quiz: React.FC = () => {
  const [questions] = useState<IQuestionDetail[]>(questionsData)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(
    DEFAULT_QUESTION_INDEX
  )
  const [userAttemptedQuestions] = useState([])

  const [preferredLanguage] = useState(Language.English)
  const { state }: any = useLocation()
  console.log(state)
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

  const handleAnswer = (userAnswer: string | number[]) => {
    console.log(userAttemptedQuestions)
    const currentQuestion = questionsData[activeQuestionIndex]

    const existingUserAttemptedQuestion = userAttemptedQuestions.find(
      (q) => q.id === activeQuestionIndex + 1
    )
    if (existingUserAttemptedQuestion) {
      userAttemptedQuestions.find(
        (q) => q.id === activeQuestionIndex + 1
      ).userAnswer = userAnswer
    } else {
      userAttemptedQuestions.push({
        questionId: currentQuestion.id,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer,
      })
    }
  }

  return (
    <>
      <Alert icon={false} severity="success">
        Hi {state?.name}
      </Alert>
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
          handleAnswer={handleAnswer}
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
