import { useState } from "react";
import { HackNorrisUser } from "../../types/HackNorrisUser";
import {
  useGetUsersQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useRemoveUserMutation,
} from "../api/apiSlice";
import styles from "./Users.module.css";
import { NewUserForm } from "./components/NewUserForm";
import { UserForm } from "./components/UserForm";
import { EditUserForm } from "./components/EditUserForm";

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
