// import packages
import { useDispatch } from 'react-redux';
import { Switch } from 'react-native-switch';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Linking, View, Platform, ScrollView } from 'react-native';
// import components
import CustomView from '../components/customComponents/CustomView';
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
import CustomText from '../components/customComponents/CustomText';
// import hooks
import { useThemeManager } from '../lib/customHooks/useThemeManager';
import { useFavManager } from '../lib/customHooks/useFavManager';
import { changeTheme } from '../redux/themeReducer';
import useNavigationManager from '../lib/customHooks/useNavigationManager';
// imort styling
import globalStyles from '../styles/global-styles';
import { COLORS } from '../styles/theme-styles';
import CustomDropdown from '../components/customComponents/CustomDropdown';
import CustomModal from '../components/customComponents/CustomModal';
import { LogLevel, OneSignal } from 'react-native-onesignal';

const links = [
  { label: 'Follow us on Facebook', icon: 'facebook', appUrl: 'fb://page/MXinvesting', webUrl: 'https://www.facebook.com/MXinvesting/' },
  { label: 'Follow us on Instagram', icon: 'instagram', webUrl: 'https://x.com/MXInvesting' },
  { label: 'Follow us on Pinterest', icon: 'pinterest', webUrl: 'https://es.pinterest.com/massyart/' },
  { label: 'Visit Forex API', icon: 'link', webUrl: 'https://fcsapi.com/' },
  { label: 'Rate ForexAnalysis App', icon: 'star', webUrl: 'https://play.google.com/store/apps/details?id=com.forexanalysis' },
];
const MoreScreen = () => {
  const { scrollViewRef } = useRef();
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(currentTheme === 'dark');

  const { fnShare } = useFavManager();
  const { fnNavigateToHelp, fnNavigateToPrivacy } = useNavigationManager()
  const { bgColor, textColor, currentTheme, borderColor, footerColor, dropdownColor, iconColor } = useThemeManager();

  const handleThemeToggle = (newCheckedState) => {
    const selectedTheme = newCheckedState ? 'dark' : 'light';

    // Update the state and dispatch the theme change
    setIsEnabled(newCheckedState);
    dispatch(changeTheme(selectedTheme));
  };

  const openLink = async (link) => {
    const { appUrl, webUrl } = link;

    try {
      if (appUrl) {
        const supported = await Linking.canOpenURL(appUrl);
        await Linking.openURL(supported ? appUrl : webUrl);
      } else if (webUrl) {
        await Linking.openURL(webUrl);
      } else {
        console.log('No URL provided for this link.');
      }
    } catch (error) {
      console.log('Error opening link:', error);
    }
  };

  const getAppVersion = () => {
    if (Platform.OS === 'android') {
      return '1.0.0';
    } else if (Platform.OS === 'ios') {
      return '1.0.0';
    }
    return 'Unknown Version';
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    // Set up logging level for debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // Initialize OneSignal with your App ID
    OneSignal.initialize("ae8020dd-afb4-49c2-9ec5-a8003e99b36a");

    // Request notification permission
    OneSignal.Notifications.requestPermission(true);

    // Handle notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });

    // Clean up listeners when the component unmounts
    return () => {
      OneSignal.Notifications.removeEventListener('click');
    };
  }, []);

  const handleNotificationButtonPress = () => {
    console.log('Notifications button pressed');
    // Add any additional logic if needed
  };


  return (
    <CustomView centered={true}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={styles.text}>
          <CustomText >Setting</CustomText>
        </View>
        <View style={styles.container(footerColor)}>
          <View style={[globalStyles.container, styles.body(borderColor)]}>
            <CustomText >Dark Mode</CustomText>
            <Switch
              value={isEnabled}
              onValueChange={handleThemeToggle}
              activeText={''}
              inActiveText={''}
              circleSize={20}
              barHeight={25}
              circleBorderWidth={0}
              switchWidthMultiplier={2.5}
              backgroundActive={dropdownColor}
              backgroundInactive={dropdownColor}
              innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
              renderInsideCircle={() =>
                isEnabled ? (
                  <Icon name="check" size={15} color={iconColor} />

                ) : (
                  <Icon name="times" size={15} color={iconColor} />
                )
              }
            />

          </View>
          <View style={[styles.body(borderColor), { borderBottomWidth: 0 }]} >
            <CustomTouchableOpacity onPress={handleNotificationButtonPress} >
              <CustomText>{'Notifications'}</CustomText>
            </CustomTouchableOpacity>
          </View>
        </View>
        <View style={styles.text}>
          <CustomText>Enjoy Using ForexAnalysis</CustomText>
        </View>

        <View style={styles.container(footerColor)}>
          {links.map((link, index) => (
            <View
              key={index}
              style={[
                styles.body(borderColor),
                index === links.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <CustomTouchableOpacity onPress={() => openLink(link)} style={globalStyles.gapContainer} >
                <Icon name={link.icon} size={20} color={iconColor} style={styles.icon} />
                <CustomText>{link.label}</CustomText>
              </CustomTouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.text}>
          <CustomText style={{}}>Others</CustomText>
        </View>

        <View style={styles.container(footerColor)}>

          <View style={[styles.body(borderColor),]} >
            <CustomTouchableOpacity onPress={fnNavigateToPrivacy}  >
              <CustomText>{'Privacy Policy'}</CustomText>
            </CustomTouchableOpacity>
          </View>
          <View style={[styles.body(borderColor), { borderBottomWidth: 0 }]} >
            <CustomTouchableOpacity onPress={fnNavigateToHelp} >
              <CustomText>{'Help'}</CustomText>
            </CustomTouchableOpacity>
          </View>
          <View style={[styles.body(borderColor), { borderBottomWidth: 0 }]} >
            <CustomTouchableOpacity onPress={openModal} >
              <CustomText>{'Contact us'}</CustomText>
            </CustomTouchableOpacity>
          </View>
        </View>

        <View style={[styles.container(footerColor), { elevation: 0, alignItems: "center", marginVertical: 15, backgroundColor: COLORS.YELLOW, }]}>
          <CustomTouchableOpacity
            onPress={fnShare}
            style={[styles.body(borderColor), globalStyles.gapContainer, { gap: 10, borderBottomWidth: 0 }]}
          >
            <Icon name={'share-alt'} size={20} color={iconColor} style={styles.icon} />
            <CustomText style={{ color: COLORS.BLACK }}>{'Share the ForexAnalysis App'}</CustomText>
          </CustomTouchableOpacity>
        </View>
        <View style={{ alignItems: "center", paddingBottom: 15, }}>
          <CustomText style={styles.versionText}>App Version: {getAppVersion()}</CustomText>
        </View>
      </ScrollView>

      <CustomModal isVisible={isModalVisible} setIsVisible={setIsModalVisible}>
        <CustomText style={styles.modalTitle}>Contact Us</CustomText>
        <CustomText style={styles.modalContent}>
          For inquiries, please email us at:
        </CustomText>
        <CustomText style={styles.email}>support@example.com</CustomText>
      </CustomModal>
    </CustomView>
  );
};
const styles = StyleSheet.create({
  container: (footerColor) => ({
    marginBottom: 15,
    backgroundColor: footerColor,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  }),
  body: (borderColor) => ({ borderBottomColor: borderColor, borderBottomWidth: 1, paddingVertical: 15, paddingHorizontal: 15, }),
  text: { paddingBottom: 10, paddingLeft: 7, paddingTop: 15, },

  toggleContainer: {
    width: 50,
    height: 22,
    borderRadius: 150 / 1,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  iconContainer: {
    width: 18,
    height: 18,
    borderRadius: 150 / 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoreScreen;
