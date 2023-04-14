import { getUser, selectUser } from "./userSlice";
import { useAppSelector, useAppDispatch } from "../../util/hooks";
import styles from "./Users.module.css";

export function User() {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className={styles.form}
      >
        <input
          name="search"
          onChange={(e) => {
            dispatch(getUser({ id: Number(e.currentTarget.value) }));
          }}
        />
        <button
          onClick={() => {
            dispatch(getUser({ id: Math.ceil(Math.random() * 10) }));
          }}
        >
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
    </div>
  );
}
