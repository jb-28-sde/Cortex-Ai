// import  {cert,initializeApp} from "firebase-admin";

// import serviceAccount from "../serviceAccountKey.json" with {type:"json"};

// export const app = initializeApp({
//   credential: cert(serviceAccount)
// });
import { cert, initializeApp, getApps } from "firebase-admin";
import fs from "node:fs";

const serviceAccountPath = "/etc/secrets/serviceAccountKey.json";

const serviceAccount = JSON.parse(
fs.readFileSync(serviceAccountPath, "utf8")
);

export const app =
getApps().length === 0
? initializeApp({
credential: cert(serviceAccount),
})
: getApps()[0];


