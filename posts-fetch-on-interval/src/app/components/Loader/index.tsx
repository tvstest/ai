import React from 'react'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

const Loader: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <div id="loaderForAPICall" className="loaderHide">
        <div className="cssload-fond">
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </div>
        <div>
          <div className="loader-overlay-nav" />
          <div className="loader-overlay" id="loaderNav" />
        </div>
      </div>
    </>
  )
}

export default Loader
