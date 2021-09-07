//import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export { duplicateToPagesPub } from "./publications/onCreate"
export { duplicateToPagesCat } from "./onCreate"
export { duplicateEditionToPublication } from "./editions/onCreate"
export { duplicateCategoriesToPublication } from "./onCreate"
export { duplicateEditions } from "./editions/onCreate"
export { deletePagesInPub } from "./onDelete"
export { duplicateScheme } from "./schemes/onCreate"

export { deletePagesInCat } from "./onDelete"
export { deleteEditionSubcollectionInPub } from "./onDelete"
//export { updateTaxToPub } from "./onUpdate"
export {updatePagesPublication} from "./publications/onUpdate"
export {updatePagesEdition} from "./publications/onUpdate"
export {updatePagesSchemes} from "./schemes/onUpdate"

//order functions
/*onCreate*/
// export { duplicateToRecentOrderAndAddInfo } from "./order/onCreate"
/*onUpdate*/
export { updateToRecentOrder } from "./order/onUpdate"

//order rest api 
export { orders } from "./order/rest.api"