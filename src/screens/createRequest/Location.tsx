import Geocoder from '@timwangdev/react-native-geocoder';
import { colors, images, sizes, Style } from 'assets';
import { HeaderWhite, KeyboardAvoidingViews, SubmitButton } from 'components';
import { RequestParams } from 'models';
import { navigate } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import {
	GooglePlaceData,
	GooglePlaceDetail,
	GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SCREENNAME } from 'utils/constant';

const MAPS_URL = 'https://www.google.com/maps/dir/?api=1&';

const Location: React.FC<any> = ({ route }: { route: { params: RequestParams } }) => {
	const viewOnly = Boolean(route?.params?.coordinate);
	const [location, setLocation] = useState<string>('');
	const [coordinate, setCoordinate] = useState<any>(route?.params?.coordinate || null);
	const mapRef = useRef<any>(null);
	const searchRef = useRef<any>(null);

	useEffect(() => {
		viewOnly && searchRef.current?.setAddressText(route?.params?.location);
	}, []);

	const onPressMap = async (e: MapEvent) => {
		if (!viewOnly) {
			setCoordinate(e.nativeEvent.coordinate);
			try {
				const position = {
					lat: e.nativeEvent.coordinate.latitude,
					lng: e.nativeEvent.coordinate.longitude,
				};
				const address = await Geocoder.geocodePosition(position);
				searchRef.current?.setAddressText(address[0]?.formattedAddress);
				setLocation(address[0]?.formattedAddress);
			} catch (err) {}
		}
	};

	const onPressResultSearch = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
		setCoordinate({
			latitude: details?.geometry.location.lat,
			longitude: details?.geometry.location.lng,
		});
		setLocation(data.description);
	};

	const onSubmitLocation = () => {
		navigate(SCREENNAME.CREATE_REQUEST, { location, coordinate });
	};

	const openInGoogleMap = () => {
		const scheme = 'geo:0,0?q=';
		const latLng = `${coordinate.latitude},${coordinate.longitude}`;
		const label = route?.params?.location;
		const url: string =
			Platform.OS === 'ios'
				? `https://www.google.com/maps/search/?api=1&query=${latLng}&query=${label}`
				: `${scheme}${latLng}(${label})`;
		Linking.openURL(url);
	};

	return (
		<KeyboardAvoidingViews>
			<HeaderWhite />

			<MapView
				ref={mapRef}
				initialRegion={{
					latitude: 1.344887,
					longitude: 103.8090913,
					latitudeDelta: 0.5,
					longitudeDelta: 0.5,
				}}
				region={
					coordinate ? { ...coordinate, latitudeDelta: 0.1, longitudeDelta: 0.1 } : undefined
				}
				onPress={onPressMap}
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				moveOnMarkerPress
				loadingEnabled
				loadingIndicatorColor={colors.primary}
				pitchEnabled={false}
				toolbarEnabled={false}>
				{Boolean(coordinate) && <Marker coordinate={coordinate} />}
			</MapView>
			{viewOnly ? (
				<View style={styles.search}>
					<View style={[Style.row, Style.paddingHorizontal]}>
						<Image
							source={images.ic_map}
							style={{ ...Style.icon24, tintColor: colors.primary }}
						/>
						<Text style={[Style.txt16_primary_text, { marginLeft: sizes.s8, flex: 1 }]}>
							{route?.params?.location}
						</Text>
					</View>
					<SubmitButton title="Directions" shadow={false} onPress={openInGoogleMap} />
				</View>
			) : (
				<View style={styles.search}>
					<GooglePlacesAutocomplete
						ref={searchRef}
						placeholder="Search"
						enableHighAccuracyLocation
						fetchDetails={true}
						enablePoweredByContainer={false}
						GooglePlacesSearchQuery={{
							rankby: 'distance',
						}}
						renderRow={(data, index) => (
							<View style={Style.row} key={index}>
								<Image
									source={images.ic_map}
									style={{ ...Style.icon24, tintColor: colors.primary }}
								/>
								<Text style={[Style.txt16_primary_text, { marginLeft: sizes.s8 }]}>
									{data.description}
								</Text>
							</View>
						)}
						onPress={onPressResultSearch}
						query={{
							key: Config.GOOGLE_MAP_KEY,
							language: 'en',
							types: 'geocode',
							radius: 30000,
							components: 'country:in',
						}}
						textInputProps={{
							icon: images.ic_map,
							autoFocus: true,
							editable: !viewOnly,
							multiline: true,
						}}
						styles={{
							container: { flex: 0 },
							listView: { backgroundColor: 'white' },
							textInputContainer: {
								marginHorizontal: sizes.s24,
							},
							textInput: {
								...Style.txt16,
								borderColor: colors.border,
								borderWidth: sizes.s1,
								borderRadius: sizes.s24,
								height: sizes.s52,
							},
							predefinedPlacesDescription: {
								color: '#1faadb',
							},
						}}
					/>
					<SubmitButton
						shadow={false}
						title="Save"
						onPress={onSubmitLocation}
						disable={location === ''}
					/>
				</View>
			)}
		</KeyboardAvoidingViews>
	);
};

export default Location;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	search: {
		backgroundColor: colors.white,
		paddingVertical: sizes.s24,
		borderTopLeftRadius: sizes.s16,
		borderTopRightRadius: sizes.s16,
	},
});
