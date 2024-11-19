import React from 'react'
import { StyleSheet, View } from 'react-native'
import CarouselCards from './CarouselCards';


const Banner = ({ loading, data, navigation }: any) => {
    return (
        <View style={styles.container}>
            <CarouselCards
                loading={loading}
                data={data}
                navigation={navigation}
            />
        </View>
    );
}

export default Banner
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
});