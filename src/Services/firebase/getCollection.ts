import firestore from '@react-native-firebase/firestore'

const getCollection = async (collection: string): Promise<any[]> => {
  try {
    let result: any[] | [] = []

    const query = await firestore().collection(collection).get()

    if (query.empty) {
      throw new Error('The data is empty')
    }

    query.forEach(doc => (result = [...result, { id: doc.id, ...doc.data() }]))

    return result
  } catch (err: unknown) {
    if (err instanceof Error) {
      return Promise.reject(err.message)
    }

    return Promise.reject(err)
  }
}

export default getCollection
