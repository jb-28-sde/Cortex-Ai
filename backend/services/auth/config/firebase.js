// import  {cert,initializeApp} from "firebase-admin";

// import serviceAccount from "../serviceAccountKey.json" with {type:"json"};

// export const app = initializeApp({
//   credential: cert(serviceAccount)
// });
import { cert, initializeApp, getApps } from "firebase-admin";

const serviceAccount = JSON.parse(
process.env.FIREBASE_SERVICE_ACCOUNT_KEY
);

export const app =
getApps().length === 0
? initializeApp({
credential: cert(serviceAccount),
})
: getApps()[0];

