import { ChangeEvent, useState, FormEvent } from "react";
import { toast } from "react-toastify";

import Head from "next/head";
import { FiUpload } from "react-icons/fi";

import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

import { setupAPIClient } from "../../services/api";

import styles from "../category/styles.module.scss";

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [avatarUrl, setAvatarUrl] = useState("");
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

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

    function handleChangeCategory(event) {
        setCategorySelected(event.target.value);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {

            const data = new FormData();

            if(name === "" || price === "" || description === "" || imageAvatar === null) {
                toast.warning("Preencha todos os campos!");
                return;
            }

            data.append("name", name);
            data.append("price", price);
            data.append("description", description);
            data.append("category_id", categories[categorySelected].id);
            data.append("file", imageAvatar);

            const api = setupAPIClient();

            await api.post("/product", data);

            toast.success("Produto cadastrado com sucesso!");

        } catch(err) {
            console.log(err);
            toast.error("Ops, erro ao cadastrar o produto!");
        }

        setName("");
        setPrice("");
        setDescription("");
        setImageAvatar(null);
        setAvatarUrl("");
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

                    <form className={styles.form} onSubmit={handleRegister}>

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

                        <select value={categorySelected} onChange={handleChangeCategory} >
                            {categories.map( (item, index) => (
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <input 
                            type="text"
                            placeholder="Nome do produto"
                            className={styles.input}
                            value={name}
                            onChange={ (e) => setName(e.target.value) }
                        />

                        <input 
                            type="text"
                            placeholder="Preço do produto"
                            className={styles.input} 
                            value={price}
                            onChange={ (e) => setPrice(e.target.value) }
                        />

                        <textarea 
                            placeholder="Descrição do produto..."
                            className={styles.input}
                            value={description}
                            onChange={ (e) => setDescription(e.target.value) }
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

    const api = setupAPIClient(ctx);

    const response = await api.get("/category");

    return {
        props: {
            categoryList: response.data
        }
    }

});