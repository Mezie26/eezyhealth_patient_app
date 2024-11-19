import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rating = ({ rating = 0 }) => {


	const renderFractionalStars = () => {
		const fractionalRating: any = (rating % 1).toFixed(1); // Get the decimal part
		const wholeStars = Math.floor(rating); // Get the integer part

		return (
			<View style={styles.starsContainer}>
				{[...Array(wholeStars)].map((_, index) => (
					<Text key={index} style={styles.filledStar}>★</Text>
				))}
				{fractionalRating >= 0.5 && (
					<Text style={styles.halfStar}>★</Text>
				)}
				{fractionalRating < 0.5 && fractionalRating > 0 && (
					<Text style={styles.quarterStar}>★</Text>
				)}
				{[...Array(5 - wholeStars - (fractionalRating >= 0.5 ? 1 : 0))].map((_, index) => (
					<Text key={index + wholeStars + (fractionalRating >= 0.5 ? 1 : 0)} style={styles.emptyStar}>★</Text>
				))}
			</View>
		);
	};

	return (
		<View>
			{renderFractionalStars()}
		</View>
	);
};

const styles = StyleSheet.create({

	starsContainer: {
		flexDirection: 'row',
		marginBottom: 16,
	},

	filledStar: {
		color: '#ffcc00',
		fontSize: 18,

	},
	halfStar: {
		color: '#ffcc00',
	},
	quarterStar: {
		color: '#ffcc00',
		opacity: 0.5,
		fontSize: 18,
	},
	emptyStar: {
		color: '#ccc',
		fontSize: 18,
	},



});

export default Rating;
