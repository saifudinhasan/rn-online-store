import firestore from '@react-native-firebase/firestore'

const postToCollection = async (
  collection: string,
  value: any,
): Promise<void> => {
  await firestore().collection(collection).add(value)
}

export default postToCollection
