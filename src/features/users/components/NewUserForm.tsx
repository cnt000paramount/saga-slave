import { useState } from "react";
import styles from "../Users.module.css";
import { UiState } from "../../../types/UiState";

export const NewUserForm = ({
  saveUser,
  setUiState,
}: {
  saveUser: (user: { profile_id: number; email: string; name: string }) => void;
  setUiState: (state: UiState) => void;
}) => {
  const [profileId, setProfileId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const canSave = name && email && profileId;

  return (
    <>
      <h2>New User</h2>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className={styles.form}
      >
        <label htmlFor="profile_id">Profile Id</label>
        <input
          id="profile_id"
          type="number"
          value={profileId}
          onChange={(e) => {
            setProfileId(e.currentTarget.value);
          }}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        {canSave && (
          <input
            value="Add"
            type="submit"
            onClick={() => {
              if (canSave) {
                saveUser({
                  profile_id: +profileId,
                  email,
                  name,
                });
                setUiState("empty");
              }
            }}
          />
        )}
      </form>
    </>
  );
};
