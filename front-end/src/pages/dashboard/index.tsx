import { useState } from "react"
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import styles from "./styles.module.scss"

import { Header } from "../../components/Header"
import { FiRefreshCcw } from "react-icons/fi"

import { setupAPIClient } from "../../services/api";
import { IHomeProps, TOrderItemProps } from "../../interfaces"

import { ModalOrder } from "../../components/ModalOrder"

import Modal from "react-modal";

export default function Dashboard({ orders }: IHomeProps) {

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<TOrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    const handleOpenModalView = async (id: string) => {
        const apiClient = setupAPIClient();

        const response = await apiClient.get("/order/detail", {
            params: {
                order_id: id,
            }
        })

        setModalItem(response.data);
        setModalVisible(true);
    }

    const handleFinishItem = async (id: string) => {
        const apiClient = setupAPIClient();
        await apiClient.put("/order/finish", {
            order_id: id
        });

        const response = await apiClient.get("/orders");

        setOrderList(response.data);

        setModalVisible(false);
    }

    const handleRefreshOrders = async() => {
        const apiClient = setupAPIClient();

        const response = await apiClient.get("/orders");
        
        setOrderList(response.data);
    }

    Modal.setAppElement("#__next");

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>

                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button onClick={handleRefreshOrders}>
                            <FiRefreshCcw size={25} color="#3fffa3" />
                        </button>
                    </div>

                    <article className={styles.listOrders}>

                        {orderList.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhum pedido aberto foi encontrado...
                            </span>
                        )}

                        {orderList.map((order) => (
                            <section key={order.id} className={styles.orderItem}>
                                <button onClick={ () => handleOpenModalView(order.id) }>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {order.table}</span>
                                </button>
                            </section>
                        ))}
                    </article>

                </main>

                {modalVisible && (
                    <ModalOrder isOpen={modalVisible} onRequestClose={handleCloseModal} order={modalItem} handleFinishOrder={handleFinishItem} />
                )}

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/orders");

    return {
        props: {
            orders: response.data
        }
    }
})