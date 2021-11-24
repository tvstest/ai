import React from 'react'
import TextField from '@mui/material/TextField'

interface IFillInTheBlankProps {
  handleAnswer: (userAnswer: string | number[]) => void
  userAnswer: string | number[]
}

const FillInTheBlank: React.FC<IFillInTheBlankProps> = ({
  handleAnswer,
  userAnswer,
}) => {
  return (
    <TextField
      required
      id="outlined-required"
      defaultValue={userAnswer}
      inputProps={{ 'data-testid': 'fillInput' }}
      onChange={(e) => handleAnswer(e.target.value)}
      sx={{ width: 220, mt: 2 }}
    />
  )
}

export default FillInTheBlank
