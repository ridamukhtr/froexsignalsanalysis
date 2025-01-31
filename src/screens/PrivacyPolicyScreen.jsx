// import packages
import React from 'react'
import { Linking, StyleSheet, View } from 'react-native'
// import components
import CustomView from '../components/customComponents/CustomView'
import CustomScrollView from '../components/customComponents/CustomScrollView'
import CustomText from '../components/customComponents/CustomText'
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity'
// static data
import { all_data } from '../../assets/all_data'
// import styling
import globalStyles from '../styles/global-styles'
import { useThemeManager } from '../lib/customHooks/useThemeManager'
import { COLORS } from '../styles/theme-styles'

const PrivacyPolicyScreen = () => {

  const { dropdownColor } = useThemeManager();

  const handleEmailPress = () => {
    Linking.openURL('mailto:droid.st.labs@gmail.com');
  };

  return (
    <CustomView showBackIcon title={"Privacy Policy"}>
      <CustomScrollView>
        <CustomText>{all_data.introPrivacy}</CustomText>
        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>{"1) INFORMATION WE COLLECT ABOUT YOU"}</CustomText>
        </View>
        <CustomText>{all_data.detail1}</CustomText>

        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>{"2. WHERE WE STORE DATA"}</CustomText>
        </View>
        <CustomText>{all_data.detail2}</CustomText>

        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>{"3. DISCLOSURE OF YOUR INFORMATION"}</CustomText>
        </View>
        <CustomText>{all_data.detail3}</CustomText>

        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>
            {"4. CANCELING YOUR ACCOUNT OR DELETING PERSONALLY IDENTIFIABLE INFORMATION"}
          </CustomText>
        </View>
        <CustomText>{all_data.detail4}</CustomText>

        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>
            {"5. DATA SECURITY"}
          </CustomText>
        </View>
        <CustomText>{all_data.detail5}</CustomText>

        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>
            {"6. MOBILE ANALYTICS"}
          </CustomText>
        </View>
        <CustomText>{all_data.detail6}</CustomText>

        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>
            {"7. CHANGES TO THIS PRIVACY POLICY"}
          </CustomText>
        </View>
        <CustomText>{all_data.detail7}</CustomText>

        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>
            {"8. App Permissions"}
          </CustomText>
        </View>
        <CustomText>{all_data.detail8}</CustomText>

        <View style={styles.headingContainer(dropdownColor)}>
          <CustomText style={globalStyles.titleText}>
            {"HOW DO YOU CONTACT US WITH QUESTIONS?"}
          </CustomText>
        </View>
        <CustomText>{all_data.detail9}</CustomText>
        <CustomTouchableOpacity onPress={handleEmailPress} style={{ marginBottom: 15 }}>
          <CustomText style={{ color: COLORS.INFO_BLUE }}>droid.st.labs@gmail.com</CustomText>
        </CustomTouchableOpacity>
      </CustomScrollView>
    </CustomView>
  )
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({
  headingContainer: (dropdownColor) => ({ backgroundColor: dropdownColor, paddingHorizontal: 10, marginVertical: 10 })
})