import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef, useContext } from 'react';
import FormTextInput from '../../components/FormTextInput';
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import FormSubmitButton from '../../components/FormSubmitButton';
import DurationOptions from '../../components/add-new-task/DurationOptions';
import { TodayPlanContext } from '../../contexts/TodayPlanContext';


export default function AddNewTask({navigation}) {
  const { tasks, setTasks, storeTodayTasks } = useContext(TodayPlanContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState(0)
  const [taskDuration, setTaskDuration] = useState(0);
  const durationTimerRef = useRef();

  useEffect(() => {
    if (taskDuration !== 0) {
      const hours = parseInt(taskDuration[0] + taskDuration[1]);
      const minutes = parseInt(taskDuration[2] + taskDuration[3]);
      durationTimerRef.current.setValue({hours: hours, minutes: minutes}, {animated: true});
    }
  }, [taskDuration]);

  const submitForm = () => {
    setTasks([
      {
        id: Math.random(),
        title: taskTitle,
        time: taskTime,
        duration: taskDuration
      },
      ...tasks
    ]);
    storeTodayTasks([
      {
        id: Math.random(),
        title: taskTitle,
        time: taskTime,
        duration: taskDuration
      },
      ...tasks
    ]);
    navigation.navigate('TodayPlan');
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <FormTextInput 
          label="Task" 
          placeholder="What do you have to do?" 
          value={taskTitle} 
          inputHeight={50}
          updateState={setTaskTitle}
        />
        <View style={styles.timePickerLabelView}>
          <Text style={styles.timePickerLabelText}>Start at</Text>
        </View>
        <View style={styles.timePickerContainer}>
          <TimerPicker
            padWithNItems={1}
            hideSeconds
            use24HourPicker
            LinearGradient={LinearGradient}
            minuteLabel="min"
            styles={{
                theme: "light",
                backgroundColor: '#69d69c',
                pickerItem: {
                    fontSize: 34,
                },
                pickerLabel: {
                    fontSize: 26,
                    right: -20,
                },
                pickerLabelContainer: {
                    width: 60,
                },
                pickerItemContainer: {
                    width: 150,
                },
            }}
            onDurationChange={(time) => {
              const hours = time.hours < 10 ? '0' + time.hours.toString() : time.hours.toString()
              const minutes = time.minutes < 10 ? '0' + time.minutes.toString() : time.minutes.toString()
              setTaskTime(hours.toString() + minutes.toString());
            }}
          />
        </View>
        <View style={styles.timePickerLabelView}>
          <Text style={styles.timePickerLabelText}>End after </Text>
          <Text style={styles.timerPickerLabelSubtext}>(optional)</Text>
        </View>
        <View style={styles.timeDurationOptionsView}>
            <Text style={styles.timeDurationOptionsLabel}>Pick one of the options</Text>
            <DurationOptions chosenDuration={taskDuration} changeDuration={setTaskDuration} />
        </View>
        <Text style={styles.timePickerHeaderText}>Or choose custom duration</Text>
        <View style={styles.timePickerContainer}>
          <TimerPicker
            padWithNItems={1}
            hideSeconds
            LinearGradient={LinearGradient}
            hourLabel="h"
            minuteLabel="min"
            ref={durationTimerRef}
            styles={{
                theme: "light",
                backgroundColor: '#69d69c',
                pickerItem: {
                    fontSize: 34,
                },
                pickerLabel: {
                    fontSize: 26,
                    right: -20,
                },
                pickerLabelContainer: {
                    width: 60,
                },
                pickerItemContainer: {
                    width: 150,
                },
            }}
            onDurationChange={(time) => {
              const hours = time.hours < 10 ? '0' + time.hours.toString() : time.hours.toString()
              const minutes = time.minutes < 10 ? '0' + time.minutes.toString() : time.minutes.toString()
              setTaskDuration(hours.toString() + minutes.toString());
            }}
          />
        </View>
      </View>
      <FormSubmitButton submitForm={submitForm} />
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#69d69c',
    padding: 15
  },
  timePickerContainer: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10
  },
  timePickerLabelView: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 3
  },
  timePickerLabelText: {
    fontWeight: '600',
    fontSize: 18
  },
  timerPickerLabelSubtext: {
    fontSize: 17,
    fontWeight: '300',
    color: 'black'
  },
  timeDurationOptionsView: {
    width: '100%',
    padding: 0,
    alignItems: 'center'
  },
  timeDurationOptionsLabel: {
    fontWeight: '400',
    fontSize: 16,
    color: '#2c302e'
  },
  timePickerHeaderText: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '400',
    fontSize: 16
  }
})