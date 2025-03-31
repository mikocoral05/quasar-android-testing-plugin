import { StatusBar } from '@capacitor/status-bar'
import { defineBoot } from '@quasar/app-webpack/wrappers'

export default defineBoot(() => {
  const TARGET_COLOR = '#ffffffff' // White background
  const TARGET_STYLE = 'LIGHT' // Light mode (dark icons)

  // Function to check and update StatusBar background color & text style
  const ensureStatusBarSettings = async (attempt = 0) => {
    try {
      const info = await StatusBar.getInfo()

      const isCorrectColor = info.backgroundColor?.toLowerCase() === TARGET_COLOR.toLowerCase()
      const isCorrectStyle = info.style?.toUpperCase() === TARGET_STYLE

      if (!isCorrectColor) {
        await StatusBar.setBackgroundColor({ color: TARGET_COLOR })
      }

      if (!isCorrectStyle) {
        await StatusBar.setStyle({ style: TARGET_STYLE })
      }

      // Retry if settings are still incorrect (max 5 attempts)
      if ((!isCorrectColor || !isCorrectStyle) && attempt < 5) {
        setTimeout(() => ensureStatusBarSettings(attempt + 1), 500) // Retry every 500ms
      }
    } catch (error) {
      console.error('Error ensuring StatusBar settings:', error)
    }
  }

  // Start checking & applying the StatusBar settings
  ensureStatusBarSettings()
})
