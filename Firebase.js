import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { NavigationService } from './src/navigators/NavigationServices';
import { ROUTES } from './src/routes/RouteConstants';

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

  lastProcessedMsgId = messageId;  // Update the last processed message ID

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
}

// 🔄 Handle incoming messages
export function notificationListener() {
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground Notification:', remoteMessage);
    await displayNotification(remoteMessage);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background Message:', remoteMessage);
    // await displayNotification(remoteMessage);
    // handleNavigation(remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('App opened from background:', remoteMessage);
    handleNavigation(remoteMessage);
  });

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('App opened from quit state:', remoteMessage);

      handleNavigation(remoteMessage);
    }
  });
}



function handleNavigation(remoteMessage) {

  if (remoteMessage?.data) {
    const { msg_id, topic, time_frame } = remoteMessage.data;
    if (msg_id && topic && time_frame) {
      NavigationService.navigate(ROUTES.screenDetails, { msg_id, page_id: topic, time: time_frame });
      console.log("---------------------------", remoteMessage);

    }
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
