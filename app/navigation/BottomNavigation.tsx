import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import Colors from '../colors/Colors';
import IconForm from '../icon/IconForm';
import Dashboard from '../screens/tabs/Dashboard';
import Profile from '../screens/tabs/profile';
import MarketData from '../screens/tabs/MarketData';
import Lexicons from '../lexicons/Lexicons';
import {ImageSourcePropType} from 'react-native';

export type BottomStackParamList = {
  dashboard: undefined;
  profile: {
    image: ImageSourcePropType;
  };
  marketData: undefined;
};

const Tab = createBottomTabNavigator<BottomStackParamList>();

export function DashboardBottomBar() {
  return (
    <>
      {
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarActiveTintColor: Colors.darkBlue,
            tabBarInactiveTintColor: Colors.grey,
            tabBarIcon: ({focused, color}) => {
              let iconName: IconProp = 'home';
              if (route.name === 'dashboard') {
                iconName = focused ? 'home' : 'home';
              }
              if (route.name === 'profile') {
                iconName = focused ? 'user' : 'user';
              }
              if (route.name === 'marketData') {
                iconName = focused ? 'chart-mixed' : 'chart-mixed';
              }
              return <IconForm name={iconName} color={color} size={20} />;
            },
          })}>
          <Tab.Screen
            name="dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              title: Lexicons.dashboard,
              headerTintColor: Colors.black,
              tabBarAllowFontScaling: false,
              tabBarItemStyle: {margin: 5},
            }}
          />
          <Tab.Screen
            name="marketData"
            component={MarketData}
            options={{
              headerShown: false,
              title: Lexicons.marketData,
              headerTintColor: Colors.black,
              tabBarAllowFontScaling: false,
              tabBarItemStyle: {margin: 5},
            }}
          />
          <Tab.Screen
            name="profile"
            component={Profile}
            options={{
              headerShown: false,
              title: Lexicons.profile,
              headerTintColor: Colors.black,
              tabBarAllowFontScaling: false,
              tabBarItemStyle: {margin: 5},
            }}
          />
        </Tab.Navigator>
      }
    </>
  );
}
