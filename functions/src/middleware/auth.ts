export const auth = {
    validate}
function validate  (req:any, res:any, next:any) {
    console.log('validate mw is ruuunnnniiinnnngggg', req,res)
    next()

}
