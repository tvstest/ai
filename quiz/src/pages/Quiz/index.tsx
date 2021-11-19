import StepperComponent from 'components/Stepper'
import { useState } from 'react'
import { DEFAULT_QUESTION_INDEX } from 'utilities/constants'
import { Language } from 'utilities/enum/language'
import { questionsData } from '__mock__'
import steps from '__mock__/stepper'

const Quiz: React.FC = () => {
  const [questions] = useState(questionsData)
  const [currentQuestionIndex] = useState(DEFAULT_QUESTION_INDEX)
  const [preferredLanguage] = useState(Language.English)
  const [username] = useState('Aakash')

  return (
    <>
      Hello {username}
      <br />
      <StepperComponent steps={steps} onClick={(e) => console.log(e)} />
      <br />
      <b>Question: </b>
      {
        questions[currentQuestionIndex].languages.find(
          (item) => item.language === preferredLanguage
        ).question
      }
      <br />
      {questions[currentQuestionIndex].languages
        .find((item) => item.language === Language.English)
        .answerOptions.map((answerOption, index) => (
          <>
            <br />
            <b>Option {index + 1}</b> {answerOption.description}
          </>
        ))}
    </>
  )
}

export default Quiz
