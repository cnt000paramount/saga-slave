import { HackNorrisUser } from "../../../types/HackNorrisUser";
import { UiState } from "../../../types/UiState";
import styles from "../Playlist.module.css";

export function SelectUserForm({
  users,
  setCurrentUserId,
  setUiState,
}: {
  users: HackNorrisUser[];
  setCurrentUserId: (userId: string) => void;
  setUiState: (state: UiState) => void;
}) {
  return (
    <form
      className={styles.form}
      action=""
      onSubmit={(e) => e.preventDefault()}
    >
      <select
        onChange={(e) => {
          if (e?.currentTarget?.value) {
            setCurrentUserId(e.currentTarget.value);
          }
          setUiState("empty");
        }}
      >
        <option value="">Select a user</option>
        {users &&
          users?.map((user: HackNorrisUser, i: number) => (
            <option value={user.id} key={i}>
              {user.name} - {user.email}
            </option>
          ))}
      </select>
    </form>
  );
}
