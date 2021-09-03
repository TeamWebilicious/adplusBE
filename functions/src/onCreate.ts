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

                //         return db.doc("pages/test").set({
                //             test:"dknash",
                //             pubId: pubId,
                //             // allEditions: allEditions,
                //             all: all,
                //             response: response,

                //  })
                    })   
                    
                    
                    
                    export const duplicateCategoriesToPublication = functions.firestore?.document('pages/categories')
                    ?.onCreate(
                        async (snapshot, context) => {
            
                            // console.log("runingggggggggggg............")
            
                            const data = snapshot.data();
            
                            for (let i = 0; i < data.publications.length; i++) {
                                let pub = data.publications[i];
                                const all = db.doc(`publications/${pub.id}`)
                                
                                const responses = await all.get();
                            const cd = responses.data()?.cd
                                const allswdws = cd.swdws
        
                                
                               allswdws.push({
                                
                                    name: data?.name,
                                    id:data?.id,
                                    singleWidth:0,
                                    doubleWidth:0
                                })
                                 all.update({
                                    cd:cd,
                          })
          
                            }

                        })   
                        
                        /*export const duplicatePositionsToPublication = functions.firestore?.document('pages/positions')
                    ?.onCreate(
                        async (snapshot, context) => {
            
                            // console.log("runingggggggggggg............")
            
                            const data = snapshot.data();
            
                                const all = db.doc(`publications/${data.publicationId}/editions/${data.editions.eId}`)

                                const responses = await all.get();
                                const displayall = responses.data()?.display
                                const allpos = displayall.prcrs
        
                                
                               allpos.push({

                                colorRate:null,
                                name: data?.name,
                                id:data?.id,
                                mmpcs:[],
                                positionRate:null,
                                })

                                 return all.update({
                                    display:allpos,
                          })
          
                            

                        })   */
                        
                        
    