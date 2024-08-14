import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate()
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { isAuth, login } = useAuth()

  useEffect(function() {
    if(isAuth) navigate('/App', { replace: true })
  }, [isAuth])

  function handleClick(e) {
    e.preventDefault();
    if(email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form} onSubmit={handleClick}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          {/* <button>Login</button> */}
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
