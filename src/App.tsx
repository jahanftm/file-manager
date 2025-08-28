import Sidebar from "./components/sidebar/sidebar.tsx";
import FileContainer from "./components/file-container/file-container.tsx";

function App() {

  return (
    <div className={'container'}>
      <Sidebar/>
      <FileContainer/>
    </div>
  );
}

export default App
