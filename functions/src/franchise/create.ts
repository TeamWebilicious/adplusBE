import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()


export const makeFranchise = functions.https.onCall(async (data, context) => {
    const adminId = context.auth?.uid;
    const uId = data.uid
    if (adminId == "0WoNvjSrbnS81zawdd9bOZFmbzr1") {
        return await db.collection('users').doc(uId).set({ franchise: true })
    }
    return { status: 200, msg: "Upated as user successfully" }
})
