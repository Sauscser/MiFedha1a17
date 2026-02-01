import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BotTab from '../BotTab';
import { HomeStackScreenNames } from '../HomeTabNav';
import KFNdogoScreen from '../../screens/MFNdogo';
import MFKw from '../../screens/MFKubwa';
import AdvSgnIn from '../../screens/Advocate/AdvocateHm';
import MFAdmSgnIn from "../../screens/MFAdmin/SignInAdm";
import SignInBankAdm from "../../screens/MFBankAdmin/SignInAdm";
import MFSetting from '../../screens/Settings/SignIn';
import Ref from "../../screens/Settings/Reference";
import MFBankAdmin from "../../screens/MFBankAdmin";

import GlobalHeader from '../../src/componentx/GlobalHeader';

const Drawer = createDrawerNavigator();

export type RootNavProps = {
  colorScheme: 'light' | 'dark';
  user: { username?: string } | null;
  signOut: () => void;
};

const Stack = createNativeStackNavigator();

const RedirectToHome = ({ navigation, route }: any) => {
  React.useEffect(() => {
    // forward to nested Home stack: Stack 'DrawerRoot' -> Drawer 'Homes' -> BottomTab 'Home' -> target screen
    navigation.navigate('DrawerRoot', { screen: 'Homes', params: { screen: 'Home', params: { screen: route.name, params: route.params } } });
  }, [navigation, route]);
  return null;
};

const DrawerScreens = ({ user, signOut }: any) => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: true,
      header: () => <GlobalHeader user={user} signOut={signOut} />,
      safeAreaInsets: { top: 60, bottom: 0, left: 0, right: 0 },
    }}
  >
    <Drawer.Screen name="Homes" component={BotTab} />
    <Drawer.Screen name="MiFedha Ndogos" component={KFNdogoScreen} />
    <Drawer.Screen name="MiFedha Kubwa" component={MFKw} />
    <Drawer.Screen name="MiFedha Advocate" component={AdvSgnIn} />
    <Drawer.Screen name="MiFedha Admin 2" component={MFAdmSgnIn} />
    <Drawer.Screen name="Bank Admin" component={SignInBankAdm} />
    <Drawer.Screen name="MFBankAdmin" component={MFBankAdmin} />
    <Drawer.Screen name="MiFedha Admin 1" component={MFSetting} />
    <Drawer.Screen name="Reference" component={Ref} />
  </Drawer.Navigator>
);

const RootNavigator: React.FC<RootNavProps> = ({ colorScheme, user, signOut }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {HomeStackScreenNames.map((name) => (
          <Stack.Screen key={name} name={name} component={RedirectToHome} />
        ))}

        {/* Drawer is kept as one screen so user still sees Drawer UI */}
        <Stack.Screen name="DrawerRoot" options={{ headerShown: false }}>
          {() => <DrawerScreens user={user} signOut={signOut} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
