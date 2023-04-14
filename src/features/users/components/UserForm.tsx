import { HackNorrisUser } from "../../../types/HackNorrisUser";
import styles from "../Users.module.css";

type UserFormProps = {
  user: HackNorrisUser | null;
};

export const UserForm = ({ user }: UserFormProps) => (
  <>
    <h2>User {user?.name}</h2>
    <form
      action=""
      onSubmit={(e) => e.preventDefault()}
      className={styles.form}
    >
      <label htmlFor="id">Id</label>
      <input id="id" type="text" disabled value={user?.id} />

      <label htmlFor="profile_id">Profile Id</label>
      <input id="profile_id" type="number" disabled value={user?.profile_id} />

      <label htmlFor="email">Email</label>
      <input id="email" type="text" disabled value={user?.email} />

      <label htmlFor="name">Name</label>
      <input id="name" type="text" disabled value={user?.name} />
    </form>
  </>
);
