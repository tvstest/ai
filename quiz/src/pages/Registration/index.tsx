import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'

const Registration: React.FC = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [gender, setGender] = useState(null)
  const [language, setLanguage] = useState('English')

  const handleClick = () => {
    const req = {
      name,
      gender,
      language,
    }
    history.push({
      pathname: '/quiz',
      state: req,
    })
  }

  return (
    <Box component="form" autoComplete="off" sx={{ mt: 4, ml: 2 }}>
      <h3>Registration Form</h3>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: 220 }}
        />
      </div>
      <div>
        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ mt: 3, width: 220 }}>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button onClick={handleClick} variant="contained" sx={{ mt: 3 }}>
        Register
      </Button>
    </Box>
  )
}

export default Registration
