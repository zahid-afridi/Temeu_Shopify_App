import App from "./App";
import { createRoot } from "react-dom/client";
import { initI18n } from "./utils/i18nUtils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { PolarisProvider } from "./components";
import { store } from "./redux/Store";


// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  const root = createRoot(document.getElementById("app"));
  root.render(
    <Provider store={store}>
  
    <BrowserRouter>
      <PolarisProvider>

  <App />
  </PolarisProvider>
    </BrowserRouter>
    </Provider>
    



);
});
