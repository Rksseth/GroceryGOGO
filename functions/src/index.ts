import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
let google = require('googleapis');
let privatekey = require("./credentials.json");


admin.initializeApp(functions.config().firebase);

let DOCUMENT_ID = '1qnq9daQF3PiHRrSubVLkAUo3qMkisZWBhWyspRj4UuU';
const docs_service = google.google.docs({version: 'v1'});

let fontSize: number = 11;

// configure a JWT auth client
let jwtClient = new google.google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/documents']);
  
  //authenticate request
  jwtClient.authorize(function (err: any, tokens: any) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully connected!");
    }
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const docsAddText = functions.https.onRequest( async (request, response) => {
    if (request.method == 'OPTIONS') {
        response.status(200)
        response.setHeader('Access-Control-Allow-Origin','*');
        response.send({"res": "CORS RESPONSE"})
        return;
    }

    let originalText: string = await getDoc();
    let newText = originalText.substring(0, originalText.length-1) + request.query.message + ". "
    addText(originalText, newText)
    
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(`Hello from Firebase! ${JSON.stringify(request.query.message)}`);
});

export const docsDeleteText = functions.https.onRequest(async (request, response) => {
    if (request.method == 'OPTIONS') {
        response.status(200)
        response.setHeader('Access-Control-Allow-Origin','*');
        response.send({"res": "CORS RESPONSE"})
        return;
    }
    let originalText: string = await getDoc();
    let newText = removeLastWord(originalText.substring(0, originalText.length-1))
    addText(originalText, newText)

    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(`Removed last word: \n${newText}`);
});

export const changeFont = functions.https.onRequest(async(request, response) => {
    if (request.method == 'OPTIONS') {
        response.status(200)
        response.setHeader('Access-Control-Allow-Origin','*');
        response.send({"res": "CORS RESPONSE"})
        return;
    }
    let originalText: string = await getDoc();

    if (request.query.message == "increase") {
        fontSize = fontSize + 2;
    } else {
        fontSize = fontSize - 2;
    }
    updateFontSize(originalText.length, fontSize)

    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(`New font size: ${fontSize}`);
});

export const docsGet = functions.https.onRequest(async (request, response) => {
    if (request.method == 'OPTIONS') {
        response.status(200)
        response.setHeader('Access-Control-Allow-Origin','*');
        response.send({"res": "CORS RESPONSE"})
        return;
    }
    let text: string = await getDoc();

    if (request.query.message == "last") {
        let split = text.split(".")
        text = split[split.length-2]
    }

    response.setHeader('Access-Control-Allow-Origin','*');
    response.send(text);
});

function getDoc(): Promise<string> {
    return new Promise<string>((resolve) => {
      docs_service.documents.get({
        documentId: DOCUMENT_ID,
        auth: jwtClient
      }, (err: any, res: any) => {
        if (err) return console.log('The API returned an error: ' + err);
    
        let text = ''
        for (let row of res.data.body.content) {
          let paragraph = row.paragraph
          if (paragraph) {
            for(let item of paragraph.elements) {
              let textRun = item.textRun
              if (textRun) {
                text += textRun.content
              }
            }
          }
        }
        resolve(text)
      });
    })
}
// function getDocFontSize(): Promise<number> {
//     return new Promise<number>((resolve) => {
//       docs_service.documents.get({
//         documentId: DOCUMENT_ID,
//         auth: jwtClient
//       }, (err:any, res:any) => {
//         if (err) return console.log('The API returned an error: ' + err);
  
//         let style = res.data.namedStyles.styles[0]
//         resolve(style.textStyle.fontSize.magnitude)
//       });
//     })
// }
  
function updateFontSize(originalTextLength: Number, newFontSize: Number){
    let requests = [{
      "updateTextStyle": {
          "range": {
              "startIndex": 1,
              "endIndex": originalTextLength,
          },
          "textStyle": {
            'fontSize': {
              'magnitude': newFontSize,
              'unit': 'PT'
            }
          },
          "fields": "fontSize",
      }
    }]
  
    docs_service.documents.batchUpdate({
      documentId: DOCUMENT_ID,
      auth: jwtClient,
      requestBody: {
        requests: requests
      }
    })
}
function addText(originalText: string, newText: string){
    let requests = [{
      'replaceAllText': {
          'containsText': {
              'text': originalText
          },
          'replaceText': newText,
        }
    }]
  
    docs_service.documents.batchUpdate({
      documentId: DOCUMENT_ID,
      auth: jwtClient,
      requestBody: {
        requests: requests
      }
    })
}
function removeLastWord(sentence: string) {
    let splits = sentence.split(" ")

    let new_splits = []

    for (let row in splits) {
        if (Number(row) < splits.length - 1) {
            new_splits.push(splits[row])
        }
    }

    return new_splits.join(" ")
}

// export const groceryList = functions.https.onRequest((request, response) => {
//     if (request.method == 'OPTIONS') {
//         response.status(200)
//         response.setHeader('Access-Control-Allow-Origin','*');
//         response.send({"res": "CORS RESPONSE"})
//         return;
//     }

//     try {
//         // functions.logger.info("Starting try", request.body);
        
//         // let re = new RegExp(`'`, 'g');
//         // let str_body = request.body.toString();
//         // str_body = str_body.replace(re, `"`)
//         // console.log(request.body)
//         // console.log(str_body)
//         // functions.logger.info("Middle try", str_body);
//         // str_body = str_body.substring(1, str_body.length - 1);
//         // functions.logger.info("Middle 2 try", str_body);
//         // let body = JSON.parse(str_body);
//         // functions.logger.info("Made it", body);

//         admin.firestore().collection('groceries').add({list: request.body, data: new Date()}).then(writeResult => {
//             // write is complete here
//         });
        
//     } catch (error) {
//         functions.logger.info("Error!!!!", {structuredData: error});
//         functions.logger.info("Body!!!!", {structuredData: request.body});
//     }
//     functions.logger.info("Hello logs!", {structuredData: request.body});
//     response.setHeader('Access-Control-Allow-Origin','*');
//     response.send(`Hello from Firebase! ${JSON.stringify(request.body)}`);
// });
