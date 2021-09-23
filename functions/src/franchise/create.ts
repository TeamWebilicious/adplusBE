import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import * as cors from 'cors'

const db = admin.firestore()


export const makeFranchise = functions.https.onCall(async (data, context) => {
    const adminId = context.auth?.uid;
    const uId = data.uid
    const franchise = data.franchise
    if (adminId == "0WoNvjSrbnS81zawdd9bOZFmbzr1") {
        return await db.collection('profile').doc(uId).update({ franchise: franchise })
    }
    return null
})
