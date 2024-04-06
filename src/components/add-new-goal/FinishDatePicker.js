import { StyleSheet, View, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React, {useState} from 'react';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({goalFinishDate, setGoalFinishDate}) {
  const { colors } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
        setGoalFinishDate(moment(selectedDate));
    }
    setShowDatePicker(false);
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={styles.label}>Finish date</Text>
        <Pressable
            style={styles.pickDateButton}
            onPress={() => setShowDatePicker(true)}
        >
            {
                goalFinishDate ? (    
                    <Text>
                        {moment(goalFinishDate).format('D-M-YYYY')}
                    </Text>
                ) : (
                    <Text>Choose date</Text>
                )
            }
            
        </Pressable>
        {
            showDatePicker && (
                <DateTimePicker 
                    mode="date"
                    display="spinner" 
                    minimumDate={new Date()}
                    value={goalFinishDate ? new Date(goalFinishDate) : new Date()}
                    onChange={onChange}
                />
            )
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        padding: 15,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#6f7070"
    },
    label: {
        textAlign: 'center',
        fontFamily: 'Josefin',
        letterSpacing: 0.8,
        fontWeight: '600',
        fontSize: 16
    },
    pickDateButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgb(38, 108, 199)'
    }
})
