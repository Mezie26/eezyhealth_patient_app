import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Platform } from 'react-native';
import { colors } from '../../../css/colorsIndex';
import { Text } from 'react-native-paper';
import OnboardingButton from './OnboardingButton';
import ONBOARDING4 from '../../../assets/onboarding/ONBOARDING4';
import ONBOARDING3 from '../../../assets/onboarding/ONBOARDING3';
import ONBOARDING2 from '../../../assets/onboarding/ONBOARDING2';
import ONBOARDING1 from '../../../assets/onboarding/ONBOARDING1';
import OnboardingImage1 from '@/assets/onboarding/OnboardingImage1';
import OnboardingImage2 from '@/assets/onboarding/OnboardingImage2';
import OnboardingImage3 from '@/assets/onboarding/OnboardingImage3';
import OnboardingImage4 from '@/assets/onboarding/OnboardingImage4';
import BottomButton from '@/components/BottomButton';
import { useNavigation } from '@react-navigation/native';


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
		image: <OnboardingImage1 width={width} height={height} />,
		type: 'svg',
		title: 'Find the best doctors in your vicinity',
		subtitle: 'With the help of our intelligent algorithm you can locate the best doctors within your vicinity with  total ease',
	},
	{
		id: '23',
		ids: '54',
		image: <OnboardingImage2 width={width} height={height} />,
		type: 'svg',
		title: 'Say goodbye to long waits.',
		subtitle: 'Book appointments and consult with top doctors conveniently on eezyhealth.',
	},
	{
		id: '35',
		ids: '67',
		image: <OnboardingImage3 width={width} height={height} />,
		type: 'svg',
		title: 'Schedule online appointments',
		subtitle: 'Find and book appointments with doctors you trust, based on real patient reviews.',
	}
];

export default function OnboardingScreen() {
	const scrollRef = useRef<ScrollView | null>(null);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const navigation: any = useNavigation();

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
			{/*<OnboardingButton />*/}
			<BottomButton onPress={()=> navigation.navigate('SignUp')} text={"Get Started"}/>
		</View>
	);
}

const styles = StyleSheet.create({
	title_two: {
		color: "#171717",
		fontWeight: "500",
		fontSize: 16,
		fontFamily: 'Inter-Medium',
		textAlign: "center",
		paddingBottom: 20,
		lineHeight: 24,
		letterSpacing: -0.5
	},
	backgroundImage: {
		alignItems: 'center',
		width: width,
		marginTop: 200,
		marginBottom: 50,
	},
	title: {
		color: "#646464",
		fontSize: 14,
		fontWeight: "400",
		textAlign: "center",
		fontFamily: 'Inter-Regular',
		lineHeight: 22,
		letterSpacing: -0.5
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
