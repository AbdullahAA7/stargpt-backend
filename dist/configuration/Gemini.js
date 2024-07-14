// import { GoogleGenerativeAI } from "@google/generative-ai";
// export const genAI = new GoogleGenerativeAI(
//   "AIzaSyAVmkHOiqyyx4B6z0kbRsQ-K0N-hX7XLwY"
// );
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } from "@google/generative-ai";
const apiKey = "AIzaSyAVmkHOiqyyx4B6z0kbRsQ-K0N-hX7XLwY";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
});
const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 0,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];
async function run() {
    const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
}
run();
