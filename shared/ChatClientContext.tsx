import React, { createContext, useContext, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatClientContext = createContext<any>(null);

// Function to retrieve chat configuration from AsyncStorage
const getChatConfig = async () => {
	try {
		const chatInfoString = await AsyncStorage.getItem('chatInfo');
		if (chatInfoString) {
			const chatInfo = JSON.parse(chatInfoString);
			return {
				chatApiKey: chatInfo.chatApiKey,
				chatUserId: chatInfo.chatUserId,
				chatUserName: chatInfo.chatUserName,
				chatUserToken: chatInfo.chatUserToken,
			};
		}
	} catch (error) {
	}
	return null;
};

export const ChatClientProvider: React.FC = ({ children }: any) => {
	const [chatClient, setChatClient] = useState<StreamChat | null>(null);

	useEffect(() => {
		const initializeChatClient = async () => {
			const config = await getChatConfig();
			if (config) {
				const client = StreamChat.getInstance(config.chatApiKey);
				try {
					await client.connectUser(
						{ id: config.chatUserId, name: config.chatUserName },
						config.chatUserToken
					);
					setChatClient(client);
				} catch (error) {
				}
			} else {
			}
		};

		initializeChatClient();
	}, []);

	return (
		<ChatClientContext.Provider value={chatClient}>
			{children}
		</ChatClientContext.Provider>
	);
};


export const useChatClient = () => {
	const context = useContext(ChatClientContext);
	if (!context) {
		throw new Error('useChatClient must be used within a ChatClientProvider');
	}
	return context;
};

