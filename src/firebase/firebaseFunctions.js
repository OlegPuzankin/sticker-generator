import firebase from '../firebase'



export function loadAndSyncCollection(collection, dispatchFunction) {

    return firebase.db.collection(collection)
        .orderBy('name')
        .onSnapshot(snapshot => {
            const result = snapshot.docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            });
            dispatchFunction(result);
        })
}



export function loadCollection(collection) {
    return firebase.db.collection(collection)
        .orderBy('name')
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => {
                return {...doc.data(), id: doc.id}
            });
        })

}

export function loadStickers() {
    return firebase.db.collection('stickers')
        .orderBy('created', 'desc')
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => {
                return {...doc.data(), id: doc.id}
            });
        })

}

export function loadAndSyncStickers(setStickers) {

    return firebase.db.collection('stickers')
        .orderBy('originalTitle')
        .onSnapshot(snapshot => {
            const result = snapshot.docs.map(doc => {
                return {...doc.data(), id: doc.id}
            });
            setStickers(result)
        })
}

export function getItemCollectionById(collection, id) {
    return firebase.db.collection(collection).doc(id)

}

export function addItemInCollection(collection, item) {

    return firebase.db.collection(collection).add(item)
}

//////////////////////////////temp functions////////////////////////

// export function setRegion() {
//     const collectionRef = firebase.db.collection('appellations')
//     collectionRef.get().then(snapshot => {
//         snapshot.docs.forEach(doc => {
//             doc.ref.update({region: 'Бургундія', regionId: 'G987HGuspZpcSmJCMUkp'})
//         });
//         //console.log('temp f',snapshot.docs[0].ref.update({wtf:'wtf'}))
//         //console.log('MY F', snapshot.docs[0].data())
//     })
//
// }


