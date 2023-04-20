import { useState } from "react";
import Head from "next/head";
import { FiRefreshCcw } from "react-icons/fi";
import Modal from "react-modal";

import { Header } from "../../components/Header";
import { ModalOrder } from "../../components/ModalOrder";

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

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
    },
    order:{
        id: string;
        table: string | number;
        status: boolean;
        draft: boolean;
        name: string | null;
    }
}

export default function Dashboard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        
        const apiClient = setupAPIClient();

        const response = await apiClient.get("/order/detail", {
            params: {
                order_id: id,
            }
        });

        setModalItem(response.data);
        setModalVisible(true);
    }

    Modal.setAppElement("#__next")

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

                {modalVisible && (
                    <ModalOrder 
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        order={modalItem}
                    />
                )}
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