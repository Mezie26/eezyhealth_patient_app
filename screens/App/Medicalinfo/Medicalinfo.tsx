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
import { InfoLightIcon1 } from '@/assets/svg/InfoLightIcon1';

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
				//console.log("item-|-item", JSON.stringify(data, null, 2))
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
				{isOpen ? <ChevronUp /> : <ChevronDown />}
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
			<View style={{flexDirection: "row", margin: 20}}>
				<InfoLightIcon1 />
				<Text style={styles.titleText}>Last updated: Date??. Please keep your medical record up to date</Text>
			</View>
			<ScrollView contentContainerStyle={styles.scrollViewContainer}>

				{/* Allergy Details Section */}
				{renderSectionHeader('Allergies', 'allergyDetails')}
				<Collapsible collapsed={!activeSections.includes('allergyDetails')}>
					{renderSectionContent(surveyData?.allergyDetails)}
				</Collapsible>

				{/* Chronic Disease Details Section */}
				{renderSectionHeader('Current Medication', 'chronicDiseaseDetails')}
				<Collapsible collapsed={!activeSections.includes('chronicDiseaseDetails')}>
					{renderSectionContent(surveyData?.chronicDiseaseDetails)}
				</Collapsible>

				{/* Chronic Disease Section */}
				{renderSectionHeader('Medical Condition', 'chronicDisease')}
				<Collapsible collapsed={!activeSections.includes('chronicDisease')}>
					{renderSectionContent(surveyData?.chronicDisease)}
				</Collapsible>

				{/* Health Checkup Frequency Section */}
				{renderSectionHeader('Past Surgeries & Procedures', 'healthCheckupFrequency')}
				<Collapsible collapsed={!activeSections.includes('healthCheckupFrequency')}>
					{renderSectionContent(surveyData?.healthCheckupFrequency)}
				</Collapsible>

				{/* Health Status Section */}
				{renderSectionHeader('Life Style', 'healthStatus')}
				<Collapsible collapsed={!activeSections.includes('healthStatus')}>
					{renderSectionContent(surveyData?.healthStatus)}
				</Collapsible>

				{/* Hereditary Conditions Section */}
				{renderSectionHeader('Family History', 'hereditaryConditions')}
				<Collapsible collapsed={!activeSections.includes('hereditaryConditions')}>
					{renderSectionContent(surveyData?.hereditaryConditions)}
				</Collapsible>

				
				
				{/* Allergy Section */}
				{/*{renderSectionHeader('Allergy', 'allergy')}
				<Collapsible collapsed={!activeSections.includes('allergy')}>
					{renderSectionContent(surveyData?.allergy)}
				</Collapsible>

				{/* Allergy Details Section */}
				{/*{renderSectionHeader('allergyDetails', 'allergyDetails')}
				<Collapsible collapsed={!activeSections.includes('allergyDetails')}>
					{renderSectionContent(surveyData?.allergyDetails)}
				</Collapsible>

				{/* Chronic Disease Section */}
				{/*{renderSectionHeader('Chronic Disease', 'chronicDisease')}
				<Collapsible collapsed={!activeSections.includes('chronicDisease')}>
					{renderSectionContent(surveyData?.chronicDisease)}
				</Collapsible>

				{/* Chronic Disease Details Section */}
				{/*{renderSectionHeader('Chronic Disease Details', 'chronicDiseaseDetails')}
				<Collapsible collapsed={!activeSections.includes('chronicDiseaseDetails')}>
					{renderSectionContent(surveyData?.chronicDiseaseDetails)}
				</Collapsible>

				{/* Health Checkup Frequency Section */}
				{/*{renderSectionHeader('Health Checkup Frequency', 'healthCheckupFrequency')}
				<Collapsible collapsed={!activeSections.includes('healthCheckupFrequency')}>
					{renderSectionContent(surveyData?.healthCheckupFrequency)}
				</Collapsible>

				{/* Health Status Section */}
				{/*{renderSectionHeader('Health Status', 'healthStatus')}
				<Collapsible collapsed={!activeSections.includes('healthStatus')}>
					{renderSectionContent(surveyData?.healthStatus)}
				</Collapsible>

				{/* Hereditary Conditions Section */}
				{/*{renderSectionHeader('Hereditary Conditions', 'hereditaryConditions')}
				<Collapsible collapsed={!activeSections.includes('hereditaryConditions')}>
					{renderSectionContent(surveyData?.hereditaryConditions)}
				</Collapsible>*/}
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
		height: 40,
		justifyContent: 'space-between',
		paddingVertical: 10,
		paddingHorizontal: 14,
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		marginBottom: 20,
		alignItems: 'center',
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		shadowColor: '#000', // Equivalent to the color in the box-shadow
		shadowOffset: { width: 0, height: 1 }, // Matches the (x, y) offset
    	shadowOpacity: 0.15, // Approximate opacity from #00000026
    	shadowRadius: 4, // Approximate blur radius
    	elevation: 4, // Android-specific shadow
	},
	headerText: {
		color: "#363636",
		fontSize: 12,
		fontFamily: 'Inter-Regular',
		fontWeight: "400"
	},
	content: {
		height: 28,
		//padding: 10,
		paddingVertical: 4,
		paddingHorizontal: 16,
		backgroundColor: "#F9F9F9",
		borderRadius: 8,
		marginBottom: 20,
	},
	contentText: {
		color: "#363636",
		fontSize: 12,
		fontFamily: 'Inter-Regular',
		fontWeight: "400",
		lineHeight: 20,
	},
	titleText: {
		fontSize: 12,
		fontWeight: '400',
		fontFamily: "Inter-Regular",
		color: "#363636",
		marginHorizontal: 10
	}
});
