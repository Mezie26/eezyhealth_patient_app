import { UserCircle } from "@/assets/svg/UserCircle";
import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { login, logoutUser } from '../../../features/authSlice';
import { colors } from "@/css/colorsIndex";
import { CalenderIcon3 } from "@/assets/svg/CalenderIcon3";
import BottomButton from "@/components/BottomButton";
import { useNavigation } from "@react-navigation/native";

const PersonalInformation = () => {
    const navigation: any = useNavigation();


    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: any) => state.auth);
    console.log("item--item", JSON.stringify(user, null, 2))
    useEffect(() => {
        dispatch(login());
    }, [dispatch]); // Only dispatch is a dependency

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
      
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = String(date.getFullYear()); // Get last two digits of the year
      
        return `${day}-${month}-${year}`;
      };

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Personal Information</Text>
            <View style={styles.profileContainer}>
                <View style={styles.profilePhotoContainer}>
                    {!user?.photo_url ? (
                        <UserCircle />
                    ) : (
                    <Image style={styles.image} source={{ uri: user?.photo_url }} />
                        )}
                </View>
                <Text style={styles.userName}>
                    {!user?.display_name ? "N/A" : `${user?.display_name}`}
                </Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10}}>
                <Text style={styles.userDetailsHeader}>Email</Text>
                <Text style={styles.userDetailsHeader}>Gender</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginBottom: 20}}>
                <Text style={styles.userDetailsText}>{user?.email}</Text>
                <Text style={styles.userDetailsText}>{user?.gender}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10}}>
                <Text style={styles.userDetailsHeader}>Address</Text>
                <Text style={styles.userDetailsHeader}>Contact Information</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginBottom: 20}}>
                <Text style={styles.userDetailsText}>{user?.address}</Text>
                <Text style={styles.userDetailsText}>{user?.phone_number}</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginVertical: 10}}>
                <Text style={styles.userDetailsHeader}>Date of Birth</Text>
                <Text style={styles.userDetailsHeader}>HMO</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginBottom: 20}}>
                <View style={{flexDirection: "row"}}>
                    <CalenderIcon3 />
                    <Text style={styles.userDetailsText}>{formatDate(user?.date_of_birth)}</Text>
                </View>
                <Text style={styles.userDetailsText}>{user?.hmo}</Text>
            </View>
            <BottomButton onPress={()=> navigation.navigate('EditAccount')} text={"Edit Profile"}/>
        </View>
    )
}

export default PersonalInformation;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileContainer: {
        alignItems: "center",
		justifyContent: "center",
        marginBottom: 20
    },
    headerText: {
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        color: "#171717",
        margin: 20
    },
    profilePhotoContainer: {
        width: 100,
        height: 100,
        borderRadius: 64,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.accent_green,
        padding: 1,
        margin: 10
    },
    image: {
        width: 100,
		height: 100,
		borderRadius: 64,
		resizeMode: 'cover'
    },
    userName: {
        color: colors.black,
		fontSize: 16,
		fontFamily: "Inter-Medium",
		fontWeight: "500",
		textAlign: "center",
		margin: 5,
		marginBottom: 4
    },
    userDetailsHeader: {
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        color: "#171717"
    },
    userDetailsText: {
        fontSize: 14,
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        color: "#363636"
    },

})