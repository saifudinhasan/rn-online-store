import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'

const getCollectionWithQuery = async (
  collection: string,
  fieldPath: string | number | FirebaseFirestoreTypes.FieldPath,
  opStr: FirebaseFirestoreTypes.WhereFilterOp,
  value: any,
): Promise<any[] | []> => {
  try {
    let result: any[] | [] = []

    const query = await firestore()
      .collection(collection)
      .where(fieldPath, opStr, value)
      .get()

    query.forEach(q => (result = [...result, q.data()]))

    return result
  } catch (error) {
    return []
  }
}

export default getCollectionWithQuery
