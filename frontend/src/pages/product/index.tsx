import { ChangeEvent, useState } from "react";
import Head from "next/head";
import { FiUpload } from "react-icons/fi";

import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

import styles from "../category/styles.module.scss";

export default function Product() {

    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {

        if(!event.target.files) {
            return;
        }

        const image = event.target.files[0];

        if(!image) {
            return;
        }

        if(image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/jpg") {

            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <>
            <Head>
                <title>Novo produto - Fast Burger</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF" />
                            </span>

                            <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleFile} />

                            { avatarUrl && (
                                <img 
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do produto" 
                                    width={200}
                                    height={200}
                                />
                            ) }
                        </label>

                        <select>
                            <option>
                                Bebida
                            </option>
                            <option>
                                Sobremesas
                            </option>
                        </select>

                        <input 
                            type="text"
                            placeholder="Nome do produto"
                            className={styles.input} 
                        />

                        <input 
                            type="text"
                            placeholder="Preço do produto"
                            className={styles.input} 
                        />

                        <textarea 
                            placeholder="Descrição do produto..."
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

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }

});