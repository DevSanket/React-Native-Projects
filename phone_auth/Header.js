import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={{marginLeft:15,marginTop:30}}>
      <Text style={{fontWeight:'bold',fontSize:28}}>Firebase auth</Text>
    </View>
  )
}

const styles = StyleSheet.create({})