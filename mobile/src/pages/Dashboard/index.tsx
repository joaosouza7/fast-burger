import React, { useState } from "react";
import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { api } from "../../services/api";

import { StackParamsList  } from "../../routes/app.routes";

export default function Dashboard() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState("");

    async function openOrder() {
        
        if(number === "") {
            return;
        }

        const response = await api.post("/order", {
            table: Number(number)
        });

        navigation.navigate("Order", { number: number, order_id: response.data.id });

        setNumber("");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>
            <TextInput 
                placeholder="Número da mesa"
                placeholderTextColor="#F0F0F0"
                style={styles.input}
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
            />
            
            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1b1b1b",
        paddingVertical: 15,
    },
    title: {
        color: "#FFF",
        fontSize: 35,
        fontWeight: "600",
        marginBottom: 24
    },
    input: {
        width: "90%",
        height: 60,
        borderWidth: 1,
        borderColor: "#686767",
        backgroundColor: "#121212",
        color: "#FFF",
        borderRadius: 4,
        paddingHorizontal: 10,
        textAlign: "center",
        fontSize: 20,
    },
    button: {
        width: "90%",
        height: 45,
        backgroundColor: "#3FFFA3",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        borderRadius: 4
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1e1e1e"
    }
})