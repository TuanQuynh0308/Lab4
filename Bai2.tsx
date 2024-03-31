import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ImageLibraryOptions, ImagePickerResponse, OptionsCommon, launchImageLibrary } from 'react-native-image-picker';

const Bai2 = () => {
  const [image, setimage] = useState<any>()

  const commonOptions: OptionsCommon={
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
  };

  const libraryOption: ImageLibraryOptions={
    mediaType:'photo',
    maxWidth:500,
    maxHeight:500,
  };

  const onOpenLibrary = async()=>{
    const response: ImagePickerResponse = await launchImageLibrary(libraryOption);
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
      <Button title={'Take photo'} onPress={onOpenLibrary}/>
    </View>
  )
}

export default Bai2

const styles = StyleSheet.create({})