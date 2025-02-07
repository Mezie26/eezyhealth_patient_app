import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getPatientVitalsHistory } from '../../../hooks/getPatientVitalsHistory';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../../css/colorsIndex';
import Collapsible from 'react-native-collapsible';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { login } from '../../../features/authSlice';
import { ChevronDown } from '../../../assets/svg/ChevronDown';
import { ChevronUp } from '../../../assets/svg/ChevronUp';
import { NotInterested } from '../../../assets/svg/NotInterested';
import { CalenderIcon4 } from '@/assets/svg/CalenderIcon4';

const VitalsHistory = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.auth);
	useEffect(() => {
		dispatch(login());
	}, [dispatch]); // Only dispatch is a dependency
	const [vitalsHistory, setVitalsHistory] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isCollapsed, setIsCollapsed] = useState(true);

	const toggleDropdown = () => {
		setIsCollapsed(!isCollapsed);
	};

	useEffect(() => {
		//console.log("userid", user.uid)
		// Fetch vitals history data when the component mounts
		const fetchVitalsHistory = async () => {
			try {
				const data: any = await getPatientVitalsHistory("3wu8rn5CE7OBIGNKzWH13z8ewY43"); // Pass userId to the function
				setVitalsHistory(data);
				//console.log("item-||-item", JSON.stringify(data, null, 2))
			} catch (error) {
				console.error("Error loading vitals history:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchVitalsHistory();
	}, [user?.uid]);

	const COLORS = ["#DAFFF6", "#D7EDFF", "#FFE2EB"];

	const getBackgroundColor = (index: any) => COLORS[index % COLORS.length];

	const textColors = ["#119978", "#155F9C", "#E7326A"];

	const getTextColors = (index: any) => textColors[index % textColors.length];

	return (
		<View style={styles.container}>
			{isLoading && <ProgressBar progress={0.3} color={colors.accent_green} indeterminate={isLoading} />}
			<View style={styles.container_sub}>
				{vitalsHistory.length === 0 ? (
					<View style={styles.iconContainer}>
						<NotInterested />
						<Text style={styles.noDataText}>No Vitals Available</Text>
					</View>
				) : (
					vitalsHistory?.map((item, index) => (
						<View key={index}>
							{/*<View style={styles.topCard}>
								<Text style={styles.infoText}>👤 Name: {item?.name}</Text>
								<TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
									<Text style={styles.infoText}>View Vitals</Text>
									{isCollapsed ? <ChevronDown /> : <ChevronUp />}
								</TouchableOpacity>
							</View>

							{/* Collapsible FlatList to show vitals when expanded */}
							{/*<Collapsible collapsed={isCollapsed}>
								<FlatList
									data={item.vitals}
									keyExtractor={(vital, index) => index.toString()}
									renderItem={({ item: vital }: any) => (
										<View style={styles.card}>
											<Text style={styles.date}>📅 {new Date(vital.date.seconds * 1000).toLocaleDateString()}</Text>
											<View style={styles.vitalRow}>
												<Text style={styles.vitalLabel}>Temperature:</Text>
												<Text style={[styles.vitalValue, { color: '#ff7043' }]}>{vital.temperature}°F</Text>
											</View>
											<View style={styles.vitalRow}>
												<Text style={styles.vitalLabel}>Pulse:</Text>
												<Text style={[styles.vitalValue, { color: '#42a5f5' }]}>{vital.pulse} BPM</Text>
											</View>
											<View style={styles.vitalRow}>
												<Text style={styles.vitalLabel}>Blood Pressure:</Text>
												<Text style={[styles.vitalValue, { color: '#8e24aa' }]}>{vital.bloodPressure}</Text>
											</View>
											<View style={styles.vitalRow}>
												<Text style={styles.vitalLabel}>Breathing Rate:</Text>
												<Text style={[styles.vitalValue, { color: '#26a69a' }]}>{vital.breathingRate} breaths/min</Text>
											</View>
										</View>
									)}
								/>
							</Collapsible>*/}
							<FlatList
									data={item.vitals}
									keyExtractor={(vital, index) => index.toString()}
									renderItem={({ item: vital, index }: any) => (
										<View style={[styles.card, { backgroundColor: getBackgroundColor(index) }]}>
											<View style={{flexDirection: "row", marginBottom: 4, alignItems: "center"}}>
												<CalenderIcon4 color={getTextColors(index)} />
												<Text style={[styles.date, { color: getTextColors(index) }]}>{new Date(vital.date.seconds * 1000).toLocaleDateString()}</Text>
											</View>
											<View style={styles.vitalRow}>
												<Text style={[styles.vitalLabel, { color: getTextColors(index) }]}>Temperature:</Text>
												<Text style={[styles.vitalValue, { color: getTextColors(index) }]}>{vital.temperature} °C</Text>
											</View>
											<View style={styles.vitalRow}>
												<Text style={[styles.vitalLabel, { color: getTextColors(index) }]}>Weight:</Text>
												<Text style={[styles.vitalValue, { color: getTextColors(index) }]}>?? kg</Text>
											</View>
											<View style={styles.vitalRow}>
												<Text style={[styles.vitalLabel, { color: getTextColors(index) }]}>Pulse:</Text>
												<Text style={[styles.vitalValue, { color: getTextColors(index) }]}>{vital.pulse} bpm</Text>
											</View>
											<View style={styles.vitalRow}>
												<Text style={[styles.vitalLabel, { color: getTextColors(index) }]}>Blood Pressure:</Text>
												<Text style={[styles.vitalValue, { color: getTextColors(index) }]}>{vital.bloodPressure}/?? mm/Hg</Text>
											</View>
										</View>
									)}
									inverted={true}
								/>
						</View>
					))
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	topCard: {
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		marginBottom: 20
	},
	infoText: {
		fontSize: 16,
		marginBottom: 5,
	},
	dropdown: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	vitalLabel: {
		fontSize: 12,
		fontWeight: '400',
		fontFamily: "Inter-Regular",
		lineHeight: 20,
		letterSpacing: -0.5
	},
	vitalValue: {
		fontSize: 14,
		fontFamily: "Inter-Medium",
		fontWeight: "500",
		lineHeight: 20,
		letterSpacing: -0.5
	},
	iconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noDataText: {
		fontSize: 18,
		color: 'gray',
		marginTop: 10,
	},
	container_sub: {
		flex: 1,
		padding: 20,
		marginTop: 20
	},
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		//justifyContent: "center",
		//alignItems: "center",
	},
	card: {
		//backgroundColor: '#ffffff',
		height: 148,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		marginBottom: 15,
		//borderColor: '#b2ebf2',
		//borderWidth: 1,
		//shadowColor: '#000',
		//shadowOffset: { width: 0, height: 2 },
		//marginTop: 20
	},
	date: {
		fontSize: 14,
		fontWeight: '600',
		fontFamily: "Inter-Regular",
		letterSpacing: -0.5,
		marginHorizontal: 5,
	},
	vitalRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 2,
		//color: "#FFFFFF"
	},
});

export default VitalsHistory;
