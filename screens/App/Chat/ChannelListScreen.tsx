import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../css/global';
import { getContrastingColor, getRandomColor } from '../../../helper';
import { useChatClient } from '../../../shared/ChatClientContext';
import { Chatbubbles } from '../../../assets/svg/Chatbubbles';

const ChannelListScreen = ({ bookings }: any) => {
	const navigation = useNavigation();
	const chatClient = useChatClient();

	// Function to categorize chats based on the date
	const getChatTimeCategory = (date: moment.MomentInput) => {
		const today = moment();
		const chatDate = moment(date, 'YYYY-MM-DD');

		if (chatDate.isSame(today, 'day')) return 'Today';
		if (chatDate.isSame(today.clone().subtract(1, 'days'), 'day')) return 'Yesterday';
		if (chatDate.isBetween(today.clone().startOf('week'), today, null, '[]')) return 'This Week';
		if (chatDate.isBetween(today.clone().startOf('week').subtract(1, 'week'), today.clone().startOf('week').subtract(1, 'days'), null, '[]')) return 'Last Week';
		return 'Older';
	};

	// Function to group chats by time frame
	const groupChatsByCategory = (bookings: any[]) => {
		return bookings?.reduce((groups, chat) => {
			const category = getChatTimeCategory(chat.date);
			if (!groups[category]) groups[category] = [];
			groups[category].push(chat);
			return groups;
		}, {});
	};

	// Get unique doctors based on doctorId
	const uniqueDoctors = [...new Map(bookings?.map((item: { doctorId: any; }) => [item?.doctorId, item])).values()];
	const chatGroups = groupChatsByCategory(uniqueDoctors);

	const createChannel = async (doctorId: string, doctorName: string, bookingId: string) => {
		if (!chatClient) {
			return;
		}
		try {
			// Check if the doctor exists in Stream Chat
			const userResponse = await chatClient.queryUsers({ id: { $in: [doctorId] } });

			if (userResponse.users.length === 0) {
				return;
			}



			const channel = chatClient.channel('messaging', bookingId, {
				name: `Chat with. ${doctorName}`,
				members: [chatClient.userID, doctorId], // Use userID from chatClient
			});
			await channel.watch();
			navigation.navigate('ChannelScreen', { channelId: channel.id });
		} catch (error) {
		}
	};




	const hasData = Object.keys(chatGroups).length > 0;

	if (!chatClient) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				{hasData ? (
					<View style={styles.chat_container_main_notice}>
						{Object.keys(chatGroups).map((group, i) => (
							<View style={styles.chat_container_main} key={i}>
								{/* Loop through the chats under the current group */}
								{chatGroups[group]?.map((chat: any, i: any) => {
									const randomColor = getRandomColor();
									const contrastingColor = getContrastingColor(randomColor);

									return (
										<TouchableOpacity
											style={styles.price_image_container_main_item}
											key={i}
											onPress={() => createChannel(chat?.doctorId, chat?.doctorName, chat?.bookingId)}>
											<View style={styles.price_image_container_main}>
												{/* Avatar Container */}
												<View style={[styles.price_image_container3, { backgroundColor: randomColor }]}>
													<Text style={styles.price_image_inside}>{chat?.initials}</Text>
													<View style={[styles.price_image_circle, { backgroundColor: contrastingColor }]} />
												</View>
												<View style={styles.price_container_Main}>
													<View style={styles.price_container}>
														<Text style={styles.price_container_text}>{chat?.doctorName}</Text>
														<Text style={styles.price_time_text}>{moment(chat?.createAt).format('LLL')}</Text>
													</View>
													<View style={styles.sold_container}>
														<Text style={styles.sold_container_text}>{chat?.specialization}</Text>
														<View style={styles.sold_box_text_sup}>
															<Text style={styles.sold_box_text}>{chat?.count}</Text>
														</View>
													</View>
												</View>
											</View>
										</TouchableOpacity>
									);
								})}
							</View>
						))}
					</View>
				) : (

					<View style={styles.emptyStateContainer}>
						<Chatbubbles />
						<Text style={styles.emptyStateText}>No chats available</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default ChannelListScreen;




const styles = StyleSheet.create({
	emptyStateContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,

	},
	emptyStateText: {
		marginTop: 10,
		fontSize: 18,
		color: '#aaa',
	},
	chat_container_main_notice: {
		gap: 20,
	},

	chat_container_main: {
		gap: 20,
	},

	price_image_circle1: {
		width: 14,
		height: 14,
		left: 35,
		top: 35,
		backgroundColor: '#5E5E5E',
		borderColor: theme.colors.white,
		borderWidth: 2,
		borderRadius: 7,
		position: 'absolute',
	},

	price_image_circle: {
		width: 14,
		height: 14,
		left: 35,
		top: 35,
		backgroundColor: '#53C351',
		borderColor: theme.colors.white,
		borderWidth: 2,
		borderRadius: 7,
		position: 'absolute',
	},

	price_image_inside: {
		fontStyle: 'normal',
		fontWeight: '700',
		fontSize: 18,
		lineHeight: 22,
		display: 'flex',
		alignItems: 'center',
		color: theme.colors.white,
	},

	sold_box_text_sup: {
		backgroundColor: theme.colors.blue,
		height: 10,
		width: 10,
		borderRadius: 12,
	},

	sold_box_text: {
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 17,
		letterSpacing: 0.2,
		color: theme.colors.white,
		textAlign: 'center',
	},

	sold_container_text: {
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 17,
		letterSpacing: 0.2,
		color: '#616161',
	},

	price_time_text: {
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 17,
		letterSpacing: 0.2,
		color: theme.colors.black,
	},

	price_image_container_main_item: {
		gap: 12,
		backgroundColor: '#EEEEEE',
		shadowColor: 'rgba(4, 6, 15, 0.05)',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 60,
		borderRadius: 8,
		elevation: 4,
	},

	price_image_container_main: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		width: '100%',
	},


	price_image_container5: {
		width: 48,
		height: 48,
		borderRadius: 50,
		backgroundColor: '#14539A',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},

	price_image_container3: {
		width: 48,
		height: 48,
		borderRadius: 50,
		backgroundColor: '#02393E',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},


	price_image_container: {
		width: 48,
		height: 48,
		borderRadius: 50,
		backgroundColor: '#6F4439',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	image: {
		width: 34.77,
		height: 34.77,
		borderRadius: 4,
	},

	price_container_Main: {
		flexDirection: 'column',
		gap: 5,
		width: '83%',
	},
	price_container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	price_container_text: {
		fontStyle: 'normal',
		fontWeight: '700',
		fontSize: 14,
		lineHeight: 17,
		display: 'flex',
		alignItems: 'center',
		color: '#212121',
		alignSelf: 'stretch',
	},
	sold_container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	columnWrapper: {

	},



	scrollViewContent: {
		paddingBottom: 100,

	},

	container: {
		flex: 1, // Allow the ScrollView to grow
		backgroundColor: theme.colors.white,
	},
});

