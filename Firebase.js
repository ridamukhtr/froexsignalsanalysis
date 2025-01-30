// import packages
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
// services
import { NavigationService } from './src/navigators/NavigationServices';
import { ROUTES } from './src/routes/RouteConstants';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('User clicked notification:', notification);

    // Ensure navigation happens ONLY when user clicks the notification
    if (notification.userInteraction) {
      handleNavigation(notification);
    }
    else {
      displayNotification(notification);
    }
  },
  popInitialNotification: true,
  requestPermissions: false,  // No need to request permissions again
});

// ✅ Request permission only once
export async function requestUserPermission() {
  const authStatus = await messaging().hasPermission();
  if (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    console.log('Notification permission already granted.');
    return;
  }

  const newAuthStatus = await messaging().requestPermission();
  if (
    newAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    newAuthStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    console.log('Notification permission granted.');
  } else {
    console.log('Notification permission denied.');
  }
}

// ✅ Get FCM Token only once
export async function getToken() {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
}

// ✅ Create notification channel only once
export function createNotificationChannel() {
  PushNotification.createChannel(
    {
      channelId: 'alert-messages',
      channelName: 'alert-messages',
      channelDescription: 'A default notification channel',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`Notification channel created: ${created}`)
  );
}

let lastProcessedMsgId = null;

// 📲 Display a local notification
async function displayNotification(remoteMessage) {
  const { messageId } = remoteMessage || {};  // Extract message ID
  if (lastProcessedMsgId === messageId) {
    console.log('Duplicate notification, skipping...');
    return;
  }

  lastProcessedMsgId = messageId;
  const { time_frame, topic } = remoteMessage?.data || {};
  const storedTimes = await AsyncStorage.getItem('selectedTimes');
  console.log("stored", storedTimes);

  const selectedTimes = storedTimes ? JSON.parse(storedTimes) : {};
  if (selectedTimes[topic]?.includes(time_frame)) {
    PushNotification.localNotification({
      channelId: 'alert-messages',
      title: remoteMessage.data.title || "Notification",
      message: remoteMessage.data.message || "You have a new message",
      color: 'blue',
      priority: 'high',
      playSound: true,
      soundName: 'default',
      vibrate: true,
      userInfo: { msg_id: remoteMessage?.data?.msg_id, page_id: remoteMessage?.data?.topic, time: remoteMessage?.data?.time_frame },
    });
  } else {
    console.log('Notification ignored as the time is not marked by the user.');
  }

}

// 🔄 Handle incoming messages
export function notificationListener() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Message:', remoteMessage);

    // await displayNotification(remoteMessage);
    // handleNavigation(remoteMessage);
  });

  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log('App opened from background:', remoteMessage);
  //   handleNavigation(remoteMessage);
  // });




  // messaging().getInitialNotification().then(remoteMessage => {
  //   if (remoteMessage) {
  //     console.log('App opened from quit state:', remoteMessage);
  //     handleNavigation(remoteMessage);
  //   }
  // });
}


function handleNavigation(remoteMessage) {
  const msg_id = remoteMessage.data.msg_id;
  const page_id = remoteMessage.data.page_id || remoteMessage.data.topic;
  const time = remoteMessage.data.time || remoteMessage.data.time_frame;
  if (msg_id && page_id && time) {
    NavigationService.navigate(ROUTES.screenDetails, { msg_id, page_id, time });
  }
}

// 📰 Subscribe to a topic
export async function subscribeToTopic(topic) {
  try {
    await messaging().subscribeToTopic(topic);
    console.log(`Subscribed to topic: ${topic}`);
  } catch (error) {
    console.error('Failed to subscribe to topic:', error);
  }
}

// 🚫 Unsubscribe from a topic
export async function unsubscribeFromTopic(topic) {
  try {
    await messaging().unsubscribeFromTopic(topic);
    console.log(`Unsubscribed from topic: ${topic}`);
  } catch (error) {
    console.error('Failed to unsubscribe from topic:', error);
  }
}
