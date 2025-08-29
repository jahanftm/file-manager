import FileContainer from "./components/file-container/file-container.tsx";
import { FileManagerProvider } from "./context/file-manager-context.tsx";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster position="bottom-center" />
      <FileManagerProvider>
        <header>File Manager</header>
        <div className="container">
          <FileContainer />
        </div>
      </FileManagerProvider>
    </>
  );
}

export default App
