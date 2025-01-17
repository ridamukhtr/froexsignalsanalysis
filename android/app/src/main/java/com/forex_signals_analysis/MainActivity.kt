package com.forex_signals_analysis
import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen
import android.content.res.Configuration  // Add this import
import android.view.WindowManager
class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "forex_signals_analysis"

     override fun onCreate(savedInstanceState: Bundle?) {
        // Apply the correct theme before the splash screen
        val currentNightMode = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
        if (currentNightMode == Configuration.UI_MODE_NIGHT_YES) {
            // Apply Dark Theme Splash
            setTheme(R.style.SplashTheme_Dark)
        } else {
            // Apply Light Theme Splash
            setTheme(R.style.SplashTheme)
        }

        // Ensure the theme is set before showing the splash screen
        super.onCreate(savedInstanceState)

        // Show splash screen after the theme is set
        SplashScreen.show(this)  

        // Set the status bar to be visible
        window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
    }


  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
