import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CheckBox, LinearProgress, } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import { steps } from '../../../components/Data';
import { colors } from '../../../css/colorsIndex';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Toast from '../../../components/Toast';
import { createSurveys } from '../../../hooks/createSurveys';
import * as Haptics from 'expo-haptics';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { login } from '../../../features/authSlice';
import { Back } from '../../../assets/svg/Back';

const Questionaire = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.auth);

	useEffect(() => {
		dispatch(login());
	}, [dispatch]); // Only dispatch is a dependency 

	const toastRef: any = useRef(null);
	const navigation = useNavigation();
	const [progress, setProgress] = React.useState(0);
	const [isLoading, setisLoading] = useState(false);
	const [selectedIndex1, setIndex1] = React.useState<any>(null);
	const [selectedIndex2, setIndex2] = React.useState<any>(null);
	const [selectedIndex3, setIndex3] = React.useState<any>(null);
	const [selectedIndex4, setIndex4] = React.useState<any>(null);
	const [selectedIndex5, setIndex5] = React.useState<any>(null);
	const [next, setNext] = React.useState(1);
	const [questionaire, setQuestionaire] = useState({
		allergy: '',
		allergyDetails: '',
		chronicDisease: '',
		chronicDiseaseDetails: '',
		healthCheckupFrequency: '',
		healthStatus: '',
		hereditaryConditions: '',
		userId: user?.uid,
	});



	const handleCheckBoxPress = (index: number | React.SetStateAction<null>, field: string, value: string) => {
		switch (field) {
			case 'healthStatus':
				setIndex1(index);
				setQuestionaire({ ...questionaire, healthStatus: value });
				break;
			case 'hereditaryConditions':
				setIndex2(index);
				setQuestionaire({ ...questionaire, hereditaryConditions: value });
				break;
			case 'allergy':
				setIndex3(index);
				setQuestionaire({ ...questionaire, allergy: value });
				break;
			case 'chronicDisease':
				setIndex4(index);
				setQuestionaire({ ...questionaire, chronicDisease: value });
				break;
			case 'healthCheckupFrequency':
				setIndex5(index);
				setQuestionaire({ ...questionaire, healthCheckupFrequency: value });
				break;
			default:
				break;
		}
	};
	useEffect(() => {
		let count = 0;
		if (selectedIndex1 !== null) count++;
		if (selectedIndex2 !== null) count++;
		if (selectedIndex3 !== null) count++;
		if (selectedIndex4 !== null) count++;
		if (selectedIndex5 !== null) count++;
		setProgress(count / 5);
	}, [selectedIndex1, selectedIndex2, selectedIndex3, selectedIndex4, selectedIndex5]);

	const handleChange = (input: any, value: any) => {
		setQuestionaire((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const onHandleQuestionaire = async () => {
		setisLoading(true)
		createSurveys(questionaire)
			.then(response => {
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
				navigation.navigate('SuccessQuestionaire')
				setisLoading(false)
			})
			.catch(error => {
				setisLoading(false)
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)

			});

	}



	return (
		<SafeAreaView style={styles.container} >
			<Toast ref={toastRef} />
			<View style={styles.container_title}>
				{next === 3 &&
					<TouchableOpacity onPress={() => {
						Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
						setNext(next - 1);
					}}>
						<Back />
					</TouchableOpacity>
				}
				<View style={styles.container_title_main}>
					{steps[next - 1] && user?.display_name && (
						<View style={styles.container_p_title}>
							<Text style={styles.container_title_text}>
								{`${steps[next - 1].title}, ${user.display_name}`}
							</Text>
							<Text style={styles.container_title_p}>
								{steps[next - 1].description}
							</Text>
						</View>
					)}


					<LinearProgress
						value={progress}
						color={colors.accent_green}
						variant="determinate"
						style={{ marginTop: 20, }}
					/>
				</View>
				<ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollViewContainer}>
					{next === 1 ?
						<View>
							<View style={styles.container_title_check_Container}>
								<Text style={styles.container_title_text_check}>
									How healthy do you consider yourself?
								</Text>
								<View>
									<View style={styles.container_checkBox}>
										<CheckBox
											checked={selectedIndex1 === 0}
											onPress={() => handleCheckBoxPress(0, 'healthStatus', 'Very Healthy')}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											checkedColor={colors.accent_green}
										/>
										<Text>Very Healthy</Text>
									</View>
									<View style={styles.container_checkBox}>
										<CheckBox
											checked={selectedIndex1 === 1}
											onPress={() => handleCheckBoxPress(1, 'healthStatus', 'Healthy')}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											checkedColor={colors.accent_green}
										/>
										<Text>Healthy</Text>
									</View>
									<View style={styles.container_checkBox}>
										<CheckBox
											checked={selectedIndex1 === 2}
											onPress={() => handleCheckBoxPress(2, 'healthStatus', 'Unhealthy')}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											checkedColor={colors.accent_green}
										/>
										<Text>Unhealthy</Text>
									</View>
									<View style={styles.container_checkBox}>
										<CheckBox
											checked={selectedIndex1 === 3}
											onPress={() => handleCheckBoxPress(3, 'healthStatus', 'Don’t Know')}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											checkedColor={colors.accent_green}
										/>
										<Text>Don’t Know</Text>
									</View>
								</View>
							</View>
							<View style={styles.container_title_check_Container}>
								<Text style={styles.container_title_text_check}>
									How often do you get a health checkup?
								</Text>
								<View>
									<View style={styles.container_checkBox}>
										<CheckBox
											checked={selectedIndex5 === 0}
											onPress={() => handleCheckBoxPress(0, 'healthCheckupFrequency', 'Very often')}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											checkedColor={colors.accent_green}
										/>
										<Text>Very often</Text>
									</View>
									<View style={styles.container_checkBox}>
										<CheckBox
											checked={selectedIndex5 === 1}
											onPress={() => handleCheckBoxPress(1, 'healthCheckupFrequency', 'Whenever needed')}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											checkedColor={colors.accent_green}
										/>
										<Text>Whenever needed</Text>
									</View>
									<View style={styles.container_checkBox}>
										<CheckBox
											checked={selectedIndex5 === 2}
											onPress={() => handleCheckBoxPress(2, 'healthCheckupFrequency', 'Never')}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											checkedColor={colors.accent_green}
										/>
										<Text>Never</Text>
									</View>
									<View style={styles.container_checkBox}>
										<CheckBox
											checked={selectedIndex5 === 3}
											onPress={() => handleCheckBoxPress(3, 'healthCheckupFrequency', 'Other')}
											checkedIcon="dot-circle-o"
											uncheckedIcon="circle-o"
											checkedColor={colors.accent_green}
										/>
										<Text>Other</Text>
									</View>
								</View>
							</View>

						</View>
						: next === 2 ?
							<View>
								<View style={styles.container_title_check_Container}>
									<Text style={styles.container_title_text_check}>
										Do you have any allergy?
									</Text>
									<View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex3 === 0}
												onPress={() => handleCheckBoxPress(0, 'allergy', 'Yes')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Yes</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex3 === 1}
												onPress={() => handleCheckBoxPress(1, 'allergy', 'No')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>No</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex3 === 2}
												onPress={() => handleCheckBoxPress(2, 'allergy', 'Not Certain')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Not Certain</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex3 === 3}
												onPress={() => handleCheckBoxPress(3, 'allergy', 'Prefer not to say')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Prefer not to say</Text>
										</View>
									</View>
									<TextInput
										multiline
										numberOfLines={4}
										value={questionaire.allergyDetails}
										onChangeText={(text) => handleChange('allergyDetails', text)}
										style={styles.textArea}
										placeholder="Enter Allergy Details"
										placeholderTextColor="gray"
										onFocus={handleFocus}
										onBlur={handleBlur}
										// @ts-ignore 
										style={[styles.textArea, isFocused && styles.focusedStyle]}
									/>
								</View>

								<View style={styles.container_title_check_Container}>
									<Text style={styles.container_title_text_check}>
										Do you currently suffer from any chronic disease?
									</Text>
									<View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex4 === 0}
												onPress={() => handleCheckBoxPress(0, 'chronicDisease', 'Yes')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Yes</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex4 === 1}
												onPress={() => handleCheckBoxPress(1, 'chronicDisease', 'No')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>No</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex4 === 2}
												onPress={() => handleCheckBoxPress(2, 'chronicDisease', 'Prefer not to say')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Prefer not to say</Text>
										</View>
									</View>
								</View>
							</View>
							: next === 3 &&
							<View>

								<View style={styles.container_title_check_Container}>
									<Text style={styles.container_title_text_check}>
										Hereditary Conditions/Diseases
									</Text>
									<View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex2 === 0}
												onPress={() => handleCheckBoxPress(0, 'hereditaryConditions', 'Diabetes')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Diabetes</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex2 === 1}
												onPress={() => handleCheckBoxPress(1, 'hereditaryConditions', 'High Blood Pressure')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>High Blood Pressure</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex2 === 2}
												onPress={() => handleCheckBoxPress(2, 'hereditaryConditions', 'Asthma')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Asthma</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex2 === 3}
												onPress={() => handleCheckBoxPress(3, 'hereditaryConditions', 'Heart Disease')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Heart Disease</Text>
										</View>
										<View style={styles.container_checkBox}>
											<CheckBox
												checked={selectedIndex2 === 4}
												onPress={() => handleCheckBoxPress(4, 'hereditaryConditions', 'Other (Please Specify)')}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.accent_green}
											/>
											<Text>Other (Please Specify)</Text>
										</View>
									</View>
									<TextInput
										multiline
										numberOfLines={4}
										value={questionaire.chronicDiseaseDetails}
										onChangeText={(text) => handleChange('chronicDiseaseDetails', text)}
										style={styles.textArea}
										placeholder="Enter Chronic DiseaseDetails"
										placeholderTextColor="gray"
										onFocus={handleFocus}
										onBlur={handleBlur}
										// @ts-ignore 
										style={[styles.textArea, isFocused && styles.focusedStyle]}
									/>
								</View>
							</View>
					}
				</ScrollView>
			</View>

			<View style={styles.container_back}>
				{next === 3 ?
					< View style={styles.container_back_next_one}>
						<TouchableOpacity onPress={onHandleQuestionaire} style={styles.buttonContainer}>
							<Text style={styles.buttonText}>
								{isLoading ?
									<ActivityIndicator
										color='white'
										size={20} /> :
									"Finish"}
							</Text>
						</TouchableOpacity>
					</View>
					:
					<View style={styles.container_back_next}>
						<TouchableOpacity
							onPress={() => setNext(next - 1)}
							disabled={next === 1}
						>
							<Text style={[styles.next, { color: next === 1 ? 'gray' : 'green' }]}>Back</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setNext(next + 1)}
							disabled={next === 3}
						>
							<Text style={[styles.next, { color: next === 3 ? 'gray' : 'green' }]}>Next</Text>
						</TouchableOpacity>
					</View>
				}
			</View>

		</SafeAreaView>
	);
};

export default Questionaire

const styles = StyleSheet.create({

	next: {
		fontSize: 18,
	},

	container_back: {
		height: 50,
		position: "absolute",
		bottom: 0,
		width: "100%",
	},

	container_back_next_one: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 20,
		paddingTop: 30,
		paddingBottom: 50,
		position: "absolute",
		bottom: 0,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "rgba(31, 31, 31, 0.08)",
		height: 50,
		zIndex: 100
	},

	buttonText: {
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: 0.005,
		color: '#FFFFFF',
	},
	buttonContainer: {
		width: "100%",
		height: 40,
		padding: 10,
		backgroundColor: colors.accent_green,
		borderRadius: 90,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: colors.accent_green_light,
		shadowOffset: {
			width: 4,
			height: 8,
		}

	},
	focusedStyle: {
		borderColor: colors.accent_green,
		borderBottomWidth: 0,
		borderBottomColor: colors.accent_green,
	},
	textArea: {
		borderBottomColor: colors.accent_green,
		borderWidth: 1,
		borderColor: colors.accent_green,
		borderRadius: 5,
		paddingHorizontal: 10,
		backgroundColor: 'white',
		fontSize: 16,
		minHeight: 100,
	},

	checkboxContainer: {
		backgroundColor: 'transparent',

	},
	container_title_main: {
		paddingHorizontal: 10,
	},
	scrollViewContainer: {
		flexGrow: 1,
		paddingBottom: 120,
		marginHorizontal: 10,
	},

	container_back_next: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 20,
		gap: 60,
		marginBottom: 40,
		position: "absolute",
		bottom: 0,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "rgba(31, 31, 31, 0.08)",
		height: 50,
		zIndex: 100
	},

	container_checkBox: {
		flexDirection: "row",
		alignItems: "center",
	},

	container_title_check_Container: {
		marginTop: 20
	},

	container_title_text_check: {
		fontStyle: "normal",
		fontFamily: "Poppins-Medium",
		fontSize: 15,
		lineHeight: 20,
		letterSpacing: -0.5,
		color: "#000000",


	},

	container_p_title: {
		marginTop: 20
	},

	container_title_p: {
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: 12,
		lineHeight: 20,
		letterSpacing: -0.5,
		color: "rgba(31, 31, 31, 0.86)",
	},
	container_title_text: {
		fontStyle: "normal",
		fontWeight: 500,
		fontSize: 24,
		// lineHeight: 20,
		letterSpacing: -0.5,
		color: "#000",
	},
	container_title: {
		marginTop: 10,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})