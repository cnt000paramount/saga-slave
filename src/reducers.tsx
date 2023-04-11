import { SearchContent } from "spotify-types";

type JSONPlaceholderUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

type ActionType = {
  type: string;
};

type FetchFailed = {
  message: string;
  searchResult: null;
  token: null;
  user: null;
};

type UserFetchSucceeded = {
  message: null;
  searchResult: null;
  token: null;
  user: JSONPlaceholderUser;
};

type TokenFetchSucceeded = {
  message: null;
  searchResult: null;
  token: string;
  user: null;
};

type SearchFetchSucceeded = {
  message: string;
  searchResult: SearchContent;
  token: null;
  user: null;
};

type FetchFailedAction = FetchFailed & ActionType;
type UserFetchSucceededAction = UserFetchSucceeded & ActionType;
type TokenFetchSucceededAction = TokenFetchSucceeded & ActionType;
type SearchFetchSucceededAction = SearchFetchSucceeded & ActionType;

type Action =
  | FetchFailedAction
  | UserFetchSucceededAction
  | TokenFetchSucceededAction
  | SearchFetchSucceededAction;

export default function reducer(
  state = {
    user: null,
    message: null,
  },
  action: Action
): any {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return action?.user?.name
        ? { ...state, user: action.user, message: null }
        : { ...state, user: action.user, message: "User not exists" };
    case "TOKEN_FETCH_SUCCEEDED":
      return { ...state, token: action.token };
    case "SEARCH_FETCH_SUCCEEDED":
      return { ...state, searchResult: action.searchResult };
    case "FETCH_FAILED":
      return { ...state, message: action.message };
    default:
      return state;
  }
}
