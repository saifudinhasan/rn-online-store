import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { setDefaultTheme } from '@/Store/Theme'

const StartupScreen = () => {
  const { Layout, Gutters, Fonts } = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    setTimeout(() => {
      setDefaultTheme({ theme: 'default', darkMode: null })
      navigateAndSimpleReset('HomePage') // Splash and redirect to HomePage
    }, 200)
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      <Text style={Fonts.textCenter}>{t('welcome')}</Text>
    </View>
  )
}

export default StartupScreen
