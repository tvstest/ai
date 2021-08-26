import { Controller, useForm } from "react-hook-form";
import { IAsteroidForm } from "../../utility/interfaces/asteroid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import { useCallback } from "react";
import asteroidServices from "../../services/asteroid-services";
import _ from "lodash";
import { useAsteroidContext } from "../../context/AsteroidContext";
import { ActionType } from "../../context/AsteroidContext/actions";
const schema = Yup.object().shape({
  asteroidId: Yup.string()
    .trim()
    .required("Please enter asteroid id")
    .matches(/^[0-9]*$/, "Asteroid id must be numeric")
    .length(7, "please enter 7 digit asteroid id"),
});

const defaultValues: IAsteroidForm = {
  asteroidId: "",
};

const AsteroidForm: React.FC = () => {
  const { state, dispatch } = useAsteroidContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAsteroidForm>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (formData: IAsteroidForm) => {
      dispatch({
        type: ActionType.SetAsteroidId,
        payload: { asteroidId: formData?.asteroidId || "" },
      });

      dispatch({
        type: ActionType.LoadingAsteroidData,
      });

      try {
        const { data } = await asteroidServices.getAsteroidById(
          formData?.asteroidId || ""
        );
        dispatch({
          type: ActionType.SetAsteroidData,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: ActionType.SetError,
          payload: {
            message: `Failed to load given asteroid id ${formData?.asteroidId}`,
          },
        });
      }

      reset();
    },
    [dispatch, reset]
  );

  const getRandomAsteroid = useCallback(async () => {
    dispatch({ type: ActionType.LoadingRandomAsteroidId });

    const {
      data: { near_earth_objects },
    } = await asteroidServices.getRandomAsteroidId();
    const randomAsteroidData = _.sample(near_earth_objects);

    dispatch({
      type: ActionType.SetAsteroidId,
      payload: { asteroidId: randomAsteroidData?.id || "" },
    });

    dispatch({
      type: ActionType.LoadingAsteroidData,
    });

    const { data } = await asteroidServices.getAsteroidById(
      randomAsteroidData?.id || ""
    );

    dispatch({
      type: ActionType.SetAsteroidData,
      payload: data,
    });
  }, [dispatch]);

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
            disabled={
              state.loadingRandomAsteroidId || state.loadingAsteroidData
            }
          >
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={getRandomAsteroid}
            disabled={
              state.loadingRandomAsteroidId || state.loadingAsteroidData
            }
            startIcon={
              state.loadingRandomAsteroidId ? (
                <CircularProgress size={20} />
              ) : undefined
            }
          >
            Get Random Asteroid
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AsteroidForm;
