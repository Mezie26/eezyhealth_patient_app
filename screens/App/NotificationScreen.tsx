import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";


export default function NotificationScreen() {
    const DATA1 = [{}];
    const DATA2= [{}];

    const renderItems = ({item}: any) => (
        <View></View>
    )

    const seperator = () => {
        return (
            <View style={styles.seperator} />
        )
      };

    return (
        <View>
            <Text style={styles.notificationHeader}>TODAY</Text>
            <Text style={styles.notificationHeader}>OLDER</Text>
            {/*<FlatList
            data={DATA1}
            renderItem={renderItems}
            ItemSeparatorComponent={seperator}></FlatList>
            <FlatList
            data={DATA2}
            renderItem={renderItems}
            ItemSeparatorComponent={seperator}></FlatList>*/}
        </View>
    )
};

const styles= StyleSheet.create({
    notificationHeader: {
        fontSize: 12,
        fontWeight: '500',
        color: "#363636",
        margin: 30
    },
    seperator: {
        backgroundColor: '#333333',
        height: 1,
        width: 400,
        justifyContent: 'center',
        textAlign: 'auto',
        margin: 10,
    },
})