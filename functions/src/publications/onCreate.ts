import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()



export const duplicateToPagesPub = functions.firestore?.document('publications/{publicationsid}')
        ?.onCreate(
            async (snapshot, context) => {

                // console.log("runingggggggggggg............")

                const data = snapshot.data();

                const all = db.doc("pages/publications")
                const responses = await all.get();
                const allPublications = responses.data()?.all

                allPublications.push({
                    name: data?.name,
                    publicationId: snapshot.id,
                })

                return all.update({
                          all:allPublications
                })

            })

            export const duplicateToPagesCat = functions.firestore?.document('publications/{publicationsid}')
        ?.onCreate(
            async (snapshot, context) => {

                // console.log("runingggggggggggg............")

                const data = snapshot.data();
                const swdws = data.cd.swdws
                const all = db.doc("pages/categories")

                const responses = await all.get();
                const allCategories = responses.data()?.all
                
                for (let i = 0; i < swdws.length; i++) {
                    const swdw = swdws[i];
                    if(swdw.id !== "default"){
                    let index = allCategories.findIndex((cat:any) => cat.id==swdw.id)
                    //let reqCategory=allCategories[index]
                    let newPub={
                        id:snapshot.id,
                        name:data?.name
                    }
                    allCategories[index].publications.push(newPub)
                    }
                }

                return all.update({
                          all:allCategories
                })

            })

