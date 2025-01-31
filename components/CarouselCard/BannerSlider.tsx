import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import CarouselCards from './CarouselCards';


const BannerSlider = ({ loading, data, navigation }: any) => {
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

export default BannerSlider
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
});