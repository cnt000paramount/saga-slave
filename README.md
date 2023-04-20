# Saga Slave - A journey with React, Redux, Saga with TypeScript (RTK and RTK query)


This project is a Create React App built with TypeScript, aimed at exploring the use of React, Redux, and Saga.
The project was developed by Edoardo Gargano and Andrea Reverberi.


## Routes and technologies


We created a bunch of routes to implement different technologies and use cases.


### Home (/)


Render the `Counter` component, the one created by the create react app default.
It uses the Redux Toolkit `createSlice` function and it simulates an async call with Thunk in `incrementAsync`
No data from APIs.


### User (/user)


Render the `User` component.
Data is provided by `https://jsonplaceholder.typicode.com/users` API.
It uses Redux Toolkit for the Redux part and the async actions:
- Thunk in `getUserAsync` (not used in the UI but important to see the difference with saga)
- Saga in `getUser`
`userSaga.ts` listen to the `getUser` action and fetch the user


### Spotify (/Spotify)


Render `Spotify` component.
Data is provided by Spotify API.
It introduces just a complexity about the token needed to call the APIs, `getToken` and `getResult`.


.env file is needed to make it works, see the section below.


### Users (/users)


Render `Users` component.
Data is provided by Hack Norris API (https://github.com/viacomcbs/hack-norris). This API is created By Igor Nikolenko for the Paramount Hackathon on 30/31 March 2023
It uses React Redux Toolkit Query located in `src/features/api/apiSlice.ts` to make the CRUD operations.
No Redux Saga is used here.


### Playlists (/playlists)


Render `Playlists` component.
Data is provided by Hack Norris API (https://github.com/viacomcbs/hack-norris). This API is created By Igor Nikolenko for the Paramount Hackathon on 30/31 March 2023
It uses React Redux Toolkit Query located in `src/features/api/apiSlice.ts` to make the CRUD operations.
No Redux Saga is used here.
It is a little bit more complex than `Users` because it uses the user to call the correct playlist and a free Payload to save the content of the playlist.


WARNING: the edit functionality is not working because the API has a known issue.


## Getting Started
To get started with this project, you can follow these steps:


1. Clone this repository to your local machine.
2. Install dependencies by running `yarn`.
3. Start the development server by running `yarn start`.
4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).


## Technologies Used
- React
- Redux
- Redux Saga
- TypeScript
- Redux Toolkit
- React Redux Toolkit Query


## .env


.env file is needed in order to make all things work in this format (put Spotify keys for the Spotify section):


````
REACT_APP_SPOTIFY_TOKEN_ENDPOINT=https://accounts.spotify.com/api/token
REACT_APP_SPOTIFY_CLIENT_ID=<SPOTIFY_CLIENT_ID>
REACT_APP_SPOTIFY_CLIENT_SECRET=<SPOTIFY_CLIENT_SECRET>
SPOTIFY_API_DOMAIN=https://api.spotify.com
REACT_APP_SPOTIFY_SEARCH_ENDPOINT=$SPOTIFY_API_DOMAIN/v1/search


REACT_APP_HACK_NORRIS_API_DOMAIN=https://blysuzzmda.execute-api.us-east-1.amazonaws.com/dev
REACT_APP_AWS_USER_ENDPOINT=$REACT_APP_HACK_NORRIS_API_DOMAIN/user
REACT_APP_AWS_PLAYLIST_ENDPOINT=$REACT_APP_HACK_NORRIS_API_DOMAIN/playlist
````

