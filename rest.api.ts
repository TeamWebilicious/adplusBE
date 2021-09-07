import * as functions from "firebase-functions";
import * as express from 'express'
import * as cors from 'cors'
import { auth, order } from '../middleware'



const admin = require('firebase-admin');
const db = admin.firestore()

const app = express();
app.use(cors({ origin: true }));

//rest api

//gets allOrders
app.get('/', auth.validate, async (req, res) => {
    const snapshot = await db.collection('orders').get();
    let orders: any = [];
    snapshot.forEach((doc: any) => {
        let id = doc.id
        let data = doc.data();

        orders.push({ id, ...data });
    });

    res.status(200).send(JSON.stringify(orders));
})

app.get('/:id', async (req, res) => {
    const snapshot = await db.collection('orders').doc(req.params.id).get();

    const orderId = snapshot.id
    const orderData = snapshot.data();

    res.status(200).send(JSON.stringify({ id: orderId, ...orderData }));

})

//giving data into the database 
app.post('/', order.validate, async (req, res) => {
    const order = req.body
    await db.collection('orders').add(order);
    res.status(201).send();

})

//updating the values which were updated by the user
app.put('/:id', async (req, res) => {
    const body = req.body;
    await db.collection('orders').doc(req.params.id).update({
        ...body
    })
    res.status(200).send();

})

//deleting the specified value
app.delete('/:id', async (req, res) => {
    await db.collection('orders').doc(req.params.id).delete;
    res.status(200).send();


})
export const orders = functions.https.onRequest(app)