import { FormEvent, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdFastfood } from "react-icons/md";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";

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
      alert("Preencha todos os campos!");
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