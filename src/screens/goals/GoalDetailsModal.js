import React, { useState, useEffect, useReducer } from 'react';
import { View, Modal, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';

// My components
import GoalDetails from './GoalDetails';
import GoalMilestones from './GoalMilestones';

export default function GoalDetailsModal({goal, showModal, setShowModal}) {
    const {colors} = useTheme();
    const [currentScreen, setCurrentScreen] = useState(1);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [goalTitle, setGoalTitle] = useState('');
    const [goalFinishDate, setGoalFinishDate] = useState(null);
    const [goalPriority, setGoalPriority] = useState(1);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (goal) {
            setGoalTitle(goal.title);
            setGoalFinishDate(goal.finishDate);
            setGoalPriority(goal.priority);
        } else {
            setGoalTitle('');
            setGoalFinishDate(null);
            setGoalPriority(1);
        }
        setTimeout(() => setLoading(false), 100);
    }, [goal])
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