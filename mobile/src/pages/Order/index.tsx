import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

export type ProductProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {

    const route = useRoute<OrderRouteProps>();

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [items, setItems] = useState<ItemProps[]>([]);

    const [amount, setAmount] = useState("1");

    useEffect(() => {

        async function loadInfo() {
            const response = await api.get("/category");

            setCategory(response.data);
            setCategorySelected(response.data[0]);
        }

        loadInfo();

    }, []);

    useEffect(() => {

        async function loadProducts() {
            const response = await api.get("/category/product", {
                params: {
                    category_id: categorySelected?.id
                }
            });

            setProducts(response.data);
            setProductSelected(response.data[0]);

        }

        loadProducts();

    }, [categorySelected]);

    async function handleCloseOrder() {

        try {
            await api.delete("/order", {
                params: {
                    order_id: route.params?.order_id
                }
            });

            navigation.goBack();

        } catch(err) {
            console.log(err);
        }
        
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }

    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item);
    }

    // Adicionando um produto na mesa
    async function handleAdd() {
        const response = await api.post("/order/add", {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        });

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data]);
    }

    async function handleDeleteItem(item_id: string) {
        await api.delete("/order/remove", {
            params: {
                item_id: item_id
            }
        });

        // Após remover da api, removemos da lista de items
        let removeitem = items.filter( item => {
            return (item.id !== item_id)
        });

        setItems(removeitem);
    }

    function handleFinishOrder() {
        navigation.navigate("FinishOrder", { number: route.params?.number, order_id: route.params?.order_id } );
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color="#FF3F4B" />
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={ () => setModalCategoryVisible(true) }>
                    <Text style={{ color: "#FFF" }}>{categorySelected?.name}</Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={ () => setModalProductVisible(true) }>
                    <Text style={{ color: "#FFF" }}>{productSelected?.name}</Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade:</Text>
                <TextInput 
                    style={[styles.input, { width: "60%", textAlign: "center" }]}
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Feather name="plus" size={28} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { opacity: items.length === 0 ? 0.4 : 1 }]} disabled={items.length === 0} onPress={handleFinishOrder}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View> 

            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={ (item) => item.id}
                renderItem={ ({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >
                <ModalPicker 
                    handleCloseModal={ () => setModalCategoryVisible(false) }
                    options={category}
                    selectedItem={ handleChangeCategory }
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
            >
                <ModalPicker 
                    handleCloseModal={ () => setModalProductVisible(false) }
                    options={products}
                    selectedItem={ handleChangeProduct }
                />
            </Modal>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1b1b1b",
        paddingVertical: "5%",
        paddingStart: "4%",
        paddingEnd: "4%"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 24,
        marginBottom: 12
    },
    title: {
        fontSize: 30,
        color: "#FFF",
        fontWeight: "700",
        marginRight: 14
    },
    input: {
        backgroundColor: "#121212",
        borderRadius: 4,
        width: "100%",
        height: 50,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 10,
        color: "#FFF",
        fontSize: 18
    },
    qtdContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    qtdText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700"
    },
    actions: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12
    },
    buttonAdd: {
        width: "20%",
        backgroundColor: "#3FD1FF",
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1e1e1e"
    },
    button: {
        width: "75%",
        height: 50,
        backgroundColor: "#3FFFA3",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    }
})