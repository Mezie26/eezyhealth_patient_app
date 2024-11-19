import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import { View, Animated, Text, StatusBar, StyleSheet } from 'react-native';
import { colors } from '../css/colorsIndex';

const Toast = forwardRef((props, ref) => {
	const animatedValue = useRef(new Animated.Value(0)).current;
	const [modalShown, setModalShown] = useState(false);
	const [message, setMessage] = useState('Success!');
	const [toastColor, setToastColor] = useState('green');
	const [textColor, setTextColor] = useState('black');

	const closeToast = () => {
		setTimeout(() => {
			Animated.timing(animatedValue, {
				toValue: 0,
				duration: 350,
				useNativeDriver: false,
			}).start(() => {
				StatusBar.setBarStyle('default');
				setModalShown(false);
			});
		}, 5000);
	};

	const callToast = (message: string | undefined, type: string | undefined) => {
		if (modalShown) return;
		setToastType(message, type);
		setModalShown(true);
		Animated.timing(animatedValue, {
			toValue: 1,
			duration: 350,
			useNativeDriver: false,
		}).start(closeToast);
	};

	let animation = animatedValue.interpolate({
		inputRange: [0, 0.3, 1],
		outputRange: [-100, -10, 0],
	});

	useImperativeHandle(ref, () => ({
		success(message: string | undefined) {
			callToast(message, 'success');
			StatusBar.setBarStyle('dark-content');
		},
		error(message: string | undefined) {
			callToast(message, 'error');
			StatusBar.setBarStyle('light-content');
		},
	}));

	const setToastType = (message = 'Success!', type = 'success') => {
		let color;
		let textColorValue;
		if (type == 'error') {
			color = 'red';
			textColorValue = 'white';
			setToastColor("#f1d4d4");
			setTextColor("#FF0000")
		}
		if (type == 'success') {
			color = '#43CE2E';
			textColorValue = 'white';
			setToastColor("#e8f2e7");
			setTextColor("#43CE2E")
		}
		setMessage(message);

	};

	return modalShown ? (
		<Animated.View style={[styles.container, { backgroundColor: toastColor, transform: [{ translateY: animation }] }]}>
			<View style={styles.row}>
				<Text style={[styles.message, { color: textColor }]}>{message}</Text>
			</View>
		</Animated.View>
	) : null;
});

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		top: 0,
		minHeight: 100,
		width: '100%',
		zIndex: 210000000000,
		justifyContent: 'flex-end',
		padding: 14,
		shadowColor: colors.black,
		shadowOffset: {
			width: 4,
			height: 5,
		},
		shadowOpacity: 0.1,
		shadowRadius: 6.27,
		elevation: 10,
	},
	message: {
		fontSize: 16,
		color: 'black',
		fontFamily: 'Inter-Regular',
		fontWeight: '600',
		lineHeight: 20,
		marginTop: 60,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: "center",

	},
});

export default Toast;