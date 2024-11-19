import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../css/colorsIndex';
import { useEffect, useState } from 'react';
import { getSurveyById } from '../../../hooks/getSurveyById';
import { ProgressBar } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { login } from '../../../features/authSlice';
import { ChevronDown } from '../../../assets/svg/ChevronDown';
import { ChevronUp } from '../../../assets/svg/ChevronUp';

const Medicalinfo = () => {
	const [surveyDatas, setSurveyData] = useState<any>({});
	const [error, setError] = useState(null);
	const [isLoading, setisLoading] = useState(false);
	const [activeSections, setActiveSections] = useState<string[]>([]); // Tracks open sections
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.auth);

	useEffect(() => {
		dispatch(login());
	}, [dispatch]); // Only dispatch is a dependency 
	const uid = user?.uid
	const surveyData = surveyDatas[0]




	useEffect(() => {
		const fetchSurvey = async () => {
			setisLoading(true);
			try {
				const data: any = await getSurveyById({ uid });
				setSurveyData(data);
				setisLoading(false);
			} catch (err: any) {
				setError(err.message);
				setisLoading(false);
			}
		};
		fetchSurvey();
	}, [uid]);

	// Toggle sections open or closed
	const toggleSection = (section: string) => {
		if (activeSections.includes(section)) {
			setActiveSections(activeSections.filter((s) => s !== section)); // Close section
		} else {
			setActiveSections([...activeSections, section]); // Open section
		}
	};

	const renderSectionHeader = (title: string, section: string) => {
		const isOpen = activeSections.includes(section);
		return (
			<TouchableOpacity onPress={() => toggleSection(section)} style={styles.header}>
				<Text style={styles.headerText}>{title}</Text>
				{isOpen ? <ChevronDown /> : <ChevronUp />}
			</TouchableOpacity>
		);
	};

	const renderSectionContent = (content: string) => {
		return (
			<View style={styles.content}>
				<Text style={styles.contentText}>{content || 'No information available.'}</Text>
			</View>
		);
	};

	return (
		<View style={styles.MainContainer}>
			{isLoading && <ProgressBar progress={0.3} color={colors.accent_green} indeterminate={isLoading} />}
			<ScrollView contentContainerStyle={styles.scrollViewContainer}>
				{/* Allergy Section */}
				{renderSectionHeader('Allergy', 'allergy')}
				<Collapsible collapsed={!activeSections.includes('allergy')}>
					{renderSectionContent(surveyData?.allergy)}
				</Collapsible>

				{/* Allergy Details Section */}
				{renderSectionHeader('Allergy Details', 'allergyDetails')}
				<Collapsible collapsed={!activeSections.includes('allergyDetails')}>
					{renderSectionContent(surveyData?.allergyDetails)}
				</Collapsible>

				{/* Chronic Disease Section */}
				{renderSectionHeader('Chronic Disease', 'chronicDisease')}
				<Collapsible collapsed={!activeSections.includes('chronicDisease')}>
					{renderSectionContent(surveyData?.chronicDisease)}
				</Collapsible>

				{/* Chronic Disease Details Section */}
				{renderSectionHeader('Chronic Disease Details', 'chronicDiseaseDetails')}
				<Collapsible collapsed={!activeSections.includes('chronicDiseaseDetails')}>
					{renderSectionContent(surveyData?.chronicDiseaseDetails)}
				</Collapsible>

				{/* Health Checkup Frequency Section */}
				{renderSectionHeader('Health Checkup Frequency', 'healthCheckupFrequency')}
				<Collapsible collapsed={!activeSections.includes('healthCheckupFrequency')}>
					{renderSectionContent(surveyData?.healthCheckupFrequency)}
				</Collapsible>

				{/* Health Status Section */}
				{renderSectionHeader('Health Status', 'healthStatus')}
				<Collapsible collapsed={!activeSections.includes('healthStatus')}>
					{renderSectionContent(surveyData?.healthStatus)}
				</Collapsible>

				{/* Hereditary Conditions Section */}
				{renderSectionHeader('Hereditary Conditions', 'hereditaryConditions')}
				<Collapsible collapsed={!activeSections.includes('hereditaryConditions')}>
					{renderSectionContent(surveyData?.hereditaryConditions)}
				</Collapsible>
			</ScrollView>
		</View>
	);
};

export default Medicalinfo;

const styles = StyleSheet.create({
	scrollViewContainer: {
		flexGrow: 1,
		padding: 20,
	},
	MainContainer: {
		flex: 1,
		backgroundColor: colors.white,

	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 15,
		paddingHorizontal: 10,
		backgroundColor: '#EEEEEE',
		borderRadius: 5,
		marginBottom: 20,
		alignItems: 'center',
	},
	headerText: {
		color: colors.black,
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	content: {
		padding: 10,
		backgroundColor: colors.white,
		borderRadius: 8,
		marginBottom: 15,
	},
	contentText: {
		color: colors.smail_text_color,
		fontSize: 14,
		fontFamily: 'Inter-Regular',
		lineHeight: 20,
	},
});
