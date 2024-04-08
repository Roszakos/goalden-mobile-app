import { Pressable, StyleSheet, View } from 'react-native'
import { Text, Icon, TextInput, useTheme } from 'react-native-paper'
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { destroy, update } from '../../features/goals/milestonesSlice'; 


export default function MilestoneListItem({milestone}) {
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const [task, setTask] = useState(milestone.task);
    const [editing, setEditing] = useState(true);

    const deleteMilestone = () => {
        dispatch(destroy(milestone));
    }

    const updateMilestone = () => {
        dispatch(update({
            id: milestone.id,
            goalId: milestone.goalId,
            task: task,
            isFinished: isFinished,
            createdAt: milestone.createdAt
        }))
    }

    const updateFinishState = (isFinished) => {
        dispatch(update({
            id: milestone.id,
            goalId: milestone.goalId,
            task: milestone.task,
            isFinished: isFinished,
            createdAt: milestone.createdAt
        }))
    }

    return (
        <View style={styles.container}>
            <View style={[styles.listItemView, {backgroundColor: colors.background}]}>
                {
                    editing ? (
                        <View style={styles.editView}>
                            <TextInput 
                                mode="outlined"
                                style={styles.textInput}
                                outlineColor='#6f7070'
                                onChangeText={newText => setTask(newText)}
                                value={task}
                                numberOfLines={2}
                                multiline={true}
                            />
                        </View>
                    ) : (
                        <View style={styles.topBar}>
                            {
                                milestone.isFinished ? (
                                    <Pressable 
                                        onPress={() => {
                                            updateFinishState(false);
                                        }}
                                    >
                                        <Icon source="checkbox-marked-outline" size={40} color="#30b02c"/>
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        onPress={() => {
                                            updateFinishState(true);
                                        }}
                                    >
                                        <Icon source="checkbox-blank-outline" size={40} />
                                    </Pressable>
                                )
                            }
                            <Text style={styles.taskText}>
                                {milestone.task}
                            </Text>
                        </View>
                    )
                }
                <View style={styles.buttonsView}>
                    {
                        editing ? (
                            <View style={styles.editingButtons}>
                                <Pressable 
                                    style={[styles.button, {backgroundColor: '#b01717'}]}
                                    onPress={deleteMilestone}    
                                >
                                    <Text style={styles.buttonText}>DELETE</Text>
                                </Pressable>
                                <View style={styles.rightButtons}>
                                    <Pressable 
                                        style={[styles.button, {backgroundColor: '#757474'}]}
                                        onPress={() => setEditing(false)}    
                                    >
                                        <Text style={styles.buttonText}>CANCEL</Text>
                                    </Pressable>
                                    <Pressable 
                                        style={[styles.button, {backgroundColor: '#28ad3c'}]}
                                        onPress={updateMilestone}
                                    >
                                        <Text style={styles.buttonText}>SAVE</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ) : (
                            <Pressable 
                                style={[styles.button, {backgroundColor: '#238ecc'}]}
                                onPress={() => setEditing(true)}  
                            >
                                <Text style={styles.buttonText}>EDIT</Text>
                            </Pressable>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
        marginTop: 6
	},
    listItemView: {
        width: '100%',
        minHeight: 100,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#63605f',
    },
    topBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        gap: 8
    },
    checkbox: {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'grey'
    },
    buttonsView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
        gap: 6
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4
    },
    buttonText: {
        fontSize: 12,
        fontFamily: 'Josefin'
    },
    taskText: {
        fontFamily: 'Josefin-regular'
    },
    editView: {
        flex: 1,
        padding: 8
    },
    textInput: {
        paddingTop: 4
    },
    editingButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rightButtons: {
        flexDirection: 'row',
        gap: 4
    }
})