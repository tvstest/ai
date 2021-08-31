import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Button, CircularProgress, Grid, TextField } from '@material-ui/core'
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

const AsteroidForm: React.FC = () => {
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
    [dispatch, reset]
  )

  const getRandomAsteroid = useCallback(async () => {
    dispatch(loadRandomAsteroidId())

    const {
      data: { near_earth_objects },
    } = await asteroidServices.getRandomAsteroidId()
    const randomAsteroidData = _.sample(near_earth_objects)

    dispatch(setAsteroidId(randomAsteroidData?.id || ''))

    dispatch(loadRandomAsteroidData())

    const { data } = await asteroidServices.getAsteroidById(
      randomAsteroidData?.id || ''
    )

    dispatch(setAsteroidData(data))
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
            label="Asteroid ID"
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
