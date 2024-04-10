import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';

// My components
import TaskDetails from './TaskDetails';

// Store actions
import { add, destroy, update } from '../../features/tasks/tasksSlice';

// Notification scripts
import { cancelNotification } from '../../scripts/notificationScripts';

export default function TaskDetailsModal({task, showModal, setShowModal}) {
    const {colors} = useTheme();
    const dispatch = useDispatch();

    const [taskTitle, setTaskTitle] = useState('');
    const [taskTime, setTaskTime] = useState(null);

    const [action, setAction] = useState('add');
    const [isDeletable, setIsDeletable] = useState(false)

    const [inputError, setInputError] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (task) {
            setTaskTitle(task.task);
            setTaskTime(task.time);
            setAction('edit');
            setIsDeletable(true);
        } else {
            setTaskTitle('');
            setAction('add');
            setTaskTime(null);
            setIsDeletable(false);
        }
        setTimeout(() => setLoading(false), 100);
    }, [task])

    const saveTask = () => {
        if (taskTitle) {
            if (action === 'add') {
                // Add new task
                dispatch(add({
                    id: Math.random(),
                    task: taskTitle,
                    time: taskTime,
                    isFinished: false,
                }));
            } else if (action === 'edit') {
                // Update existing task
                dispatch(update({
                    id: task.id,
                    title: taskTitle,
                    isFinished: task.isFinished,
                    time: taskTime,
                }));
            }
            setTaskTitle('');
            setTaskTime(null);
            setShowModal(false);
        } else {
            setInputError(true);
        }
    }

    const deleteTask = () => {
        if (task) {
            cancelNotification(task.id);
            dispatch(destroy(task));
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
                         <Text style={styles.navigationText}>
                             {
                                 task ? (
                                     'EDIT TASK'
                                 ) : (
                                     'NEW TASK'
                                 )
                             }
                         </Text>
                    </View>
                    {
                        loading ? (
                            <View style={styles.centeredView}>
                                <ActivityIndicator size="large"/>
                            </View>
                        ) : (
                            <View style={styles.mainView}>
                                <TaskDetails 
                                    taskTitle={taskTitle}
                                    setTaskTitle={setTaskTitle}
                                    taskTime={taskTime}
                                    setTaskTime={setTaskTime}
                                    saveTask={saveTask}
                                    deleteTask={deleteTask}
                                    isDeletable={isDeletable}
                                    inputError={inputError}
                                    setInputError={setInputError}
                                />
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
        width: '100%',
        marginTop: 100,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    topBar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navigationText: {
        letterSpacing: 0.9,
        fontSize: 18,
        fontWeight: '700'
    },
    mainView: {
        flex: 1,
    },
})