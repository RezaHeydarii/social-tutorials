import { Suspense } from "react";
import { IndexPage } from "./pages";

function App() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <IndexPage />
    </Suspense>
  );
}

export default App;
