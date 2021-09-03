import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()

export const updateToRecentOrder = functions.firestore?.document('orders/{orderId}')
    ?.onUpdate(
        async (snapshot, context) => {
            const data = snapshot.after.data();
            const recentOrder = db.doc(`profile/${data.uid}/recentOrder/${snapshot.after.id}`)
            return recentOrder.set(data)
        });