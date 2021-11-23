import { Button, Grid, Alert } from '@mui/material'
import { useState } from 'react'
import { DEFAULT_QUESTION_INDEX } from 'utilities/constants'
import { questionsData } from '__mock__'
import StepperComponent, { IStep } from 'components/QuestionStepper'
import { IQuestionDetail } from 'utilities/interfaces/question-detail'
import { useLocation } from 'react-router-dom'
import QuestionCard from 'components/QuestionCard'
import { QuestionAttemptType } from 'utilities/enum/question-attempt-type'
import { IQuestionAnswerDetail } from 'utilities/interfaces/question-answer-detail'
import { IRegistrationHistoryState } from 'utilities/interfaces/registration-state'

const Quiz: React.FC = () => {
  const {
    state: { name, language },
  } = useLocation<IRegistrationHistoryState>()

  const getLanguageSpecificQuestions = (): IQuestionAnswerDetail[] => {
    return questionsData.map((q) => {
      const { question, answerOptions } = q.languages.find(
        (l) => l.language === language
      )
      return {
        id: q.id,
        questionType: q.questionType,
        correctAnswer: q.correctAnswer,
        status: QuestionAttemptType.NotAnswered,
        question,
        answerOptions,
      }
    })
  }
  const [questionAnswers, setQuestionAnswers] = useState<
    IQuestionAnswerDetail[]
  >(getLanguageSpecificQuestions())

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(
    DEFAULT_QUESTION_INDEX
  )

  const getDefaultSteps = (data: IQuestionDetail[]): IStep[] => {
    return data.map((question, index) => {
      return { step: index + 1, status: QuestionAttemptType.NotAnswered }
    })
  }
  const [steps] = useState(getDefaultSteps(questionsData))

  const handleBackClick = () => {
    if (activeQuestionIndex !== DEFAULT_QUESTION_INDEX) {
      setActiveQuestionIndex((index) => index - 1)
    }
  }

  const handleNextClick = () => {
    if (activeQuestionIndex !== questionAnswers.length - 1) {
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
    setQuestionAnswers((qa) => {
      qa.find((q) => q.id === activeQuestionIndex + 1).userAnswer = userAnswer
      return qa
    })
  }

  return (
    <>
      <Alert icon={false} severity="success">
        Hi {name}
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
          questionData={questionAnswers[activeQuestionIndex]}
          handleAnswer={handleAnswer}
        />
        <Grid item xs={12}>
          {activeQuestionIndex !== DEFAULT_QUESTION_INDEX && (
            <Button color="inherit" onClick={handleBackClick} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeQuestionIndex !== questionAnswers.length - 1 && (
            <Button color="inherit" onClick={handleNextClick} sx={{ mr: 1 }}>
              Next
            </Button>
          )}
          {activeQuestionIndex === questionAnswers.length - 1 && (
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
