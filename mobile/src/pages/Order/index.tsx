import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useRoute, RouteProp } from "@react-navigation/native";

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {

    const route = useRoute<OrderRouteProps>();

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name="trash-2" size={28} color="#FF3F4B" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: "#FFF" }}>Sobremesas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: "#FFF" }}>Sorvete de creme</Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade:</Text>
                <TextInput 
                    style={[styles.input, { width: "60%", textAlign: "center" }]}
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric"
                    value="1"
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Feather name="plus" size={28} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>
            
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