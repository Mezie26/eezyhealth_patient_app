import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import { Channel, MessageList, MessageInput, Chat } from "stream-chat-expo";
import { useRoute } from "@react-navigation/native";
import { StreamChat } from "stream-chat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from "../../../css/colorsIndex";

const ChannelScreen: React.FC = () => {
	const [chatClient, setChatClient] = useState<StreamChat | null>(null);
	const [channel, setChannel] = useState<any>(null);
	const route = useRoute();
	const { channelId }: any = route.params;

	useEffect(() => {
		const initializeChat = async () => {
			try {
				// Fetch stored chat info
				const chatInfoString = await AsyncStorage.getItem('chatInfo');
				if (chatInfoString) {
					const chatConfig = JSON.parse(chatInfoString);
					// Get the chat client instance
					const client = StreamChat.getInstance(chatConfig.chatApiKey);



					// Fetch the channel based on the channelId
					const selectedChannel = client.channel("messaging", channelId);
					await selectedChannel.watch();

					setChatClient(client); // Set the chat client
					setChannel(selectedChannel); // Set the selected channel
				}
			} catch (error) {
				console.error('Error loading channel:', error);
			}
		};

		initializeChat();
	}, [channelId]);

	if (!chatClient || !channel) {
		// Loading state until the chat client and channel are set
		return (
			<SafeAreaView>
				<ActivityIndicator size="large" />
			</SafeAreaView>
		);
	}

	return (
		// Ensure that everything chat-related is wrapped inside the Chat provider
		<Chat client={chatClient}>
			<SafeAreaView style={styles.container}>
				<Channel channel={channel}>
					<MessageList />
					<MessageInput />
				</Channel>
			</SafeAreaView>
		</Chat>
	);
};

export default ChannelScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
});
