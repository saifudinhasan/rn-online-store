import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useDispatch } from 'react-redux'
import { loadUser } from '@/Store/Auth'
import { getCategories } from '@/Store/Categories'
import { getProducts } from '@/Store/Products'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const init = async () => {
    await dispatch(loadUser())
    await dispatch(getCategories())
    await dispatch(getProducts())
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('HomePage') // Splash and redirect to HomePage
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

export default StartupContainer
