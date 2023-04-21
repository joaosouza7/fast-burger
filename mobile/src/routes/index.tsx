import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

import { AuthContext } from "../contexts/AuthContext";

function Routes() {

    const { isAuthenticated, loading } = useContext(AuthContext);

    if(loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1b1b1b"
                }}
            >
                <ActivityIndicator size={60} color="#FFF" />
            </View>
        );
    }

    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    );
}

export default Routes;