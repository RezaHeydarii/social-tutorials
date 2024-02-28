/* eslint-disable @typescript-eslint/no-explicit-any */
const windowObject: any = window;

export const SpeechRecognition =
  windowObject.SpeechRecognition || windowObject.webkitSpeechRecognition;
export const SpeechGrammarList =
  windowObject.SpeechGrammarList || windowObject.webkitSpeechGrammarList;
export const SpeechRecognitionEvent =
  windowObject.SpeechRecognitionEvent ||
  windowObject.webkitSpeechRecognitionEvent;
