import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";


export function SignInButton() {
  const { data: session } = useSession();
  return session ? (
    <button
      className={styles.SingInBtn}
      type="button"
      onClick={() => {
        signOut();
      }}
    >
      <FaGithub color="#04d361" />
      {/* <img src={session.user.image} alt="Profile Image" /> */}
      Eric Macedo
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      className={styles.SingInBtn}
      type="button"
      onClick={() => {
        signIn("github");
      }}
    >
      <FaGithub color="#eba417" />
      Sign In With Github
    </button>
  );
}
