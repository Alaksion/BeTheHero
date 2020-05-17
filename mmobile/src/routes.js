import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer}  from '@react-navigation/native'
import React from 'react'

const appStack =  createStackNavigator()
import Incidents  from './pages/incidents'
import Detail  from './pages/Detail'

export default function Routes() {
    return(
        <NavigationContainer>

            <appStack.Navigator  screenOptions={{headerShown:false}}>
                <appStack.Screen name="Incidents" component={Incidents}/>
                <appStack.Screen name="Details" component={Detail}/>

            </appStack.Navigator>

        </NavigationContainer>
    )
}