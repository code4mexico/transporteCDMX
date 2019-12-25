import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import React, { PureComponent } from 'react'
import theme from './styles'
import { NavigationNativeContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Transit from './screens/Transit'
import Ecobici from './screens/Ecobici'
import Vehicles from './screens/Vehicles'

const iconSize = 20

enableScreens()
const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const commonStackOptions = {
  headerLargeTitle: true,
  headerHideShadow: true,
  headerTintColor: theme.colors.accent,
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
}

const stackOptions = title => ({
  ...commonStackOptions,
  title: title,
})

const tabOptions = (tabName, iconName) => {
  return {
    tabBarLabel: tabName,
    tabBarIcon: ({ color }) => <Icon name={iconName} size={iconSize} color={color} solid />,
  }
}

const TransitStack = () => {
  return (
    <Stack.Navigator initialRouteName="Transit">
      <Stack.Screen name="Transit" component={Transit} options={stackOptions('Transporte CDMX')} />
    </Stack.Navigator>
  )
}

const EcobiciStack = () => {
  return (
    <Stack.Navigator initialRouteName="Ecobici">
      <Stack.Screen name="Ecobici" component={Ecobici} options={stackOptions('Ecobici')} />
    </Stack.Navigator>
  )
}

const VehiclesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Vehicles">
      <Stack.Screen name="Vehicles" component={Vehicles} options={stackOptions('Vehículos')} />
    </Stack.Navigator>
  )
}

class App extends PureComponent {
  render() {
    return (
      <NavigationNativeContainer theme={theme}>
        <Tab.Navigator activeColor={theme.colors.accent}>
          <Tab.Screen
            name="Transit"
            component={TransitStack}
            options={tabOptions('Transporte', 'subway')}
          />
          <Tab.Screen
            name="Ecobici"
            component={EcobiciStack}
            options={tabOptions('Ecobici', 'bicycle')}
          />
          <Tab.Screen
            name="Vehicles"
            component={VehiclesStack}
            options={tabOptions('Vehículos', 'car')}
          />
        </Tab.Navigator>
      </NavigationNativeContainer>
    )
  }
}

export default App
