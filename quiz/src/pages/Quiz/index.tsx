import StepperComponent from 'components/Stepper'
import steps from 'mocks/stepper'

const Quiz: React.FC = () => {
  return <StepperComponent steps={steps} onClick={(e) => console.log(e)} />
}

export default Quiz
