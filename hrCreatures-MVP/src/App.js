import "./App.css";
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs";
import Codionix from "./components/Pages/Codionix";

function App() {
  return (
    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <Codionix />
    </StyleProvider>
  );
}

export default App;
