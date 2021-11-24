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
import { Language } from 'utilities/enum/language'
import { AppRoutings } from 'utilities/enum/app-routings'
import { GENDER, LANGUAGE } from 'utilities/constants'
import { IRegistrationHistoryState } from 'utilities/interfaces/registration-state'

const Registration: React.FC = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [gender, setGender] = useState(GENDER[0].value)
  const [language, setLanguage] = useState(Language.English)

  const handleClick = () => {
    const req: IRegistrationHistoryState = {
      name,
      language,
    }
    history.push({
      pathname: AppRoutings.Quiz,
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
          inputProps={{ 'data-testid': 'nameField' }}
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
            {GENDER.map((gen) => (
              <FormControlLabel
                value={gen.value}
                control={<Radio />}
                label={gen.label}
                key={gen.value}
              />
            ))}
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
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            {LANGUAGE.map((lang) => (
              <MenuItem value={lang.value} key={lang.value}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{ mt: 3 }}
        data-testid="submitForm"
        disabled={!name || !gender || language < 0}
      >
        Register
      </Button>
    </Box>
  )
}

export default Registration
