import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'

export default function FormTextInput({label, placeholder, updateState, value, inputHeight, labelSubtext}) {
	const [inputBorderWidth, setInputBorderWidth] = useState(1);
	const inputHeightStyle = inputHeight ?? 70;
	const additionalLabel = labelSubtext ?? '';
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
				<Text style={styles.goalTitleInputHeader}>{label}</Text>
				<Text style={styles.labelSubtext}>{additionalLabel}</Text>
			</View>
        <TextInput 
          style={[styles.goalTitleInput, {borderWidth: inputBorderWidth}, {height: inputHeightStyle}]}
          placeholder={placeholder}
          onChangeText={newText => updateState(newText)}
          defaultValue={value}
          multiline={true}
					textAlignVertical="top"
					onFocus={() => setInputBorderWidth(2) }
					onBlur={() => setInputBorderWidth(1) }
					required={true}
        />
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},
	goalTitleInput: {
		width: '98%',
		borderColor: '#222',
		padding: 10,
		borderRadius: 5
	},
	goalTitleInputHeader: {
		fontWeight: '600',
		paddingBottom: 4
	},
	labelSubtext: {
		fontWeight: '400',
    color: 'gray'
	},
	headerContainer: {
		flexDirection: 'row',
		gap: 4
	}
})