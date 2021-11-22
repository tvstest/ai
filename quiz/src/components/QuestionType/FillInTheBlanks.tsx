import React, { useState } from 'react'
import TextField from '@mui/material/TextField'

interface IFillInTheBlankProps {
  handleAnswer: (userAnswer: string | number[]) => void
  userAnswer: string | number[]
}

const FillInTheBlank: React.FC<IFillInTheBlankProps> = ({
  handleAnswer,
  userAnswer,
}) => {
  const [fillInBlank, setFillInBlank] = useState(userAnswer ?? '')

  const onFillInBlankHandler = (value: string) => {
    setFillInBlank(value)
    handleAnswer(value)
  }

  return (
    <TextField
      required
      id="outlined-required"
      value={fillInBlank}
      onChange={(e) => onFillInBlankHandler(e.target.value)}
      sx={{ width: 220, mt: 2 }}
    />
  )
}

export default FillInTheBlank
