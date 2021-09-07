import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()

export const deletePagesInPub = functions.firestore?.document('publications/{publicationsid}')
    ?.onDelete(
        async (snapshot, context) => {

            // console.log("runingggggggggggg............")

            //const data = snapshot.data();

            const all = db.doc("pages/publications")
            const responses = await all.get();
            const allPublications = responses.data()?.all

            // const newUpdate = allPublications.filter((pub:any) =>{
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

export const deletePagesInCat = functions.firestore?.document('publications/{publicationsid}')
    ?.onDelete(
        async (snapshot, context) => {

            // console.log("runingggggggggggg............")

            const data = snapshot.data();

            const swdws = data.cd.swdws

            const all = db.doc("pages/categories")
            const responses = await all.get();
            const allCategories = responses.data()?.all

            for (let i = 0; i < swdws.length; i++) {
                const swdw = swdws[i];
                if (swdw.id !== "default") {
                    let catIndex = null;
                    let reqCategory = allCategories.find((cat: any) => {
                        // catIndex= index
                        cat.id == swdw.id
                    })

                    //  let catPubIndex =reqCategory.publications.findIndex((item:any)=>{ item.id !==data.id})  
                    //reqCategory.publications.splice(catPubIndex,1)
                    //  allCategories.splice(catIndex,1,reqCategory)

                    db.doc("pages/test").set({
                        all: reqCategory,
                        index: catIndex
                    })

                }
            }
        })





/* const all = db.doc("pages/categories")
 const responses = await all.get();
 const allCategories = responses.data()?.all

 for (let i = 0; i < allCategories.length; i++) {
     const eachPub = allCategories[i].publications;
 
     let index = eachPub.findIndex((item:any)=>{
         item.id = data.id;
     })
 
       eachPub.splice(index,1)
     
        all.update({
         all:allCategories,
     })
 }
})*/