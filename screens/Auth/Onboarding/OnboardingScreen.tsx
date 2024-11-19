import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Platform } from 'react-native';
import { colors } from '../../../css/colorsIndex';
import { Text } from 'react-native-paper';
import OnboardingButton from './OnboardingButton';
import ONBOARDING4 from '../../../assets/onboarding/ONBOARDING4';
import ONBOARDING3 from '../../../assets/onboarding/ONBOARDING3';
import ONBOARDING2 from '../../../assets/onboarding/ONBOARDING2';
import ONBOARDING1 from '../../../assets/onboarding/ONBOARDING1';


const { width, height } = Dimensions.get('window');

interface ImageData {
	id: string;
	ids: string;
	image: JSX.Element;
	type: 'svg' | 'image';
	title: string;
	subtitle: string;
}

const images: ImageData[] = [
	{
		id: '11',
		ids: '42',
		image: <ONBOARDING1 width={width} height={height} />,
		type: 'svg',
		title: 'Find the best doctors in your vicinity',
		subtitle: 'With the help of our intelligent algorithm you can locate the best doctors within your vicinity with total ease',
	},
	{
		id: '23',
		ids: '54',
		image: <ONBOARDING2 width={width} height={height} />,
		type: 'svg',
		title: 'Waiting can be annoying',
		subtitle: 'Say goodbye to annoying long queues at the hospital and easily book and consult any medical practitioner of your choice on eezyhealth',
	},
	{
		id: '35',
		ids: '67',
		image: <ONBOARDING3 width={width} height={height} />,
		type: 'svg',
		title: 'Schedule online appointments',
		subtitle: 'Connect with your preferred doctor based on ratings and reviews and book your appointments hassle-free',
	},
	{
		id: '32',
		ids: '62',
		image: <ONBOARDING4 width={width} height={height} />,
		type: 'svg',
		title: 'Engage with patients globally',
		subtitle: 'With the help of our intelligent algorithm you can locate the best doctors within your vicinity with total ease',
	}
];

export default function OnboardingScreen() {
	const scrollRef = useRef<ScrollView | null>(null);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSelectedIndex(prev => {
				const newIndex = prev === images.length - 1 ? 0 : prev + 1;
				scrollRef.current?.scrollTo({ x: newIndex * width, animated: true });
				return newIndex;
			});
		}, 20000);
		return () => clearInterval(intervalId);
	}, []);

	const handleScrollEnd = (event: any) => {
		const contentOffset = event.nativeEvent.contentOffset;
		const viewSize = event.nativeEvent.layoutMeasurement;
		const index = Math.floor(contentOffset.x / viewSize.width);
		setSelectedIndex(index);
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				horizontal
				pagingEnabled
				onMomentumScrollEnd={handleScrollEnd}
				ref={scrollRef}>
				{images.map((image, i) => (
					<View key={i} style={styles.backgroundImage}>
						{image.image}
						<View style={styles.titleViewContainer}>
							<Text style={styles.title_two}>{image.title}</Text>
							<Text style={styles.title}>{image.subtitle}</Text>
						</View>
					</View>
				))}
			</ScrollView>

			<View style={styles.circleDiv}>
				{images.map((_, i) => (
					<View
						key={i}
						style={[
							styles.whiteCircle,
							{
								backgroundColor: i === selectedIndex ? colors.accent_green : colors.smail_text_color,
								width: i === selectedIndex ? 30 : 6,
							}
						]}
					/>
				))}
			</View>
			<OnboardingButton />
		</View>
	);
}

const styles = StyleSheet.create({
	title_two: {
		color: colors.black,
		fontWeight: "bold",
		fontSize: 18,
		fontFamily: 'Inter-Regular',
		textAlign: "center",
		paddingBottom: 20,
	},
	backgroundImage: {
		alignItems: 'center',
		width: width,
	},
	title: {
		color: colors.smail_text_color,
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: "center",
		fontFamily: 'Inter-Regular',
	},
	titleViewContainer: {
		position: "absolute",
		bottom: 0,
		flex: 1,
		justifyContent: 'flex-end',
		marginHorizontal: 10,
		marginBottom: Platform.OS === "ios" ? 140 : 110,
		padding: 20,
		textAlign: "center",
	},
	circleDiv: {
		position: "absolute",
		bottom: 110,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: 10,
	},
	whiteCircle: {
		width: 6,
		height: 6,
		borderRadius: 3,
		margin: 2,
		backgroundColor: colors.accent_green,
	}
});
