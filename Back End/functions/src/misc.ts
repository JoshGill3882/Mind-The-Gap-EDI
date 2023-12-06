import {Translate} from "@google-cloud/translate/build/src/v2";
import {auth} from "./firebaseConfig"
import {signInAnonymously} from "firebase/auth";

const translate = new Translate();

export async function translateText(textToTranslate: string) {
    const translations = await translate.translate(textToTranslate, "cy");
    return translations["0"];
}

export async function signIn() { await signInAnonymously(auth) }