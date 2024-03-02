import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useSpeechToText } from "../../hooks";
import { useState } from "react";

const colors = [
  "aqua",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chocolate",
  "coral",
  "red",
];

const IndexPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [bg, setBg] = useState<string>("");
  const { isListening, toggleListen } = useSpeechToText({
    continuous: true,
    onResult: (res) => {
      const { resultIndex, results } = res;
      const currentResult = results[resultIndex][0].transcript;

      colors.forEach((color) => {
        if (currentResult.includes(color)) {
          setBg(color);
        }
      });

      setInputValue((v) => v + " " + currentResult);
    },
  });
  return (
    <main className="flex flex-col pt-5 justify-center mx-auto max-w-[400px] px-2.5">
      <TextField
        fullWidth
        label="Enter your text:"
        value={inputValue}
        multiline
        rows={3}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => toggleListen()}
                color={isListening ? "primary" : "default"}
                className="relative"
              >
                {!isListening ? <KeyboardVoiceIcon /> : <MicOffIcon />}
                {isListening && (
                  <div className="w-full h-full bg-purple-600 absolute rounded-full animate-ping" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div style={{ background: bg }} className="w-full mt-10 h-28"></div>
    </main>
  );
};

export default IndexPage;
