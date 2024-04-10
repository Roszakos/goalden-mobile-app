import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

// My components
import FormTextInput from '../../components/FormTextInput';
import TaskTimePicker from '../add-new-task/TaskTimePicker';

export default function TaskDetails({
        taskTitle, setTaskTitle,
        taskTime, setTaskTime,
        saveTask, deleteTask,
        inputError, setInputError,
        isDeletable        
    }) {
    const {colors} = useTheme();

    return (
        <ScrollView contentContainerStyle={styles.centeredView}>
            <FormTextInput labelText="Task" value={taskTitle} updateState={setTaskTitle} error={inputError} setError={setInputError}/>
            <TaskTimePicker taskTime={taskTime} setTaskTime={setTaskTime}/>
            <View style={styles.buttonContainer}>
                {
                    isDeletable && (
                        <Pressable 
                            style={{backgroundColor: '#d9201a', borderRadius: 10}}
                            onPress={deleteTask}
                        >
                            <Text style={styles.buttonText}>DELETE</Text>
                        </Pressable>
                    )
                }
                <Pressable 
                    style={{backgroundColor: colors.darkerPrimary, borderRadius: 10}}
                    onPress={saveTask}
                >
                    <Text style={styles.buttonText}>SAVE</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        paddingVertical: 15,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        minHeight: '100%'
    },
    buttonContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 15,
        flexDirection: 'row',
        gap: 10
    },
    buttonText: {
        padding: 15,
        paddingHorizontal: 20,
        fontFamily: 'Josefin'
    },
    goalReachedButton: {
        marginTop: 5,
        padding: 15,
        width: '100%',
        alignItems: 'center'
    },
    goalReachedButtonText: {
        fontFamily: 'Josefin',
        fontSize: 20,
    }
})