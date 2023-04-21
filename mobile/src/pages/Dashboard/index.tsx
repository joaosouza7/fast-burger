import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {

    const { signOut } = useContext(AuthContext);

    return (
        <View>
            <Text>TELA DASHBOARD</Text>
            <TouchableOpacity onPress={signOut}>
                <Text>SAIR</Text>
            </TouchableOpacity>
        </View>
    );
}