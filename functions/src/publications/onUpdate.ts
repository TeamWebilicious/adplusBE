import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore()



export const updatePagesPublication = functions.firestore.document('publications/{pubId}')
.onUpdate(async (snapshot:any, context:any) => {
   
   // const beforeData = snapshot.before.data()
    // const after = snapshot.after
    const afterData = snapshot.after.data()
    const newName= afterData.name
    const pubId= afterData.id

    const publicationRef = db.doc("pages/publications")
    const response = await publicationRef.get()
    const publicationData: any = response.data()?.all

let index= publicationData.findIndex((item:any)=>item.id==pubId)
publicationData[index].name =newName 
    
    return publicationRef.update({
     all:publicationData
    });
});


export const updatePagesEdition = functions.firestore.document('publications/{pubId}')
.onUpdate(async (snapshot:any, context:any) => {
   
    const beforeData = snapshot.before.data()
    // const after = snapshot.after
    const afterData = snapshot.after.data()
    const newName= afterData.name
    const pubId= afterData.id
    if(beforeData.name!==afterData.name)
{
    const editionRef = db.doc("pages/editions")
    const response = await editionRef.get()
    const editionData: any = response.data()?.all
    for (let i = 0; i < editionData.length; i++) {
        const element = editionData[i];
        const editionName=element.editionName
        if(element.publicationId==pubId){
            element.publicationName=newName;
            element.name=editionName+"("+newName+")"
        }
        
    }

//let index= .findIndex((item:any)=>item.publicationId==pubId)
//publicationData[index].name =newName 
    
    return editionRef.update({
     all:editionData
    });

}
return null
   
});