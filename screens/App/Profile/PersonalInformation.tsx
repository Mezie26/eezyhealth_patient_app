import { UserCircle } from "@/assets/svg/UserCircle";
import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { login, logoutUser } from '../../../features/authSlice';
import { colors } from "@/css/colorsIndex";

const PersonalInformation = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: any) => state.auth);
    console.log("item--item", JSON.stringify(user, null, 2))
    useEffect(() => {
        dispatch(login());
    }, [dispatch]); // Only dispatch is a dependency

    return(
        <View>
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
        </View>
    )
}

export default PersonalInformation;

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: "center",
		justifyContent: "center",
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
		margin: 15,
		marginBottom: 4
    }

})