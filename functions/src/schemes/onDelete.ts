import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()




export const deleteSchemesInPages = functions.firestore?.document('schemes/{schemeId}')
    ?.onDelete(
        async (snapshot, context) => {

            // const data = snapshot.data();

            const all = db.doc("pages/schemes")
            const responses = await all.get();
            const allSchemes = responses.data()?.all

            let index = allSchemes.findIndex((item: any) => {
                item.id == snapshot.id;
            })

            allSchemes.splice(index, 1)

            return all.update({
                all: allSchemes,
            })

        })