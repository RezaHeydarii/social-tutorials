/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import { SpeechRecognition } from "../utils";

interface UseSpeechToTextParams {
  continuous?: boolean;
  lang?: string;
  interimResults?: boolean;
  maxAlternatives?: number;
  onResult?: (event: {
    resultIndex: number;
    results: Array<Array<{ confidence: number; transcript: string }>>;
  }) => void;
}

export const useSpeechToText = (props: UseSpeechToTextParams) => {
  const { continuous, lang, interimResults, maxAlternatives, onResult } = props;
  const [isListening, toggleListening] = useState<boolean>(false);
  const recognition = useRef(new SpeechRecognition());

  const onStartListen = () => {
    recognition.current.start();
    toggleListening(true);
  };

  const onAbortListen = useCallback(() => {
    recognition.current.abort();
    toggleListening(false);
  }, []);

  const toggleListen = () => {
    if (isListening) {
      onAbortListen();
    } else {
      onStartListen();
    }
  };

  useEffect(() => {
    recognition.current.continuous = continuous;
    recognition.current.lang = lang;
    recognition.current.interimResults = interimResults;
    recognition.current.maxAlternatives = maxAlternatives;
  }, [continuous, lang, interimResults, maxAlternatives]);

  useEffect(() => {
    recognition.current.onresult = (event: any) => {
      const resultIndex = event.resultIndex;
      onResult?.({
        resultIndex,
        results: event.results,
      });
    };
  }, [onResult]);

  useEffect(() => {
    recognition.current.onspeechend = () => {
      recognition.current.stop();
      toggleListening(false);
    };
  }, [onAbortListen]);

  return { onAbortListen, onStartListen, isListening, toggleListen };
};
