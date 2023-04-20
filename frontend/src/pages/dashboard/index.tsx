import { useState } from "react";
import Head from "next/head";
import { FiRefreshCcw } from "react-icons/fi";

import { Header } from "../../components/Header";

import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";

import styles from "./styles.module.scss";

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || []);

    function handleOpenModalView(id: string) {
        alert("ID: " + id);
    }

    return (
        <>
            <Head>
                <title>Painel - Fast Burger</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button>
                            <FiRefreshCcw size={25} color="#3FFFA3" />
                        </button>
                    </div>
                    
                    <article className={styles.listOrders}>

                        {orderList.map( item => (
                            <section className={styles.orderItem} key={item.id}>
                                <button onClick={ () => handleOpenModalView(item.id) }>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}

                    </article>

                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const api = setupAPIClient(ctx);

    const response = await api.get("/orders");

    return {
        props: {
            orders: response.data,
        }
    }

})