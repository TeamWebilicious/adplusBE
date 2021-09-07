import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()


export const deleteEditionSubcollectionInPub = functions.firestore?.document('publications/{publicationsid}')
    ?.onDelete(
        async (snapshot, context) => {



            const data = snapshot.data();

            const pubEditions = data.editions
            for (let i = 0; i < pubEditions.length; i++) {
                const eachEdition = pubEditions[i];

                const all = db.doc(`"publications/${data.id}/editions/${eachEdition.id}"`)
                all.delete()
            }


            //  return db.doc("pages/test").set({pubEditions:pubEditions})
            //return true
        })

export const deleteEditionPages = functions.firestore?.document('publications/{publicationsid}/editions/{editionid}')
    ?.onDelete(
        async (snapshot, context) => {

            // console.log("runingggggggggggg............")

            //const data = snapshot.data();

            const all = db.doc("page/editions")
            const responses = await all.get();
            const allPublications = responses.data()?.all

            //2-  // const newUpdate = allPublicationsfilter((pub:any) =>{
            //     pub.id !== data.id
            // })
            // allPublications.push({
            //     name: data?.name,
            //     publicationId: data?.id,
            // })

            let index = allPublications.findIndex((item: any) => {
                item.id = snapshot.id;
            })

            allPublications.splice(index, 1)

            return all.update({
                all: allPublications,
            })

        })
