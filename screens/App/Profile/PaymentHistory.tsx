import React, { useEffect, useRef, useState } from "react";
import {
	StyleSheet,
	ScrollView,
	RefreshControl,
	SafeAreaView,
} from "react-native";
import { Dimensions, Text, View, } from "react-native";
export const WIDTH2 = Dimensions.get("window").width - 40;
export const arrow2 = Dimensions.get("window").width - 125;
import { DataTable, ProgressBar } from 'react-native-paper';
export const SLIDER_WIDTH = Dimensions.get("window").width - 80;
export const SLIDER_WIDTH2 = Dimensions.get("window").width - 250;
export const button = Dimensions.get("window").width - 300;
export const Height1 = Dimensions.get("window").height - 470;
export const Height2 = Dimensions.get("window").height - 330;
import * as Haptics from "expo-haptics";
import { Card } from "./TaskCard";
import { colors } from "../../../css/colorsIndex";
import Toast from "../../../components/Toast";
import { getPaymentDataByPaymentID } from "../../../hooks/getPayment";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { login } from "../../../features/authSlice";
import { Payment } from "../../../assets/svg/Payment";

const wait = (timeout: number | undefined) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};
const PaymentHistory = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.auth);
	useEffect(() => {
		dispatch(login());
	}, [dispatch]); // Only dispatch is a dependency 
	const [isLoading, setisLoading] = useState(false);
	const paymentID: any = user?.uid
	const [refreshing, setRefreshing] = React.useState(false);
	const [payments, setPayments] = useState<any>([]);
	const toastRef: any = useRef(null);


	const payment = payments?.filter((obj: any) => {
		return obj
	})



	const numberOfItemsPerPageList: any = [8, 5, 10, 15, 20, 50, 100];
	const [page, setPage] = React.useState(0);
	const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
	const from = page * numberOfItemsPerPage;
	const to = Math.min((page + 1) * numberOfItemsPerPage, payment?.length);

	React.useEffect(() => {
		setPage(0);
	}, [numberOfItemsPerPage]);
	const displayData = payment?.slice(from, from + numberOfItemsPerPage);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);




	useEffect(() => {
		setisLoading(true);

		if (paymentID) {
			const fetchPayments = async () => {
				try {
					const data = await getPaymentDataByPaymentID({ paymentID });

					if (Array.isArray(data)) {
						const filteredPayments = data.filter((obj: any) => obj);
						setPayments(filteredPayments);
					} else {
						setPayments([]);
					}
				} catch (error: any) {
					toastRef.current.error(error.message);
				} finally {
					setisLoading(false);
				}
			};

			fetchPayments();
		} else {
			setisLoading(false);
		}
	}, [paymentID]);

	// const handlePress = () => {
	// 	navigation.goBack();
	// 	Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	// };

	return (
		<SafeAreaView style={styles.paymentContainer} >
			{isLoading && <ProgressBar progress={0.3} color={colors.accent_green} indeterminate={isLoading} />}
			<Toast ref={toastRef} />
			<ScrollView style={styles.paymentScrollView}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				{/* @ts-ignore */}
				{isLoading ? "" : payment === undefined || payments.length === 0 ? <View style={styles.mainEmoji}>
					<Payment />
					<View>
						<Text style={styles.ticket}>No Data Found!</Text>
					</View>
				</View> : displayData?.map((item: any, i: any) => {
					return (
						<Card key={i} value={item} />
					)
				})}
			</ScrollView>

			{payment?.length > 8 ? <DataTable >
				<DataTable.Pagination
					style={styles.PaginationContainer}
					page={page}
					numberOfPages={Math.ceil(payment?.length / numberOfItemsPerPage)}
					onPageChange={page => setPage(page)}
					label={`${from + 1}-${to} of ${payment?.length}`}
					showFastPaginationControls
					numberOfItemsPerPageList={numberOfItemsPerPageList}
					numberOfItemsPerPage={numberOfItemsPerPage}
					onItemsPerPageChange={onItemsPerPageChange}
				// selectPageDropdownLabel={'Rows per page'}
				/>
			</DataTable> : ''}

		</SafeAreaView>
	);
};

export default PaymentHistory;

const styles = StyleSheet.create({

	PaginationContainer: {
		flexDirection: "row",
		fontSize: 8,
		justifyContent: "center",
		alignItems: "center",
	},

	flexcontainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
	paginatectn: { flexDirection: "row" },
	ticket: { color: colors.accent_green, fontFamily: "Poppins-SemiBold" },

	mainEmoji: {
		margin: 100,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},

	idcard: {
		color: colors.accent_green,
	},

	paymentScrollView: {
		// marginTop: 20,
		padding: 20,
	},


	paymentNameArrow: {
		position: "absolute",
		left: arrow2,
		marginTop: 4,
	},

	viewIcon: {
		backgroundColor: "#D9FDFB",
		height: 30,
		width: 30,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
	},

	paymentContainer: {
		flex: 1,
		backgroundColor: colors.white
	},
});




