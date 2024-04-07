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
        isDeletable
    }) {
    const {colors} = useTheme();

    return (
        <ScrollView contentContainerStyle={styles.centeredView}>
            <FormTextInput labelText="Goal title" value={goalTitle} updateState={setGoalTitle}/>
            <PriorityPicker goalPriority={goalPriority} setGoalPriority={setGoalPriority} />
            <FinishDatePicker goalFinishDate={goalFinishDate} setGoalFinishDate={setGoalFinishDate}/>
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
    }
})