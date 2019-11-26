import firebase from '../firebase'


export function loadAndSyncCollection (collection, dispatch, type){

    return firebase.db.collection(collection)
        .orderBy('name')
        .onSnapshot(snapshot => {
            const result =  snapshot.docs.map(doc => {
                return doc.data()
            });
            dispatch({type, payload: result});
        })

}


export function getItemCollectionByName(collection, name) {
    debugger

    return firebase.db.collection(collection)
        .where('name', '==', name)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
                return querySnapshot.docs[0].ref
            }
        })
}

export function addItemInCollection(collection, item) {
    debugger

    return firebase.db.collection(collection).add(item)

}


