# What this project is about ?

The NASA (National Aeronautics and Space Administration) is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research. [Wikipedia](https://en.wikipedia.org/wiki/NASA)

NASA offers various APIs for exploring large data of space and making it available to the application developers.
These APIs are open and requires registration to use it (with provided API_KEY) in projects.

This project utilizes two APIs provided by NASA:

- Get Random Asteroid ID https://api.nasa.gov/neo/rest/v1/neo/browse?api_key={{YOUR_API_KEY}}
- Get Asteroid Data https://api.nasa.gov/neo/rest/v1/neo/{{ASTEROID_ID}}?api_key={{YOUR_API_KEY}}

### Visual Insights

Application opens with a form to enter Asteroid ID and a button to get the Random Asteroid Details.
When form is submitted details of Asteroid as per given ID is shown below. (Utilizes 2nd API)

When get Random Asteroid is clicked, first random Asteroid ID is captured (Utilizes 1st API) and
based on that ID Asteroid details is fetched (again Utilizes 2nd API)

API returns many details for Asteroid, as we are interested in specific set of properties,
following details are shown:

```
{
  "name": string,
  "nasa_jpl_url": string,
  "is_potentially_hazardous_asteroid": boolean
}
```

### Packages used

| Name                    |    Version     | Purpose                                                  |
| :---------------------- | :------------: | :------------------------------------------------------- |
| @hookform/resolvers     |     2.8.0      | To bind validation schema with react hook form           |
| @material-ui/core       |     4.12.3     | For styling Application                                  |
| @material-ui/icons      |     4.11.2     | To display icons provided by material UI                 |
| @material-ui/lab        | 4.0.0-alpha.60 | Provides extra material UI components                    |
| @types/react-router-dom |     5.1.8      | For better typescript intellisense                       |
| axios                   |     0.21.1     | For Data Fetching / HTTP requests                        |
| prettier                |     2.3.2      | For consistent prettified code across different platform |
| react-hook-form         |     7.13.0     | To validate form inputs and events binding               |
| react-router-dom        |     5.2.0      | For navigation / routing in react app                    |
| react-toastify          |     8.0.0      | To display toast in application                          |
| yup                     |     0.32.9     | Schema builder for value parsing and validation          |

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn run prettier`

Runs [prettier](https://prettier.io/docs/en/install.html) development package that formats code as configured in prettierrc.json.

### `yarn start`

before starting app, script formats code using [prettier](https://prettier.io/docs/en/install.html) extension.
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
