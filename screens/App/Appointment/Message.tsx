import { SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex'
import { useFocusEffect } from '@react-navigation/native'
import * as Haptics from 'expo-haptics';
import { getBookings } from '../../../hooks/getBookings';
import { ProgressBar } from 'react-native-paper';
import ChatListScreen from '../Chat/ChannelListScreen';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { login } from '../../../features/authSlice';

const wait = (timeout: number | undefined) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Message = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.auth);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [bookings, setBookings] = useState<any>([]);
	const toastRef: any = useRef(null);


	useEffect(() => {
		dispatch(login());
	}, [])


	useFocusEffect(
		useCallback(() => {
			handleMassage();
		}, [user?.uid])
	);


	const handleMassage = () => {
		setIsLoading(true);
		if (user?.uid) {
			getBookings({ userId: user?.uid })
				.then((data) => {
					setBookings(data);
					setIsLoading(false);
				})
				.catch((error) => {
					toastRef.current.error(error.message);
					Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
					setIsLoading(false);
				});
		}
	};


	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);




	return (
		<SafeAreaView style={styles.container}>
			{isLoading && <ProgressBar progress={0.3} color={colors.accent_green} indeterminate={isLoading} />}
			<ScrollView
				style={styles.messageContainerMain}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
				<ChatListScreen bookings={bookings} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Message;

const styles = StyleSheet.create({
	message_container_main: {
		flexDirection: "row",
		alignItems: 'center',
		gap: 15,
	},

	messageContainerMain: {
		margin: 20,
	},

	container: {
		flex: 1,
		backgroundColor: colors.white,

	}
})