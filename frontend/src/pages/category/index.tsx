import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";

import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";

import styles from "./styles.module.scss";

export default function Category() {

    const [name, setName] = useState("");

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(name === "") {
            toast.warning("Digite o nome da categoria");
            return;
        }

        const apiClient = setupAPIClient();

        await apiClient.post("/category", {
            name: name
        });

        toast.success("Categoria cadastrada com sucesso!");
        setName("");
    }

    return (
        <>
            <Head>
                <title>Nova categoria - Fast Burger</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Cadastrar categoria</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input 
                            type="text"  
                            placeholder="Digite o nome da categoria..."
                            value={name}
                            onChange={ (e) => setName(e.target.value) }
                            className={styles.input}
                        />

                        <button type="submit" className={styles.buttonAdd}>
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}