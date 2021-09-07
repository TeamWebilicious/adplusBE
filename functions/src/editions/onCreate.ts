import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()



export const duplicateEditions = functions.firestore?.document('publications/editions/{editionid}')
?.onCreate(
    async (snapshot, context) => {

        // console.log("runingggggggggggg............")

        const data = snapshot.data();

        const all = db.doc("pages/editions")
        const responses = await all.get();
        const allEditions = responses.data()?.all

const allPubResponse=await db.doc('pages/publications').get()
const allPub = allPubResponse.data()?.all
const pub=allPub.find((item:any)=>item.id==data.publicationId)
const reqPubName = pub.name


        allEditions.push({
            name: data?.name+"("+reqPubName+")",
            publicationName:reqPubName,
            editionName:data?.name,
            publicationId: data?.publicationId,
            editionId:snapshot.id
            
        })

        return all.update({
                  all:allEditions
        })



    })   
export const duplicateEditionToPublication = functions.firestore?.document('publications/{publicationId}/editions/{editionid}')
    ?.onCreate(
        async (snapshot, context) => {

            // console.log("runingggggggggggg............")

            const data = snapshot.data();

            const all = db.doc(`publications/${data.publicationId}`)
             const response = await all.get()
             const allEditions = response.data()?.editions

          allEditions.push({
              cd:data?.cdCheck,
              ct:data?.ctCheck,
              d:data?.dCheck,
              name: data?.name,
              id:snapshot.id
            
            })

             return all.update({
                       editions:allEditions,
             })
            })
