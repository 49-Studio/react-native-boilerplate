import { colors, fonts, sizes } from 'assets';
import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	flex: {
		flex: 1,
	},
	txtCenter: {
		textAlign: 'center',
	},
	fontRegular: {
		fontFamily: fonts.regular,
	},
	fontMedium: {
		fontFamily: fonts.medium,
	},
	fontBold: {
		fontFamily: fonts.bold,
	},
	h1: {
		fontSize: sizes.s32,
		fontFamily: fonts.bold,
		lineHeight: sizes.s40,
		color: colors.title,
	},
	h2: {
		fontSize: sizes.s24,
		fontFamily: fonts.bold,
		lineHeight: sizes.s32,
		color: colors.title,
	},
	h3_bold: {
		fontSize: sizes.s20,
		fontFamily: fonts.bold,
		lineHeight: sizes.s28,
		color: colors.title,
	},
	h3_medium: {
		fontSize: sizes.s20,
		fontFamily: fonts.medium,
		lineHeight: sizes.s28,
		color: colors.title,
	},
	border: {
		borderWidth: sizes.s1,
		borderColor: colors.border,
		borderRadius: sizes.s12,
	},
	shadow3: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	shadow5: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	shadow10: {
		shadowColor: 'rgba(0, 0, 0, 0.08)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},
	content14: {
		fontSize: sizes.s14,
		fontFamily: fonts.regular,
		color: colors.title,
		lineHeight: sizes.s20,
	},
	txt12: {
		fontSize: sizes.s12,
		fontFamily: fonts.regular,
		lineHeight: sizes.s16,
		color: colors.black,
	},
	txt12_white: {
		ontSize: sizes.s12,
		fontFamily: fonts.regular,
		lineHeight: sizes.s16,
		color: colors.white,
	},
	txt12_secondary: {
		fontSize: sizes.s12,
		fontFamily: fonts.regular,
		lineHeight: sizes.s16,
		color: colors.secondary_text,
	},
	txt12_disable: {
		fontSize: sizes.s12,
		fontFamily: fonts.regular,
		lineHeight: sizes.s16,
		color: colors.disable_text,
	},
	txt12_error: {
		fontSize: sizes.s12,
		fontFamily: fonts.regular,
		lineHeight: sizes.s16,
		color: colors.error,
	},
	txt14: {
		fontSize: sizes.s14,
		fontFamily: fonts.medium,
		lineHeight: sizes.s20,
		color: colors.black,
	},
	txt14_primary: {
		fontSize: sizes.s14,
		fontFamily: fonts.medium,
		lineHeight: sizes.s20,
		color: colors.primary,
	},
	txt14_error: {
		fontSize: sizes.s14,
		fontFamily: fonts.medium,
		lineHeight: sizes.s20,
		color: colors.error,
	},
	txt14_primary_text: {
		fontSize: sizes.s14,
		fontFamily: fonts.medium,
		lineHeight: sizes.s20,
		color: colors.primary_text,
	},
	txt14_white: {
		fontSize: sizes.s14,
		fontFamily: fonts.medium,
		lineHeight: sizes.s20,
		color: colors.white,
	},
	txt14_secondary: {
		fontSize: sizes.s14,
		fontFamily: fonts.medium,
		lineHeight: sizes.s20,
		color: colors.secondary_text,
	},
	txt16: {
		fontSize: sizes.s16,
		fontFamily: fonts.medium,
		lineHeight: sizes.s24,
		color: colors.black,
	},
	txt16_regular: {
		fontSize: sizes.s16,
		fontFamily: fonts.regular,
		lineHeight: sizes.s24,
		color: colors.black,
	},
	txt16_secondary: {
		fontSize: sizes.s16,
		fontFamily: fonts.medium,
		lineHeight: sizes.s24,
		color: colors.secondary_text,
	},
	txt16_primary: {
		fontSize: sizes.s16,
		fontFamily: fonts.regular,
		lineHeight: sizes.s24,
		color: colors.primary,
	},
	txt16_primary_text: {
		fontSize: sizes.s16,
		fontFamily: fonts.regular,
		lineHeight: sizes.s24,
		color: colors.primary_text,
	},
	txt16_white: {
		fontSize: sizes.s16,
		fontFamily: fonts.medium,
		lineHeight: sizes.s24,
		color: colors.white,
	},
	column_center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	row_start: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	row_end: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	row_center: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	row_between: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	row_around: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	row_evenly: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	row_wrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		overflow: 'hidden',
	},
	row_wrap_center: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		overflow: 'hidden',
		justifyContent: 'center',
		alignContent: 'center',
	},
	column: {
		flexDirection: 'column',
	},
	column_between: {
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	icon16: { width: sizes.s16, height: sizes.s16 },
	icon16_radius: { width: sizes.s16, height: sizes.s16, borderRadius: sizes.s16 },
	icon20: { width: sizes.s20, height: sizes.s20 },
	icon20_radius: { width: sizes.s20, height: sizes.s20, borderRadius: sizes.s20 },
	icon24: { width: sizes.s24, height: sizes.s24 },
	icon24_radius: { width: sizes.s24, height: sizes.s24, borderRadius: sizes.s24 },
	icon32: { width: sizes.s32, height: sizes.s32 },
	icon32_radius: { width: sizes.s32, height: sizes.s32, borderRadius: sizes.s32 },
	icon40: { width: sizes.s40, height: sizes.s40 },
	icon48: { width: sizes.s48, height: sizes.s48 },
	icon56: { width: sizes.s56, height: sizes.s56 },
	icon64: { width: sizes.s64, height: sizes.s64 },
	icon72: { width: sizes.s72, height: sizes.s72 },
	icon76: { width: sizes.s76, height: sizes.s76 },
	icon80: { width: sizes.s80, height: sizes.s80 },
	icon88: { width: sizes.s88, height: sizes.s88 },
	icon96: { width: sizes.s96, height: sizes.s96 },
	icon120: { width: sizes.s120, height: sizes.s120 },
	icon140: { width: sizes.s140, height: sizes.s140 },
	icon160: { width: sizes.s160, height: sizes.s160 },

	top4: { marginTop: sizes.s4 },
	left4: { marginLeft: sizes.s4 },
	right4: { marginRight: sizes.s4 },
	bottom4: { marginBottom: sizes.s4 },

	top8: { marginTop: sizes.s8 },
	left8: { marginLeft: sizes.s8 },
	right8: { marginRight: sizes.s8 },
	bottom8: { marginBottom: sizes.s8 },

	top10: { marginTop: sizes.s10 },
	left10: { marginLeft: sizes.s10 },
	right10: { marginRight: sizes.s10 },
	bottom10: { marginBottom: sizes.s10 },

	top12: { marginTop: sizes.s12 },
	left12: { marginLeft: sizes.s12 },
	right12: { marginRight: sizes.s12 },
	bottom12: { marginBottom: sizes.s12 },

	top16: { marginTop: sizes.s16 },
	left16: { marginLeft: sizes.s16 },
	right16: { marginRight: sizes.s16 },
	bottom16: { marginBottom: sizes.s16 },

	top24: { marginTop: sizes.s24 },
	left24: { marginLeft: sizes.s24 },
	right24: { marginRight: sizes.s24 },
	bottom24: { marginBottom: sizes.s24 },

	top32: { marginTop: sizes.s32 },
	left32: { marginLeft: sizes.s32 },
	right32: { marginRight: sizes.s32 },
	bottom32: { marginBottom: sizes.s32 },

	top40: { marginTop: sizes.s40 },
	left40: { marginLeft: sizes.s40 },
	right40: { marginRight: sizes.s40 },
	bottom40: { marginBottom: sizes.s40 },

	top48: { marginTop: sizes.s48 },
	left48: { marginLeft: sizes.s48 },
	right48: { marginRight: sizes.s48 },
	bottom48: { marginBottom: sizes.s48 },

	top64: { marginTop: sizes.s64 },
	left64: { marginLeft: sizes.s64 },
	right64: { marginRight: sizes.s64 },
	bottom64: { marginBottom: sizes.s64 },

	padding: { padding: sizes.s16 },
	paddingHorizontal: { paddingHorizontal: sizes.s16 },
	paddingVertical: { paddingVertical: sizes.s16 },

	marginHorizontal: { marginHorizontal: sizes.s16 },
	marginVertical: { marginVertical: sizes.s16 },

	borderRadius16: { borderRadius: sizes.s16 },
	borderRadius40: { borderRadius: sizes.s40 },
});
