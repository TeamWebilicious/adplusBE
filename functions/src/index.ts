//import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export { duplicateToPagesPub } from "./onCreate"
export { duplicateToPagesCat } from "./onCreate"
export { duplicateEditionToPublication } from "./onCreate"
export { duplicateCategoriesToPublication } from "./onCreate"
export { duplicateEditions } from "./onCreate"
export { deletePagesInPub } from "./onDelete"

export { deletePagesInCat } from "./onDelete"
export { deleteEditionSubcollectionInPub } from "./onDelete"
export { updateTaxToPub } from "./onUpdate"

//order functions
/*onCreate*/
// export { duplicateToRecentOrderAndAddInfo } from "./order/onCreate"
/*onUpdate*/
export { updateToRecentOrder } from "./order/onUpdate"

//order rest api 
export { orders } from "./order/rest.api"