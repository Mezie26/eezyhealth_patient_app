import { Dimensions, View, Image } from "react-native";

const windowWidth = Dimensions.get('window').width * 0.6;
const windowHeight = Dimensions.get('window').height * 0.2;

export const AppLoadingScreen = () => {


	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
			{/* Your loading image */}
			<Image source={require('../../assets/adaptive-icon.png')} style={{ width: windowWidth, height: windowHeight }} resizeMode="contain" />
		</View>
	);
};