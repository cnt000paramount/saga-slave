export default function reducer(
  state = {
    user: null,
    message: null,
  },
  action
) {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return { ...state, user: action.user };
    case "USER_FETCH_FAILED":
      return { ...state, message: action.message };
    case "USER_NOT_EXISTS":
      return { ...state, message: action.payload.message };

    default:
      return state;
  }
}
