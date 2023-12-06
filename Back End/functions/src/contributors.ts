import {db} from "./firebaseConfig";
import {signIn, translateText} from "./misc";
import {deleteField, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import * as functions from "firebase-functions";

exports.getContributors = functions.https.onCall(async (data, context) => {
    const contributorsSnap = await getDoc(doc(db, "pages", "contributors"));
    if (contributorsSnap.exists()) {
        const contributorData = contributorsSnap.data();
        const returnData : Array<{}> = [];

        Object.keys(contributorData).forEach((key) => {
            returnData.push({
                [key]: {
                    "Image Location": contributorData[key]["Image Location"],
                    "Name": contributorData[key]["Name"],
                    "Link": contributorData[key]["Link"],
                    "Area Of Expertise": (data["languageChoice"] == "English") ? contributorData[key]["English"]["Area Of Expertise"] : contributorData[key]["Welsh"]["Area Of Expertise"],
                    "Flavour Text": (data["languageChoice"] == "English") ? contributorData[key]["English"]["Flavour Text"] : contributorData[key]["Welsh"]["Flavour Text"]
                }
            });
        });
        return returnData;
    }
    return ({"error": "contributors not found"});
});

async function addOrEditContributor(data: { [x: string]: string; }) {
    await signIn().then(async () => {
        await setDoc(
            doc(db, "pages", "contributors"),
            {
                [data["contributorId"]]: {
                    "Image Location": data["imageLocation"],
                    "Name": data["name"],
                    "Link": data["link"],
                    "English": {
                        "Area Of Expertise": data["areaOfExpertise"],
                        "Flavour Text": data["flavourText"],
                    },
                    "Welsh": {
                        "Area Of Expertise": await translateText(data["areaOfExpertise"]),
                        "Flavour Text": await translateText(data["flavourText"]),
                    }
                }
            },
            {merge:true}
        );
    });
}

// @ts-ignore
exports.addContributor = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to add a contributor"});

    await addOrEditContributor(data);
});

// @ts-ignore
exports.editContributor = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to edit a contributor"});

    await addOrEditContributor(data);
});

// @ts-ignore
exports.deleteContributor = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to delete a contributor"});

    await signIn().then(async () => {
        await updateDoc(
            doc(db, "pages", "contributors"),
            {
                [data["contributorId"]]: deleteField()
            }
        );
    })
});