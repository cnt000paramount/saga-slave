import { HackNorrisUser } from "../../../types/HackNorrisUser";
import { UiState } from "../../../types/UiState";
import styles from "../Users.module.css";

export function UserList({
  users,
  setCurrentUser,
  setUiState,
  removeUserCb,
}: {
  users: HackNorrisUser[];
  setCurrentUser: (user: HackNorrisUser | null) => void;
  setUiState: (state: UiState) => void;
  removeUserCb: (user: HackNorrisUser) => void;
}) {
  return (
    <ul className={styles.list}>
      {users?.map((user: HackNorrisUser, i: number) => (
        <li key={i}>
          <div>
            <div>
              Username: <pre>{user.name}</pre>
            </div>
            <div>
              Email: <pre>{user.email}</pre>
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                setCurrentUser(user);
                setUiState("view");
              }}
            >
              View
            </button>
            <button
              onClick={() => {
                setCurrentUser(user);
                setUiState("edit");
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                removeUserCb(user);
                setCurrentUser(null);
                setUiState("empty");
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
