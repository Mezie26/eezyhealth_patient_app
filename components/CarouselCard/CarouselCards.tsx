import React from 'react'
import { StyleSheet, View, ActivityIndicator, } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { ITEM_WIDTH, SLIDER_WIDTH } from './CarouselCardItem'
import { colors } from '../../css/colorsIndex';



const CarouselCards = ({ loading, data, navigation }: any) => {

  const isCarousel = React.useRef(null)
  const [index, setIndex] = React.useState(0)


  const limitedData = data?.slice(0, 5); // Select only the first 5 items

  return (
    <View>
      {/* @ts-ignore */}
      <Carousel
        layout={'stack'}
        layoutCardOffset={12}
        ref={isCarousel}
        data={limitedData}
        renderItem={({ item }: any) => <CarouselCardItem item={item} navigation={navigation} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index: React.SetStateAction<number>) => setIndex(index)}
      />
      <View style={styles.pagination} >
        <Pagination
          dotsLength={!limitedData?.length ? [] : limitedData?.length}
          activeDotIndex={index}
          // @ts-ignore  
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.accent_green,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
      <View style={styles.mainContainer}>
        {loading ? <ActivityIndicator color={colors.accent_green} /> : null}

      </View>
    </View>
  )
}


export default CarouselCards

const styles = StyleSheet.create({

  pagination: {},

  ActivityIndicator: {
    color: colors.white,
  },
  mainContainer: {
    position: "absolute",
    top: 20,
    right: 100,
  },
  // pagination: {
  //   position: "relative",
  //   top: -55,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 0,
  //   margin: 0,
  // },
});