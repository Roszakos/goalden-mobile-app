import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Text, TextInput, ActivityIndicator, Icon, useTheme } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux'

import { getMilestonesByGoalId } from '../../features/goals/milestonesSlice';

import MilestoneListItem from '../../components/milestones/MilestoneListItem';

import { add } from '../../features/goals/milestonesSlice'; 

export default function GoalMilestones({goal}) {
    const {colors} = useTheme();

    const dispatch = useDispatch();

    const milestones = useSelector(state => getMilestonesByGoalId(state, goal.id));

    const [finishedMilestones, setFinishedMilestones] = useState([]);
    const [activeMilestones, setActiveMilestones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newMilestoneTask, setNewMilestoneTask] = useState('');
    const [inputError, setInputError] = useState(false);

    const addNewMilestone = () => {
        if (newMilestoneTask) {
            dispatch(add({
                id: Math.random(),
                goalId: goal.id,
                task: newMilestoneTask,
                isFinished: false,
                createdAt: Date.now()
            }));
            setNewMilestoneTask('');
        } else {
            setInputError(true);
        }
    }

    useEffect(() => {
        setLoading(true);
        const milestonesList = milestones.slice();
        milestonesList.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1;
            } else if (b.createdAt < a.createdAt) {
              return -1;
            }
            return 0;
        })

        setFinishedMilestones(milestonesList.filter(milestone => milestone.isFinished))
        setActiveMilestones(milestonesList.filter(milestone => !milestone.isFinished))
        setLoading(false);
    }, [milestones]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                loading ? (
                    <View style={styles.centeredView}>
                        <ActivityIndicator size="large"/>
                    </View>
                ) : (
                    <View>
                        <View style={[styles.listItemView, {backgroundColor: colors.background}]}>
                        <TextInput 
                            mode="outlined"
                            style={styles.textInput}
                            label={<Text style={{fontFamily: 'Josefin'}}>Add new milestone</Text>}
                            outlineColor='#6f7070'
                            onChangeText={newText => {
                                setNewMilestoneTask(newText);
                                setInputError(false);
                            }}
                            value={newMilestoneTask}
                            error={inputError}
                            numberOfLines={2}
                            multiline={true}
                            required={true}
                        />
                        <Pressable 
                            style={styles.newMilestoneButton}
                            onPress={addNewMilestone}    
                        >
                            <Icon source="plus-circle" size={50} />
                        </Pressable>
                        </View>
                        <View style={styles.milestoneListContainer}>
                        {
                            activeMilestones.map(milestone => {
                                return (
                                    <MilestoneListItem key={milestone.id} milestone={milestone} />
                                )
                            })
                        }
                        {
                            finishedMilestones.map(milestone => {
                                return (
                                    <MilestoneListItem key={milestone.id} milestone={milestone} />
                                )
                            })
                        }
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        minHeight: '100%',
        paddingVertical: 15,
        paddingHorizontal: 8
    },
    centeredView: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemView: {
        width: '100%',
        minHeight: 100,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#63605f',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 6,
        gap: 6,
    },
    newMilestoneButton: {
        
    },
    textInput: {
        flex: 1,
    },
    milestoneListContainer: {
        paddingHorizontal: 10,
    }
})