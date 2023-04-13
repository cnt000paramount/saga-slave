import { useState } from "react";
import { HackNorrisUser } from "../../types/HackNorrisUser";
import {
  useGetUsersQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useRemoveUserMutation,
} from "../api/apiSlice";
import styles from "./Users.module.css";

export function Users() {
  const [currentUser, setCurrentUser] = useState<HackNorrisUser | null>(null);
  const [newUserFlag, setNewUserFlag] = useState<boolean>(false);
  const [editUserFlag, setEditUserFlag] = useState<boolean>(false);
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const [addNewUsers] = useAddNewUserMutation();
  const [editUser] = useEditUserMutation();
  const [removeUser] = useRemoveUserMutation();

  const saveUser = async ({
    profile_id,
    email,
    name,
  }: {
    profile_id: number;
    email: string;
    name: string;
  }) => {
    await addNewUsers({
      profile_id,
      email,
      name,
    }).unwrap();
  };

  const saveModifiedUser = async (user: HackNorrisUser) => {
    await editUser(user).unwrap();
  };

  const removeUserCb = async (user: HackNorrisUser) => {
    await removeUser(user).unwrap();
  };

  return (
    <>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className={styles.form}
      >
        <input
          value="Add New"
          type="submit"
          onClick={() => {
            setNewUserFlag(true);
            setCurrentUser(null);
          }}
        />
      </form>
      <ul className={styles.list}>
        {isLoading && "Loading ..."}
        {isSuccess &&
          users?.map((user: HackNorrisUser, i: number) => (
            <li key={i}>
              <span>
                {user.name} - {user.email}
              </span>
              <div className={styles.buttons}>
                <button
                  onClick={() => {
                    setCurrentUser(user);
                    setEditUserFlag(false);
                    setNewUserFlag(false);
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setCurrentUser(user);
                    setEditUserFlag(true);
                    setNewUserFlag(false);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    removeUserCb(user);
                    setCurrentUser(null);
                    setEditUserFlag(false);
                    setNewUserFlag(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      {isError && error}
      {newUserFlag && <NewUserForm saveUser={saveUser} />}
      {!editUserFlag && currentUser && <UserForm user={currentUser} />}
      {editUserFlag && currentUser && (
        <EditUserForm user={currentUser} saveModifiedUser={saveModifiedUser} />
      )}
    </>
  );
}
type UserFormProps = {
  user: HackNorrisUser | null;
};

// type NewUserFormProps = {
//   saveUser: (user: Omit<HackNorrisUser, "id">) => void;
// };

type EditUserFormProps = {
  saveModifiedUser: (user: HackNorrisUser) => void;
} & UserFormProps;

export const UserForm = ({ user }: UserFormProps) => (
  <>
    <h2>User</h2>
    <form
      action=""
      onSubmit={(e) => e.preventDefault()}
      className={styles.form}
    >
      <label htmlFor="id">Id</label>
      <input id="id" type="text" disabled defaultValue={user?.id} />

      <label htmlFor="profile_id">Profile Id</label>
      <input id="profile_id" type="number" defaultValue={user?.profile_id} />

      <label htmlFor="email">Email</label>
      <input id="email" type="text" defaultValue={user?.email} />

      <label htmlFor="name">Name</label>
      <input id="name" type="text" defaultValue={user?.name} />
    </form>
  </>
);

export const NewUserForm = ({
  saveUser,
}: {
  saveUser: (user: { profile_id: number; email: string; name: string }) => void;
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
              }
            }}
          />
        )}
      </form>
    </>
  );
};

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
