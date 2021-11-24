import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Button, CircularProgress, Grid, TextField } from '@mui/material'
import { useCallback } from 'react'
import _ from 'lodash'
import { useAsteroidContext } from 'app/context/AsteroidContext'
import {
  loadRandomAsteroidData,
  loadRandomAsteroidId,
  setAsteroidData,
  setAsteroidId,
  setError,
} from 'app/context/AsteroidContext/actions'
import asteroidServices from 'app/services/asteroid-services'
import { IAsteroidForm } from 'app/utility/interfaces/asteroid'

const schema = Yup.object().shape({
  asteroidId: Yup.string()
    .trim()
    .required('Please enter asteroid id')
    .matches(/^[0-9]*$/, 'Asteroid id must be numeric')
    .length(7, 'please enter 7 digit asteroid id'),
})

const defaultValues: IAsteroidForm = {
  asteroidId: '',
}

const AsteroidForm: React.FC<{ handler?: (payload: IAsteroidForm) => void }> =
  ({ handler }) => {
    const { state, dispatch } = useAsteroidContext()

    const loading = state.loadingRandomAsteroidId || state.loadingAsteroidData

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<IAsteroidForm>({
      mode: 'all',
      resolver: yupResolver(schema),
      defaultValues,
    })

    const onSubmit = useCallback(
      async (formData: IAsteroidForm) => {
        handler?.(formData)
        dispatch(setAsteroidId(formData?.asteroidId || ''))

        dispatch(loadRandomAsteroidData())

        try {
          const { data } = await asteroidServices.getAsteroidById(
            formData?.asteroidId || ''
          )
          dispatch(setAsteroidData(data))
        } catch (err) {
          dispatch(
            setError(`Failed to load given asteroid id ${formData?.asteroidId}`)
          )
        }

        reset()
      },
      [dispatch, handler, reset]
    )

    const getRandomAsteroid = useCallback(async () => {
      dispatch(loadRandomAsteroidId())

      try {
        const {
          // eslint-disable-next-line camelcase
          data: { near_earth_objects },
        } = await asteroidServices.getRandomAsteroidId()
        const randomAsteroidData = _.sample(near_earth_objects)

        dispatch(setAsteroidId(randomAsteroidData?.id || ''))

        dispatch(loadRandomAsteroidData())

        const { data } = await asteroidServices.getAsteroidById(
          randomAsteroidData?.id || ''
        )

        dispatch(setAsteroidData(data))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }, [dispatch])

    return (
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="asteroidId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              aria-label="Asteroid ID"
              label="Asteroid ID"
              inputProps={{ 'data-testid': 'asteroidId' }}
              role="textbox"
              variant="outlined"
              error={!!errors.asteroidId}
              helperText={errors.asteroidId?.message}
            />
          )}
        />
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              role="button"
              data-testid="form-submit"
              name="submit"
              color="primary"
              disabled={loading}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              data-testid="random-button"
              onClick={getRandomAsteroid}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : undefined}
            >
              Get Random Asteroid
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }

export default AsteroidForm
