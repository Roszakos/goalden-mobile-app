import { StyleSheet, View, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React, {useState} from 'react';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskTimePicker({taskTime, setTaskTime}) {
  const { colors } = useTheme();
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedTime) => {
    if (event.type === 'set') {
        setTaskTime(moment(selectedTime).valueOf());
    }
    setShowTimePicker(false);
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={styles.label}>Time</Text>
        <Pressable
            style={styles.pickDateButton}
            onPress={() => setShowTimePicker(true)}
        >
            {
                taskTime ? (    
                    <Text>
                        {moment(taskTime).format('HH:mm')}
                    </Text>
                ) : (
                    <Text>Select time</Text>
                )
            }
            
        </Pressable>
        {
            showTimePicker && (
                <DateTimePicker 
                    mode="time"
                    display="spinner" 
                    value={taskTime ? new Date(taskTime) : new Date()}
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
