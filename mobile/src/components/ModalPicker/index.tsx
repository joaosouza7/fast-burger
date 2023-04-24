import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";

import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps {
    handleCloseModal: () => void;
    options: CategoryProps[];
    selectedItem: ( item: CategoryProps ) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export function ModalPicker({ handleCloseModal, options, selectedItem }: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item);
        handleCloseModal();
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={ () => onPressItem(item) }>
            <Text style={styles.item}>{item?.name}</Text>
        </TouchableOpacity>
    ))

    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#8a8a8a",
        borderRadius: 4
    },
    option: {
        alignItems: "flex-start",
        borderTopWidth: 0.8,
        borderTopColor: "#8a8a8a"
    },
    item: {
        margin: 18,
        fontSize: 16,
        fontWeight: "700",
        color: "#121212"
    }
});