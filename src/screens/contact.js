import React, { useEffect, useState } from "react"
import { View, TextInput, Button, StyleSheet, Alert } from "react-native"

const Contact = ({ navigation }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const exitAlert = (event) =>
    Alert.alert('Alert', 'Apakah Anda ingin keluar?', [
      {
        text: 'tetap di sini',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'lanjutkan pergi',
        onPress: () => navigation.dispatch(event.data.action)
      }
    ])
  
  useEffect(() => {
    const beforeRemoveListener = navigation.addListener('beforeRemove', (event) => {
      if (name !== '' || message !== '') {
          event.preventDefault()
          exitAlert(event)
        }
    })

    return () => {
      navigation.removeListener('beforeRemove', beforeRemoveListener)
    }
  }, [name, message, navigation])

  return (
      <View style={styles.container}>
          <TextInput 
            placeholder="Nama Anda" 
            style={styles.textInput} 
            defaultValue={name}
            onChangeText={setName}
          />
          <TextInput 
            placeholder="Pesan" 
            style={styles.textInput} 
            defaultValue={message}
            onChangeText={setMessage}
          />
          <View style={styles.buttonContainer}>
              <Button title="Kirim" />
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      margin: 30,
    },
    textInput: {
      height: 60,
      borderWidth: 1,
      padding: 10,
      marginTop: 20,
    },
    buttonContainer: {
      marginTop: 20,
    },
})

export default Contact