import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { AuthContext } from "../../contexts";

export default function SignIn() {

    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        
        if(email === "" || password === "") {
            return;
        }

        await signIn({ email, password });
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textLogo}>Fast<Text style={{ color: "#FFC107" }}>Burger</Text></Text>

            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Digite seu e-mail..."
                    placeholderTextColor="#F0F0F0"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput 
                    placeholder="Digite sua senha..."
                    placeholderTextColor="#F0F0F0"
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1b1b1b",
    },
    textLogo: {
        color: "#FFF",
        fontSize: 50,
        fontWeight: "700",
        marginBottom: 20
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 14,
        paddingVertical: 32,
    },
    input: {
        width: "95%",
        height: 60,
        fontSize: 16,
        backgroundColor: "#121212",
        borderWidth: 1,
        borderColor: "#686767",
        borderRadius: 4,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: "#FFF",
    },
    button: {
        width: "95%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3FFFA3",
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#3a3939",
    }
});