// import  {cert,initializeApp} from "firebase-admin";

// import serviceAccount from "../serviceAccountKey.json" with {type:"json"};

// export const app = initializeApp({
//   credential: cert(serviceAccount)
// });
import { cert, initializeApp, getApps } from "firebase-admin";




const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
console.log(
  "Firebase service account configured:",
  Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
);

if (!key) {
throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing");
}

const serviceAccount = JSON.parse(key);

export const app =
getApps().length === 0
? initializeApp({
credential: cert(serviceAccount),
})
: getApps()[0];

