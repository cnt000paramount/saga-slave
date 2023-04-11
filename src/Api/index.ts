import env from "../util/env";

type Params = {
    searchLabel: string;
    token: string;
    type: string;
  }

export const fetchUserCall = (id: string) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
    res.json()
  );

export const fetchSearchCall = ({
  searchLabel,
  token,
  type
}: Params) =>
  fetch(`${env.searchEndpoint}?q=${searchLabel}&type=${type}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

export const fetchAccessToken = () =>
  fetch(
    `${env.tokenEndpoint}?grant_type=client_credentials&client_id=${env.clientId}&client_secret=${env.clientSecret}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  ).then((res) => res.json());
