import { useState } from "react";
import { HackNorrisUser } from "../../types/HackNorrisUser";
import {
  useGetUsersQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useRemoveUserMutation,
} from "../api/apiSlice";
import { NewUserForm } from "./components/NewUserForm";
import { UserForm } from "./components/UserForm";
import { EditUserForm } from "./components/EditUserForm";
import { AddNewUserForm } from "./components/AddNewUserForm";
import { UserList } from "./components/UserList";
import { UiState } from "../../types/UiState";
import styles from "./Users.module.css";

export function Users() {
  const [uiState, setUiState] = useState<UiState>("empty");
  const [currentUser, setCurrentUser] = useState<HackNorrisUser | null>(null);
  const { data: users } = useGetUsersQuery();

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
    <div className={styles.container}>
      <AddNewUserForm setCurrentUser={setCurrentUser} setUiState={setUiState} />
      <UserList
        users={users ?? []}
        setCurrentUser={setCurrentUser}
        removeUserCb={removeUserCb}
        setUiState={setUiState}
      />
      {uiState === "new" && (
        <NewUserForm saveUser={saveUser} setUiState={setUiState} />
      )}
      {uiState === "view" && currentUser && <UserForm user={currentUser} />}
      {uiState === "edit" && (
        <EditUserForm
          user={currentUser}
          saveModifiedUser={saveModifiedUser}
          setUiState={setUiState}
        />
      )}
    </div>
  );
}
