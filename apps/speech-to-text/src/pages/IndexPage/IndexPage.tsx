import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useSpeechToText } from "../../hooks";
import { useState } from "react";

const IndexPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { isListening, toggleListen } = useSpeechToText({
    continuous: true,
    onResult: (res) => {
      const { resultIndex, results } = res;
      setInputValue((v) => v + " " + results[resultIndex][0].transcript);
    },
  });
  return (
    <main className="flex pt-5 justify-center mx-auto max-w-[400px] px-2.5">
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
              >
                {!isListening ? <KeyboardVoiceIcon /> : <MicOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </main>
  );
};

export default IndexPage;
