import { useContext, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdFastfood } from "react-icons/md";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { AuthContext } from "../contexts/AuthContext";

import styles from "../../styles/home.module.scss";

export default function Home() {

  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email: "teste@teste.com",
      password: "123123"
    };

    await signIn(data);
  }

  return(
    <>
      <Head>
        <title>FastBurger</title>
      </Head>

      <div className={styles.containerCenter}>

        <svg width="0" height="0">
          <linearGradient id="yellow-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#ffc002" offset="0%" />
            <stop stopColor="#ff0072" offset="100%" />
          </linearGradient>
        </svg>

        <div className={styles.containerLogo}>
          <MdFastfood size={30} style={{ fill: "url(#yellow-gradient)" }} />
          <div>
            <h1>
              Fast<span>Burger</span>
            </h1>
          </div>
        </div>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input 
              type="email"
              placeholder="Digite seu e-mail..."
            />

            <Input 
              type="password"
              placeholder="Digite sua senha..."
            />

            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Registre-se</a>
          </Link>
        </div>
        
      </div>
    </>
  );
}