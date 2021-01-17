import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const groceryList = functions.https.onRequest((request, response) => {
    if (request.method == 'OPTIONS') {
        response.status(200)
        response.setHeader('Access-Control-Allow-Origin','*');
        response.send({"res": "CORS RESPONSE"})
        return;
    }

    try {
        // functions.logger.info("Starting try", request.body);
        
        // let re = new RegExp(`'`, 'g');
        // let str_body = request.body.toString();
        // str_body = str_body.replace(re, `"`)
        // console.log(request.body)
        // console.log(str_body)
        // functions.logger.info("Middle try", str_body);
        // str_body = str_body.substring(1, str_body.length - 1);
        // functions.logger.info("Middle 2 try", str_body);
        // let body = JSON.parse(str_body);
        // functions.logger.info("Made it", body);

        admin.firestore().collection('groceries').add({list: request.body, data: new Date()}).then(writeResult => {
            // write is complete here
        });
        
    } catch (error) {
        functions.logger.info("Error!!!!", {structuredData: error});
        functions.logger.info("Body!!!!", {structuredData: request.body});
    }
    functions.logger.info("Hello logs!", {structuredData: request.body});
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(`Hello from Firebase! ${JSON.stringify(request.body)}`);
});
