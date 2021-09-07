import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()



export const duplicateScheme = functions.firestore?.document('schemes/{schemeid}')
        ?.onCreate(
            async (snapshot, context) => {

                // console.log("runingggggggggggg............")

                const data = snapshot.data();

                const all = db.doc("pages/schemes")
                const responses = await all.get();
                const allSchemes = responses.data()?.all

                allSchemes.push({
                    name: data?.name,
                    publicationsId: snapshot.id,
                    description:null,
                })

                return all.update({
                          all:allSchemes
                })

            })
