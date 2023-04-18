import { FormEvent, useState, useContext } from "react";
import { toast } from "react-toastify";

import Head from "next/head";
import Link from "next/link";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Logo } from "../../components/ui/Logo";

import { AuthContext } from "../../contexts/AuthContext";
import { canSSRGuest } from "../../utils/canSSRGuest";

import styles from "../../../styles/home.module.scss";

export default function SignUp() {

  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading]= useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if(name === "" || email === "" || password === "") {
      toast.warning("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    };

    await signUp(data);

    setLoading(false);
  }

  return(
    <>
      <Head>
        <title>Cadastre-se</title>
      </Head>

      <div className={styles.containerCenter}>

        <Logo />

        <div className={styles.login}>
            <h2>Criando sua conta</h2>
          <form onSubmit={handleSignUp}>
            <Input 
              type="text"
              placeholder="Digite seu nome..."
              value={name}
              onChange={ (e) => setName(e.target.value) }
            />

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
              Cadastrar
            </Button>
          </form>

          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça login!</a>
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