import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import { StepLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'

export interface IStep {
  step: number
  status: 'answered' | 'not_answered'
}

interface IStepperComponentProps {
  steps: Array<IStep>
  onClick: (step: number) => void
}

const useStyles = makeStyles(() => ({
  root: {
    '& .Mui-active': { color: 'green !important' },
    '& .MuiSvgIcon-root': { cursor: 'pointer' },
  },
}))

const StepperComponent: React.FC<IStepperComponentProps> = ({
  steps,
  onClick,
}) => {
  const classes = useStyles()
  return (
    <Stepper className={classes.root} alternativeLabel>
      {steps.map((item: IStep) => {
        return (
          <Step
            key={item.step}
            active={item.status === 'answered'}
            onClick={() => onClick(item.step)}
          >
            <StepLabel />
          </Step>
        )
      })}
    </Stepper>
  )
}

export default StepperComponent
