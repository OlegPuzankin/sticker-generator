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

export function loadCollection (collection){


    return firebase.db.collection(collection)
        .orderBy('name')
        .get()
        .then(snapshot => {
            return  snapshot.docs.map(doc => {
                return {...doc.data(), id: doc.id}
            });
        })

}

export function loadStickers (){


    return firebase.db.collection('stickers')
        .orderBy('originalTitle')
        .get()
        .then(snapshot => {
            return  snapshot.docs.map(doc => {
                return {...doc.data(), id: doc.id}
            });
        })

}

export function loadAndSyncStickers (setStickers){

    return firebase.db.collection('stickers')
        .orderBy('originalTitle')
        .onSnapshot(snapshot => {
            const result=  snapshot.docs.map(doc => {
                //debugger
                return {...doc.data(), id: doc.id}
            });
            setStickers(result)
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

export function getSticker(id) {
   return firebase.db.collection('stickers').doc(id)

}

export function addItemInCollection(collection, item) {
    debugger

    return firebase.db.collection(collection).add(item)
}


