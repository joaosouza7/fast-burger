import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
    FinishOrder: {
        number: number | string;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">

export default function FinishOrder() {

    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinish() {
        try {

            await api.put("/order/send", {
                order_id: route.params?.order_id
            });

            navigation.popToTop();

        } catch(err) {
            console.log("ERRO AO FINALIZAR, " + err);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar pedido</Text>
                <Feather size={20} color="#1b1b1b" name="shopping-cart" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1b1b1b",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: "5%",
        paddingHorizontal: "4%"
    },
    alert: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "700",
        marginBottom: 12
    },
    title: {
        color: "#FFF",
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 12
    },
    button: {
        backgroundColor: "#3fffa3",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "65%",
        height: 50,
        borderRadius: 4,
    },
    textButton: {
        color: "#1b1b1b",
        fontSize: 18,
        fontWeight: "700",
        marginRight: 8
    }
})