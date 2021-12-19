import { useAuth, useTheme } from '@/Hooks'
import { getUserLabel } from '@/Utils'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const UserAvatar = ({ onPress }: { onPress: () => any }) => {
  const { authenticated, currentUser } = useAuth()
  const { Gutters, Colors } = useTheme()

  if (!authenticated) {
    return (
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="account"
          color={Colors.primary}
          size={34}
          style={[Gutters.smallRMargin]}
        />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={onPress}>
      {currentUser?.photoURL ? (
        <Avatar.Image
          size={34}
          style={[Gutters.smallRMargin, styles.FloatingMenu]}
          source={{ uri: currentUser.photoURL }}
        />
      ) : (
        <Avatar.Text
          size={34}
          style={[Gutters.smallRMargin, { backgroundColor: Colors.primary }]}
          label={getUserLabel(currentUser?.email || '')}
          labelStyle={styles.LabelStyle}
        />
      )}
    </TouchableOpacity>
  )
}

export default UserAvatar

const styles = StyleSheet.create({
  FloatingMenu: {
    backgroundColor: 'white',
  },
  LabelStyle: {
    color: '#fff',
    fontWeight: '900',
  },
})
