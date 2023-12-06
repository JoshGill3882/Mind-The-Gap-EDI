import {db} from "./firebaseConfig";
import {doc, setDoc, arrayUnion, getDocs, collection, arrayRemove} from "firebase/firestore";
import * as functions from "firebase-functions";
import {signIn} from "./misc";

// @ts-ignore
exports.getComments = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to access comments"});

    const commentsData: Array<{[x: string]: any}> = [];

    await signIn().then(async () => {
        const commentsSnap = await getDocs(collection(db, "comments"));
        commentsSnap.forEach(doc => {
            let cardCommentData = doc.data()
            commentsData.push({
                [doc.id]: cardCommentData["Comments"]
            });
        });
    });
    return commentsData;
});

exports.addComment = functions.https.onCall(async (data, context) => {
    await setDoc(
        doc(db, "comments", data["cardId"]),
        { "Comments": arrayUnion(data["commentData"]) },
        { merge: true }
    );
});

// @ts-ignore
exports.deleteComment = functions.https.onCall(async (data, context) => {
    if (!context.auth)  return ({"error": "you have to be logged in to delete a comment"});

    await signIn().then(async () => {
        await setDoc(
            doc(db, "comments", data["cardId"]),
            { "Comments": arrayRemove(data["commentData"]) },
            { merge: true }
        );
    });
});