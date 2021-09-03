
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()

export const updateTaxToPub = functions.firestore?.document('pages/general')
    ?.onUpdate(
        async (change, context) => {

            //const data = change.after.data();

            const all = db.doc(`pages/publications`)
            const response = await all.get()
            const allPublications = response.data()?.all


            for (let i = 0; i < allPublications.length; i++) {
                const eachPub = allPublications[i];

                const all = db.doc(`"publications/${eachPub.id}"`)
                all.update({
                    //parseint converts string to integers
                    // tax:parseInt(data.tax)
                    tax: 99
                })
            }
        })
