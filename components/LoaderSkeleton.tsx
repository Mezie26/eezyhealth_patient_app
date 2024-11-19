import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton, } from '@rneui/themed';

const SkeletonLoader = ({ circle }: any) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ContainerSkeleton}>
        {circle && <Skeleton circle width={30} height={30} />}

        <Skeleton width={"100%"} height={30} animation="wave" />
      </View>
      <View style={styles.ContainerSkeleton}>
        {circle && <Skeleton circle width={30} height={30} />}
        <Skeleton width={"100%"} height={30} animation="wave" />
      </View>
      <View style={styles.ContainerSkeleton}>
        {circle && <Skeleton circle width={30} height={30} />}
        <Skeleton width={"100%"} height={30} animation="wave" />
      </View>
      <View style={styles.ContainerSkeleton}>
        {circle && <Skeleton circle width={30} height={30} />}
        <Skeleton width={"100%"} height={30} animation="wave" />
      </View>

    </View>
  );
};

export default SkeletonLoader

const styles = StyleSheet.create({

  spacing: { paddingHorizontal: 20 },

  ContainerSkeleton: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  }
  ,
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

  }

})