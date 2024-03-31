import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'

const Welcome = ({navigation}) => {

  
  


  return (
    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
      <Text style={{fontSize:20,color:'black'}}>Lưu Tuấn Quỳnh</Text>
      <Text style={{fontSize:20,color:'red'}}>PH31990</Text>
      <TouchableOpacity style={{padding:10, backgroundColor:'green',margin:10, paddingHorizontal:30, borderRadius:10}} onPress={()=>navigation.navigate('Bai1')}>
        <Text style={{color:'white'}}>Bài 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:10, backgroundColor:'green',margin:10, paddingHorizontal:30, borderRadius:10}} onPress={()=>navigation.navigate('Bai2')}>
        <Text style={{color:'white'}}>Bài 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{padding:10, backgroundColor:'green',margin:10, paddingHorizontal:30, borderRadius:10}} onPress={()=>navigation.navigate('Bai3')}>
        <Text style={{color:'white'}}>Bài 3</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})