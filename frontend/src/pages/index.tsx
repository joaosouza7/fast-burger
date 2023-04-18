import { useContext, useState, FormEvent } from "react";
import { toast } from "react-toastify";

import Head from "next/head";
import Link from "next/link";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Logo } from "../components/ui/Logo";

import { AuthContext } from "../contexts/AuthContext";
import { canSSRGuest } from "../utils/canSSRGuest";

import styles from "../../styles/home.module.scss";

export default function Home() {

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading]= useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === "" || password === "") {
      toast.warning("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    };

    await signIn(data);

    setLoading(false);
  }

  return(
    <>
      <Head>
        <title>FastBurger</title>
      </Head>

      <div className={styles.containerCenter}>

        <Logo />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input 
              type="email"
              placeholder="Digite seu e-mail..."
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />

            <Input 
              type="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
            />

            <Button
              type="submit"
              loading={loading}
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

export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }

});