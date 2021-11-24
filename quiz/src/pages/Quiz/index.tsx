import { Button, Grid, Alert } from '@mui/material'
import { useState } from 'react'
import { DEFAULT_QUESTION_INDEX } from 'utilities/constants'
import { questionsData } from '__mock__'
import StepperComponent from 'components/QuestionStepper'
import { useHistory, useLocation } from 'react-router-dom'
import QuestionCard from 'components/QuestionCard'
import { QuestionAttemptType } from 'utilities/enum/question-attempt-type'
import { IQuestionAnswerDetail } from 'utilities/interfaces/question-answer-detail'
import { IRegistrationHistoryState } from 'utilities/interfaces/registration-state'
import { AppRoutings } from 'utilities/enum/app-routings'
import { IReportCardState } from 'utilities/interfaces/report-card-state'

const Quiz: React.FC = () => {
  const {
    state: { name, language },
  } = useLocation<IRegistrationHistoryState>()
  const history = useHistory()

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
    const req: IReportCardState = {
      questionAnswers,
    }
    history.push({
      pathname: AppRoutings.Report,
      state: req,
    })
  }

  const handleAnswer = (userAnswer: string | number[]) => {
    setQuestionAnswers((qa) => {
      const currentQuestion = qa.find((q) => q.id === activeQuestionIndex + 1)
      currentQuestion.userAnswer = userAnswer
      currentQuestion.status = QuestionAttemptType.Answered
      return [...qa]
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
          <StepperComponent
            steps={questionAnswers.map((q) => {
              return { step: q.id, status: q.status }
            })}
            onClick={handleQuestionClick}
          />
          <br />
        </Grid>
        <QuestionCard
          questionData={questionAnswers[activeQuestionIndex]}
          handleAnswer={handleAnswer}
        />
        <Grid item xs={12}>
          {activeQuestionIndex !== DEFAULT_QUESTION_INDEX && (
            <Button variant="outlined" onClick={handleBackClick} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeQuestionIndex !== questionAnswers.length - 1 && (
            <Button variant="outlined" onClick={handleNextClick} sx={{ mr: 1 }}>
              Next
            </Button>
          )}
          {activeQuestionIndex === questionAnswers.length - 1 && (
            <Button variant="outlined" onClick={handleSubmit} sx={{ mr: 1 }}>
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Quiz
