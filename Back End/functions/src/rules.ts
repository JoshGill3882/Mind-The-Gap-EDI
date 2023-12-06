import {db} from "./firebaseConfig";
import {signIn, translateText} from "./misc";
import {setDoc, getDoc, doc, arrayUnion, arrayRemove} from "firebase/firestore";
import * as functions from "firebase-functions";

exports.getRules = functions.https.onCall(async (data, context) => {
    const rulesSnap = await getDoc(doc(db, "pages", "rules"));
    if (rulesSnap.exists()) {
        const rulesData = rulesSnap.data();
        return rulesData[data["languageChoice"]];
    }
    return ({"error": "rules not found"});
});

exports.getRule = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to get a rule"});

    const rulesSnap = await getDoc(doc(db, "pages", "rules"));
    if (rulesSnap.exists()) {
        const rulesData = rulesSnap.data();
        return rulesData["English"][data["ruleType"]][data["index"]];
    }
    return ({"error": "rules not found"});
});

async function addRule(ruleType: string, ruleContent: string) {
    await signIn().then(async () => {
        await setDoc(
            doc(db, "pages", "rules"),
            {
                "English": {
                    [ruleType]: arrayUnion(ruleContent)
                },
                "Welsh": {
                    [ruleType]: arrayUnion(await translateText(ruleContent))
                }
            },
            {merge:true}
        );
    });
}

async function deleteRule(ruleType: string, ruleContent: string) {
    await signIn().then(async () => {
        await setDoc(
            doc(db, "pages", "rules"),
            {
                "English": {
                    [ruleType]: arrayRemove(ruleContent)
                },
                "Welsh": {
                    [ruleType]: arrayRemove(await translateText(ruleContent))
                }
            },
            {merge:true}
        );
    });
}

// @ts-ignore
exports.addGameMasterRule = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to add a rule"});

    await addRule("Game Master", data["ruleContent"]);
});

// @ts-ignore
exports.addPlayerRule = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to add a rule"});

    await addRule("Player", data["ruleContent"]);
});

// @ts-ignore
exports.editGameMasterRule = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to edit a rule"});

    await deleteRule("Game Master", data["oldRule"]);
    await addRule("Game Master", data["newRule"]);
});

// @ts-ignore
exports.editPlayerRule = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to edit a rule"});

    await deleteRule("Player", data["oldRule"]);
    await addRule("Player", data["newRule"]);
});

// @ts-ignore
exports.deleteGameMasterRule = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to edit a rule"});

    await deleteRule("Game Master", data["ruleContent"]);
});

// @ts-ignore
exports.deletePlayerRule = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to delete a rule"});

    await deleteRule("Player", data["ruleContent"]);
});