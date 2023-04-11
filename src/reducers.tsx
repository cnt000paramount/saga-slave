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
    case "FETCH_FAILED":
      return { ...state, message: action.message };
    case "USER_NOT_EXISTS":
      return { ...state, message: action.payload.message };
    case "GET_TOKEN_SUCCEEDED":
      return { ...state, token: action.token };
    case "SPOTY_SEARCH_SUCCEEDED":
      return { ...state, searchResult: action.searchResult };
    default:
      return state;
  }
}
