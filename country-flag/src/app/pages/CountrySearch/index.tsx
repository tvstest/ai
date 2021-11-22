import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'
import Container from '@mui/material/Container'
import { CssBaseline, Theme } from '@mui/material'
import { Routes } from 'app/utils/enums/routes'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const CountrySearch: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const [countryNameInput, setCountryNameInput] = useState<string>('')
  const countrySearchRoute = `${Routes.Countries}/${countryNameInput}`
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault()
            history.push(countrySearchRoute)
          }}
        >
          <TextField
            value={countryNameInput}
            required
            fullWidth
            autoFocus
            label="Enter Country"
            variant="outlined"
            onChange={(e) => setCountryNameInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!countryNameInput}
            type="submit"
            fullWidth
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default CountrySearch
