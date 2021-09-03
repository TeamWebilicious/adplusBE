import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()

export const duplicateToRecentOrderAndAddInfo = functions.firestore?.document('orders/{orderId}')
    ?.onCreate(
        async (snapshot, context) => {
            const data = snapshot.data();

            //#check the order

            //add additional info to order
            // const finalOrder = data
            const finalOrder: any = addData(data)


            //update order
            const order = db.doc(`orders/${snapshot.id}`)
            return await order.set(finalOrder)
                .then(() => {
                    //duplicate To Recent Order
                    const recentOrder = db.doc(`profile/${data.uid}/recentOrder/${snapshot.id}`)
                    recentOrder.set(finalOrder)
                })
        });

async function addData(orderData: any) {

    //initiate final order
    const finalOrder = orderData

    //get user
    const userResponses = await db.doc(`users/${orderData.uid}`).get();
    const user: any = userResponses.data();

    //add user info
    const userInfo: any = {
        name: user.personalInfo.name,
        designation: user.personalInfo.designation,
        company: user.companyDetails.companyName,
    }
    finalOrder.push(userInfo)


    //add meta info
    finalOrder.createdAt = admin.firestore.FieldValue.serverTimestamp()
    finalOrder.updateAt = admin.firestore.FieldValue.serverTimestamp()

    //return final order
    return finalOrder
}