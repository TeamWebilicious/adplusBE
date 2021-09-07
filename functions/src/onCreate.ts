import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()





            

 
                //         return db.doc("pages/test").set({
                //             test:"dknash",
                //             pubId: pubId,
                //             // allEditions: allEditions,
                //             all: all,
                //             response: response,

                //  })
                    
                    
                    
                    
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
                        
                        
    