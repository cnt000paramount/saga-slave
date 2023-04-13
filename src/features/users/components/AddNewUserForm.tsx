import { HackNorrisUser } from "../../../types/HackNorrisUser";
import { UiState } from "../../../types/UiState";
import styles from "../Users.module.css";

export function AddNewUserForm({
  setUiState,
  setCurrentUser,
}: {
  setUiState: (state: UiState) => void;
  setCurrentUser: (user: HackNorrisUser | null) => void;
}) {
  return (
    <form
      action=""
      onSubmit={(e) => e.preventDefault()}
      className={styles.form}
    >
      <input
        value="Add New"
        type="submit"
        onClick={() => {
          setUiState("empty");
          setCurrentUser(null);
        }}
      />
    </form>
  );
}
