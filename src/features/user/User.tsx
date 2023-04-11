import { getUserAsync, selectUser } from "./userSlice";
import { useAppSelector, useAppDispatch } from "../../util/hooks";

export function User() {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const getUser = (id: number) => {
    dispatch({ type: "USER_FETCH_REQUESTED", payload: { id } });
  };

  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          name="search"
          onChange={(e) => {
            dispatch(getUserAsync(Number(e.currentTarget.value)));
          }}
        />
        <button onClick={() => getUser(Math.ceil(Math.random() * 10))}>
          Random
        </button>
      </form>
      {user?.name ? (
        <div>
          <div>Name: {user.name}</div>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
        </div>
      ) : (
        <p>{"No Results"}</p>
      )}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
