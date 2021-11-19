import { Button } from '@mui/material'
import { useState } from 'react'
import { DEFAULT_QUESTION_INDEX } from 'utilities/constants'
import { Language } from 'utilities/enum/language'
import { questionsData } from '__mock__'
import steps from '__mock__/stepper'
import StepperComponent from 'components/Stepper'

const Quiz: React.FC = () => {
  const [questions] = useState(questionsData)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(
    DEFAULT_QUESTION_INDEX
  )
  const [preferredLanguage] = useState(Language.English)
  const [username] = useState('Aakash')

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

  const handleSubmit = () => {
    alert('thanks for submitting quiz')
  }

  return (
    <>
      Hello {username}
      <br />
      <StepperComponent steps={steps} onClick={(e) => console.log(e)} />
      <br />
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
      <br /> <br /> <br />
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
    </>
  )
}

export default Quiz
