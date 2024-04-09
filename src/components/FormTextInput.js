import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import React from 'react'

export default function FormTextInput({labelText, placeholder, updateState, value, error, setError}) {
  return (
    <View style={styles.container}>
        <TextInput 
			mode="outlined"
			label={<Text style={{fontFamily: 'Josefin'}}>{labelText}</Text>}
			placeholder={placeholder}
			outlineColor='#6f7070'
			onChangeText={newText => {
				updateState(newText)
				setError(false);
			}}
			defaultValue={value}
			numberOfLines={3}
			error={error}
			multiline={true}
			required={true}
        />
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		width: '100%'
	}
})