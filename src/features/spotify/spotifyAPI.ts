export function fetchUser(id = 0) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
    res.json()
  );
}
