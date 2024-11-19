import { SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ChatListScreen from './ChannelListScreen';
import { useFocusEffect } from '@react-navigation/native'
import * as Haptics from 'expo-haptics';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../../css/colorsIndex';
import { login } from '../../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { getBookings } from '../../../hooks/getBookings';



const wait = (timeout: number | undefined) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};


const Message = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.auth);
	useEffect(() => {
		dispatch(login());
	}, [dispatch])

	const [isLoading, setIsLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [bookings, setBookings] = useState<any>([]);
	const toastRef: any = useRef(null);
	const userId = user?.uid;



	const fetchBookings = useCallback(() => {
		setIsLoading(true);
		if (!userId?.uid) {
			setIsLoading(false);
			return;
		}

		getBookings({ userId: userId.uid })
			.then((data) => {
				setBookings(data);
			})
			.catch((error) => {
				toastRef.current.error(error.message);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [userId?.uid]);

	// Use focus effect to fetch bookings or run additional logic
	useFocusEffect(
		useCallback(() => {
			if (userId?.uid) {
				fetchBookings();
			}
		}, [userId?.uid]) // Re-run when doctorId or userId changes
	);



	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);


	return (
		<SafeAreaView style={styles.container}>
			{isLoading && <ProgressBar progress={0.3} color={colors.accent_green} indeterminate={isLoading} />}
			<ScrollView
				style={styles.messageContainerMain}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
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