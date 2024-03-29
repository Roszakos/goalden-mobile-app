import * as Notifications from "expo-notifications";
import {  Platform } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from '@react-navigation/native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    registerForNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response.notification.request.trigger.channelId == 'goalden-tasks') {
          navigation.navigate('TodayPlan');
        }
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
    
  }, []);

  return (
    null
  );
}

export async function scheduleNotification (
  title,
  date,
  body,
  notifId = null
) {
  const id = await Notifications.scheduleNotificationAsync({
    identifier: notifId,
    content: {
      title: title,
      body: body,
      sound: null
    },
    trigger: {
      channelId: 'goalden-tasks',
      date: date,
    },
  });
  return id;
}

async function registerForNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("goalden-tasks", {
      name: "Goalden Tasks",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default',
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }
}

export async function cancelNotification(notifId){
  await Notifications.cancelScheduledNotificationAsync(notifId);
}

export const displayTaskDuration = (duration) => {
  if (parseInt(duration)) {
    const hours = parseInt(duration[0] + duration[1]);
    const minutes = duration[2] + duration[3];

    if (parseInt(hours) && parseInt(minutes)) {
      return hours + ' h ' + minutes + ' min';
    } else if (parseInt(hours)) {
      const declention = hours == 1 ? ' hour' : ' hours';
      return hours + declention;
    } else if (parseInt(minutes)) {
      const declention = minutes == 1 ? ' minute' : ' minutes';
      return minutes + declention;
    }

    return null;
  }
  return null;
}

export const setTaskNotificationTime = (hour, minute) => {
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute - 5);
  date.setSeconds(0);
  return date;
}