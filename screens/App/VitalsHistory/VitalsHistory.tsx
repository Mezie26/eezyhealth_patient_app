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
		// Fetch vitals history data when the component mounts
		const fetchVitalsHistory = async () => {
			try {
				const data: any = await getPatientVitalsHistory(user?.uid); // Pass userId to the function
				setVitalsHistory(data);
			} catch (error) {
				console.error("Error loading vitals history:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchVitalsHistory();
	}, [user?.uid]);



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
							<View style={styles.topCard}>
								<Text style={styles.infoText}>👤 Name: {item?.name}</Text>
								<TouchableOpacity onPress={toggleDropdown} style={styles.dropdown}>
									<Text style={styles.infoText}>View Vitals</Text>
									{isCollapsed ? <ChevronDown /> : <ChevronUp />}
								</TouchableOpacity>
							</View>

							{/* Collapsible FlatList to show vitals when expanded */}
							<Collapsible collapsed={isCollapsed}>
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
							</Collapsible>
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
		fontSize: 16,
		fontWeight: '500',
	},
	vitalValue: {
		fontSize: 16,
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
		padding: 20,
	},
	container: {
		flex: 1,
		backgroundColor: '#e0f7fa',
	},
	card: {
		backgroundColor: '#ffffff',
		padding: 15,
		borderRadius: 15,
		marginBottom: 15,
		borderColor: '#b2ebf2',
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
	},
	date: {
		fontSize: 16,
		fontWeight: '600',
		color: '#004d40',
		marginBottom: 10,
	},
	vitalRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 4,
	},
});

export default VitalsHistory;
