import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()



export const updatePagesSchemes = functions.firestore.document('schemes/{schemeId}')
.onUpdate(async (snapshot:any, context:any) => {
   
   // const beforeData = snapshot.before.data()
    // const after = snapshot.after
    const afterData = snapshot.after.data()
    const newName= afterData.name
    const pubId= afterData.id
    const newDescription= afterData.description

    const schemeRef = db.doc("pages/schemes")
    const response = await schemeRef.get()
    const schemeData: any = response.data()?.all

let index= schemeData.findIndex((item:any)=>item.id==pubId)
schemeData[index].name =newName 
schemeData[index].description = newDescription

    
    return schemeRef.update({
     all:schemeData
    });
});

