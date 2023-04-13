import { useState } from "react";
import { HackNorrisUser } from "../../../types/HackNorrisUser";
import styles from "../Users.module.css";

type UserFormProps = {
  user: HackNorrisUser | null;
};

type EditUserFormProps = {
  saveModifiedUser: (user: HackNorrisUser) => void;
} & UserFormProps;

export const EditUserForm = ({ user, saveModifiedUser }: EditUserFormProps) => {
  const [profileId, setProfileId] = useState<number>(Number(user?.profile_id));
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [name, setName] = useState<string>(user?.name ?? "");

  const canSave = name && email && profileId && user?.id;
  return (
    <>
      <h2>Edit User</h2>
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
            setProfileId(+e.currentTarget.value);
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
                saveModifiedUser({
                  id: user.id,
                  profile_id: +profileId,
                  email,
                  name,
                });
              }
            }}
          />
        )}
      </form>
    </>
  );
};
