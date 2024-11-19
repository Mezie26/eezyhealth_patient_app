import React from 'react'
import { StyleSheet, View } from 'react-native'
import CarouselCards from './CarouselCards';


const Banner = ({ loading, count, completed, ongoing, canclled, rejected, pending }: any) => {
    return (
        <View style={styles.container}>
            <CarouselCards
                loading={loading}
                count={count}
                completed={completed}
                ongoing={ongoing}
                canclled={canclled}
                rejected={rejected}
                pending={pending}
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
        marginTop: 20,

    },
});