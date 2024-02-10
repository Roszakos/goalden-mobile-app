import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef, useContext } from 'react';
import FormTextInput from '../../components/FormTextInput';
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import FormSubmitButton from '../../components/FormSubmitButton';
import DurationOptions from '../../components/add-new-task/DurationOptions';
import { TodayPlanContext } from '../../contexts/TodayPlanContext';
import { scheduleNotification, displayTaskDuration, setTaskNotificationTime } from '../../scripts/notificationScripts';


export default function AddNewTask({navigation, route}) {
  let task = null;
  if (route.params.action == 'edit') {
    task = route.params.task;
  }

  const [taskTitle, setTaskTitle] = useState(task ? task.title : '');
  const [taskTime, setTaskTime] = useState(task ? task.time : 0)
  const [taskDuration, setTaskDuration] = useState(task ? task.duration : 0);
  const [durationOptionChanged, setDurationOptionChanged] = useState(false);

  const { tasks, setTasks, storeTodayTasks } = useContext(TodayPlanContext);

  const durationTimerRef = useRef();
  const taskTimerRef = useRef();

  useEffect(() => {
    if (parseInt(taskDuration) !== 0) {
      const hours = parseInt(taskDuration[0] + taskDuration[1]);
      const minutes = parseInt(taskDuration[2] + taskDuration[3]);
      durationTimerRef.current.setValue({hours: hours, minutes: minutes}, {animated: true});
    } else {
      durationTimerRef.current.setValue({hours: 0, minutes: 0}, {animated: true});
    }
  }, [durationOptionChanged]);

  useEffect(() => {
    setTaskDuration(task ? task.duration : 0);
    setDurationOptionChanged(previousValue => !previousValue);
  }, []);

  useEffect(() => {
		task = null;
    let hours;
    let minutes;
		if (route.params.action == 'edit') {
			task = route.params.task;
      if (parseInt(task.time) !== 0) {
        hours = parseInt(task.time[0] + task.time[1]);
        minutes = parseInt(task.time[2] + task.time[3]);
      }
		}

		setTaskTitle(task ? task.title : '');
		setTaskTime(task ? task.time : 0);
		setTaskDuration(task ? task.duration : 0);
    setDurationOptionChanged(previousValue => !previousValue);
    task ? 
      taskTimerRef.current.setValue({hours: hours, minutes: minutes}, {animated: false}) :
      taskTimerRef.current.setValue({hours: 0, minutes: 0}, {animated: false});
	}, [route.params])

  const submitForm = () => {
    // Set exact time when notification should be shown
    const hour = taskTime[0] + taskTime[1];
    const minute = taskTime[2] + taskTime[3];
    const date = setTaskNotificationTime(parseInt(hour), parseInt(minute));

    // Set notification title
    const notificationTitle = taskTitle + " " + hour + ":" + minute

    // Convert task duration to displayable text
    const notificationBody = parseInt(taskDuration) ? "For " + displayTaskDuration(taskDuration) : '';

    scheduleNotification(notificationTitle, date, notificationBody, task ? task.id : null).then((id) => {
      const newTask = {
        id: id,
        title: taskTitle,
        time: taskTime,
        duration: taskDuration,
        isDone: task ? task.isDone : false
      } 
      if (route.params.action == 'edit') {
        const updatedTasks = tasks.slice();
        updatedTasks[tasks.indexOf(task)] = newTask;
        setTasks(updatedTasks);
        storeTodayTasks(updatedTasks);
      } else {
        setTasks([
          newTask,
          ...tasks
        ]);
        storeTodayTasks([
          newTask,
          ...tasks
        ]);
      }
      navigation.navigate('TodayPlan');
    })
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
            ref={taskTimerRef}
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
          <Text style={styles.timePickerLabelText}>Finish after </Text>
          <Text style={styles.timerPickerLabelSubtext}>(optional)</Text>
        </View>
        <View style={styles.timeDurationOptionsView}>
            <Text style={styles.timeDurationOptionsLabel}>Pick one of the options</Text>
            <DurationOptions chosenDuration={taskDuration} changeDuration={setTaskDuration} setDurationOptionChanged={setDurationOptionChanged} />
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