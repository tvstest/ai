import './App.css'
import Stepper, { IStep } from './components/Stepper'

const steps: IStep[] = [
  {
    step: 1,
    status: 'answered',
  },
  {
    step: 2,
    status: 'not_answered',
  },
  {
    step: 3,
    status: 'not_answered',
  },
  {
    step: 4,
    status: 'answered',
  },
  {
    step: 5,
    status: 'answered',
  },
]

function App() {
  return (
    <div className="App" style={{ marginTop: 10 }}>
      <Stepper steps={steps} onClick={(e) => console.log(e)} />
    </div>
  )
}

export default App
