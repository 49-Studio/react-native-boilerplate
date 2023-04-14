import { createNavigationContainerRef, StackActions, TabActions } from '@react-navigation/native';

export const navigationRef: any = createNavigationContainerRef();
//params can be any or  { screen: SCREENNAME, params: any })
export function navigate(name: string, params?: any) {
	navigationRef.current?.navigate(name, params);
}

export function jumpTo(name: string, params?: any) {
	const jumpToAction = TabActions.jumpTo(name, params);
	navigationRef.current?.dispatch(jumpToAction);
}

export function goBack() {
	navigationRef.current?.goBack();
}

export function replace(name: string, params?: any) {
	navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function navigateReset(name: string) {
	navigationRef.current?.reset({
		routes: [{ name: name }],
	});
}
export function naviPop(number: number) {
	navigationRef.current.dispatch(StackActions.pop(number));
}

export function naviPush(name: string, params?: any) {
	navigationRef.current.dispatch(StackActions.push(name, params));
}
