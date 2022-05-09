import { useState } from "react";

import styles from "./styles.module.scss";

import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export function SignInButton() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  return isUserLoggedIn ? (
    <button className={styles.SingInBtn} type="button" onClick={() => {}}>
      <FaGithub color="#04d361" />
      ericDK89
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.SingInBtn} type="button">
      <FaGithub color="#eba417" />
      Sign In With Github
    </button>
  );
}
