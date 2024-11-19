import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const ToggleSwitch = () => {
	const [isEnabled, setIsEnabled] = useState(false);

	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState);
	};

	return (
		<View style={styles.container}>
			<Switch
				trackColor={{ false: '#767577', true: '#34C759' }}
				thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontSize: 20,
		marginBottom: 10,
	},
});

export default ToggleSwitch;
