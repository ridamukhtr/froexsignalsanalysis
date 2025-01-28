

import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { NavigationService } from './src/navigators/NavigationServices';
import { ROUTES } from './src/routes/RouteConstants';

// Create notification channel
PushNotification.createChannel(
  {
    channelId: 'test1',
    channelName: 'Test Channel',
    channelDescription: 'A channel for test notifications',
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created) => console.log("Channel created:", `${created}`)
);

// Initialize PushNotification
PushNotification.configure({
  onNotification: function (notification) {
    console.log('ON Notification:', notification);

    // Handle notification tap
    if (notification.userInteraction) {
      const topic = notification.data?.topic;
      const msgId = notification.data?.msg_id;

      console.log("noti msg id1", msgId);
      console.log("noti topic", topic);



      if (topic) {
        NavigationService.navigate(ROUTES.screenDetails, { page_id: topic, msg_id: msgId });
        console.log('Navigating to:', ROUTES.screenDetails, { page_id: topic, msg_id: msgId });

      }
    }
  },
  requestPermissions: Platform.OS === 'ios',
});

messaging().onMessage(remoteMessage => {
  console.log('Message handled in the foreground:', remoteMessage);
  const { title, message, topic } = remoteMessage?.data || {};
  if (title && message) {
    PushNotification.localNotification({
      channelId: 'test1',
      title: title || 'Notification',
      message: message || 'You have a new notification',
      priority: 'high',
      userInfo: { topic }, // Pass the topic in userInfo to access it in onNotification
      data: { topic }      // For Android
    });
  } else {
    console.log('Invalid message data:', remoteMessage);
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background:', remoteMessage);
  const { title, message, topic } = remoteMessage?.data || {};
  if (title && message) {
    PushNotification.localNotification({
      channelId: 'test1',
      title: title || 'Notification',
      message: message || 'You have a new notification',
      priority: 'high',
      userInfo: { topic }, // Pass the topic in userInfo to access it in onNotification
      data: { topic }      // For Android
    });
  } else {
    console.log('Invalid message data:', remoteMessage);
  }
});

AppRegistry.registerComponent(appName, () => App);
