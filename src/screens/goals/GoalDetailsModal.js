import React, { useState, useEffect, useReducer } from 'react';
import { View, Modal, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';

// My components
import GoalDetails from './GoalDetails';
import GoalMilestones from './GoalMilestones';

// Store actions
import { add, destroy, update } from '../../features/goals/activeGoalsSlice';

export default function GoalDetailsModal({goal, showModal, setShowModal}) {
    const {colors} = useTheme();
    const dispatch = useDispatch();

    const [currentScreen, setCurrentScreen] = useState(1);

    const [goalTitle, setGoalTitle] = useState('');
    const [goalFinishDate, setGoalFinishDate] = useState(null);
    const [goalPriority, setGoalPriority] = useState(1);

    const [action, setAction] = useState('add');
    const [isDeletable, setIsDeletable] = useState(false)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (goal) {
            setGoalTitle(goal.title);
            setGoalFinishDate(goal.finishDate);
            setGoalPriority(goal.priority);
            setAction('edit');
            setIsDeletable(true);
        } else {
            setGoalTitle('');
            setGoalFinishDate(null);
            setGoalPriority(1);
            setAction('add');
        }
        setTimeout(() => setLoading(false), 100);
    }, [goal])

    const saveGoal = () => {
        if (action === 'add') {
            // Add new goal
            dispatch(add({
                id: Math.random(),
                title: goalTitle,
                priority: goalPriority,
                finishDate: goalFinishDate
            }));
        } else if (action === 'edit') {
            // Update existing goal
            dispatch(update({
                id: goal.id,
                title: goalTitle,
                priority: goalPriority,
                finishDate: goalFinishDate
            }));
        }
        setShowModal(false);
    }

    const deleteGoal = () => {
        if (goal) {
            dispatch(destroy(goal));
        }
        setShowModal(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
        >
            <View style={[styles.centeredView, {backgroundColor: 'rgba(0,0,0,0.8)'}]}>
                <View style={[styles.modalView, {backgroundColor: colors.lighterBackground}]}>
                    <View style={[styles.topBar, {backgroundColor: colors.background}]}>
                        <Pressable style={[styles.navigationTabView, {borderBottomColor: currentScreen === 1 ? colors.primary : 'grey'}]}>
                            <Text>DETAILS</Text>
                        </Pressable>
                        <View style={{borderRightWidth: 1, opacity: 0.4}}></View>
                        <Pressable style={[styles.navigationTabView, {borderBottomColor: currentScreen === 2 ? colors.primary : 'grey'}]}>
                            <Text>MILESTONES</Text>
                        </Pressable>
                    </View>
                    {
                        loading ? (
                            <View style={styles.centeredView}>
                                <ActivityIndicator size="large"/>
                            </View>
                        ) : (
                            <View style={styles.mainView}>
                                {
                                    currentScreen === 1 ? (
                                        <GoalDetails 
                                            goalTitle={goalTitle}
                                            setGoalTitle={setGoalTitle}
                                            goalFinishDate={goalFinishDate}
                                            setGoalFinishDate={setGoalFinishDate}
                                            goalPriority={goalPriority}
                                            setGoalPriority={setGoalPriority}
                                            saveGoal={saveGoal}
                                            deleteGoal={deleteGoal}
                                            isDeletable={isDeletable}
                                        />
                                    ) : (
                                        <GoalMilestones />
                                    )
                                }
                            </View>
                        )
                    }
                    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        flex: 1,
        marginTop: 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    topBar: {
        height: 70,
        backgroundColor: 'green',
        flexDirection: 'row'
    },
    navigationTabView: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
    },
    mainView: {
        flex: 1,
    }
})