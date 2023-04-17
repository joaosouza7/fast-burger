import Head from "next/head";
import { MdFastfood } from "react-icons/md";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import styles from "../../styles/home.module.scss";

export default function Home() {
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
            /**#ff0072  */
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
          <form>
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

          <a className={styles.text}>Não possui uma conta? Registre-se</a>
        </div>
        
      </div>
    </>
  );
}