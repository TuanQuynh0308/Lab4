import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CameraOptions, ImagePickerResponse, OptionsCommon, launchCamera } from 'react-native-image-picker'

const Bai1 = () => {

  const [image, setimage] = useState<any>()

  const commonOptions: OptionsCommon={
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
  };

  const cameraOptions: CameraOptions={
    cameraType:'front',
    saveToPhotos: true,
    ...commonOptions,
  };

  const onOpenCamera = async()=>{
    const response: ImagePickerResponse = await launchCamera(cameraOptions);
    if(response?.assets){
      setimage(response.assets);
    }else{
      Alert.alert('CÓ lỗi xảy ra', response.errorMessage);
    }
  }

  return (
    <View>
      <Image source={{
        uri: image?.[0].uri || 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
      }}
      style={{width:100,height:100,alignSelf:'center'}}
      />
      <Button title={'Take photo'} onPress={onOpenCamera}/>
    </View>
  )
}

export default Bai1

const styles = StyleSheet.create({})