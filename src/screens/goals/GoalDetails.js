import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

// My components
import FormTextInput from '../../components/FormTextInput';
import PriorityPicker from '../../components/add-new-goal/PriorityPicker';
import FinishDatePicker from '../../components/add-new-goal/FinishDatePicker';

export default function GoalDetails({
        goalTitle, setGoalTitle, 
        goalFinishDate, setGoalFinishDate, 
        goalPriority, setGoalPriority, 
        saveGoal, deleteGoal,
        inputError, setInputError,
        isFinished, changeFinished,
        isDeletable,
    }) {
    const {colors} = useTheme();

    return (
        <ScrollView contentContainerStyle={styles.centeredView}>
            <FormTextInput labelText="Goal title" value={goalTitle} updateState={setGoalTitle} error={inputError} setError={setInputError}/>
            <PriorityPicker goalPriority={goalPriority} setGoalPriority={setGoalPriority} />
            <FinishDatePicker goalFinishDate={goalFinishDate} setGoalFinishDate={setGoalFinishDate}/>
            {
                isDeletable && (
                    <View style={{width: '100%', marginTop: 30}}>
                    <Text style={{fontFamily: 'Josefin'}}>
                        Click to change
                    </Text>
                    {
                        isFinished ? (
                            <Pressable 
                                style={[styles.goalReachedButton, {backgroundColor: '#19bd47'}]}
                                onPress={() => changeFinished(false)}
                            >
                                <Text style={styles.goalReachedButtonText}>GOAL REACHED</Text>
                            </Pressable>
                        ) : (
                            <Pressable 
                                style={[styles.goalReachedButton, {backgroundColor: '#b8122e'}]}
                                onPress={() => changeFinished(true)}
                            >
                                <Text style={styles.goalReachedButtonText}>GOAL NOT REACHED YET</Text>
                            </Pressable>
                        )
                    }
                    </View>
                )
            }
            <View style={styles.buttonContainer}>
                {
                    isDeletable && (
                        <Pressable 
                            style={{backgroundColor: '#d9201a', borderRadius: 10}}
                            onPress={deleteGoal}
                        >
                            <Text style={styles.buttonText}>DELETE</Text>
                        </Pressable>
                    )
                }
                <Pressable 
                    style={{backgroundColor: colors.darkerPrimary, borderRadius: 10}}
                    onPress={saveGoal}
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