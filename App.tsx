import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import Welcome from './Welcome'
import Bai1 from './Bai1'
import Bai2 from './Bai2'
import Bai3 from './Bai3'




const Stack = createNativeStackNavigator();

function App(): JSX.Element{
  return(
      <SafeAreaView style={{flex: 1}} >
          <NavigationContainer >
              <Stack.Navigator initialRouteName='Welcome'>
              <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name='Bai1' component={Bai1} options={{headerShown: false}}/>
                <Stack.Screen name='Bai2' component={Bai2} options={{headerShown: false}}/>
                <Stack.Screen name='Bai3' component={Bai3} options={{headerShown: false}}/>
              </Stack.Navigator>
          </NavigationContainer>
      </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})