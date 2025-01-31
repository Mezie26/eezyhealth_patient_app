import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rating = ({ rating = 0 }) => {


	const renderFractionalStars = () => {
		const fractionalRating: any = (rating % 1).toFixed(1); // Get the decimal part
		const wholeStars = Math.floor(rating); // Get the integer part

		return (
			<View style={styles.starsContainer}>
				<Text style={styles.filledStar}>★</Text>
				<Text style={styles.RatingText}> ??</Text>
				{/*<View style={{ width: 1, height: 12, backgroundColor: "#D5D5D5", margin: 4, marginHorizontal: 10}}></View>*/}
				
				{/*{[...Array(wholeStars)].map((_, index) => (
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
				))}*/}
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
		//marginBottom: 6,
		//alignItems: "flex-end"
	},

	filledStar: {
		color: '#FFD700',
		fontSize: 16,
		marginLeft: -3

	},

	RatingText: {
		fontSize: 12,
		fontWeight: 400,
		fontFamily: "Inter-Regular",
		margin: 3
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
