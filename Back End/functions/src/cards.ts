import {db} from "./firebaseConfig";
import {signIn, translateText} from "./misc";
import {doc, getDoc, setDoc, deleteDoc, deleteField} from "firebase/firestore";
import * as functions from "firebase-functions";

exports.getCard = functions.https.onCall(async (data, context) => {
    const cardSnap = await getDoc(doc(db, "cards", data["cardId"]));
    if (cardSnap.exists()) {
        const languageChoice = data["languageChoice"];
        const cardData = cardSnap.data();
        const cardDataLang = cardData[languageChoice];
        return ({
            "prompt": cardDataLang["Prompt"],
            "details": cardDataLang["Details"]
        });
    }
    return ({"error": "card not found"});
});

exports.getAll = functions.https.onCall(async (data, context) => {
    const searchDataSnap = await getDoc(doc(db, "cards", "searchData"));
    if (searchDataSnap.exists()) {
        let returnData: Array<{}> = [];
        const searchData = searchDataSnap.data();
        const languageData = searchData[data["languageChoice"]];

        Object.keys(languageData).forEach((cardKey) => {
            returnData.push({[cardKey]: languageData[cardKey]});
        });
        return returnData;
    }
    return ({"error": "cards not found"})
});

async function addOrEditShared(data: any) {
    await setDoc(
        doc(db, "cards", data["cardId"]),
        {
            "English": {
                "Prompt": data["prompt"],
                "Details": data["details"]
            },
            "Welsh": {
                "Prompt": await translateText(data["prompt"]),
                "Details": await translateText(data["details"])
            }
        }
    );

    await setDoc(
        doc(db, "cards", "searchData"),
        {
            "English": {
                [data["cardId"]]: data["prompt"]
            },
            "Welsh": {
                [data["cardId"]]: await translateText(data["prompt"])
            }
        },
        {merge:true}
    );
}

// @ts-ignore
exports.addCard = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to add a card"});

    // @ts-ignore
    await signIn().then(async () => {
        const cardSnap = await getDoc(doc(db, "cards", data["cardId"]));
        if (cardSnap.exists()) return ({"error": "card with that ID already exists"});

        await addOrEditShared(data);
    });
});

// @ts-ignore
exports.editCard = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to edit a card"});

    // @ts-ignore
    await signIn().then(async () => {
        await addOrEditShared(data);
    });
});

// @ts-ignore
exports.deleteCard = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to delete a card"});

    await signIn().then(async () => {
        await deleteDoc(doc(db, "cards", data["cardId"]));
        await deleteDoc(doc(db, "comments", data["cardId"]));
        await setDoc(
            doc(db, "cards", "searchData"),
            {
                "English": {
                    [data["cardId"]]: deleteField()
                },
                "Welsh": {
                    [data["cardId"]]: deleteField()
                }
            },
            {merge:true}
        );
    });
});