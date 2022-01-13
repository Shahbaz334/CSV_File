import Post from "./CSV_Data";
import { BrowserRouter,Routes, Route,  } from "react-router-dom";
import ImportData from './ImportData'

function App() {
 
   
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Post />} />
        <Route path="import" element={<ImportData />} />
      </Routes>
        </BrowserRouter>
      {/* <header className="App-header">
       
        <div className="App">
          
   
    </div> */}
       
      {/* </header> */}
    </div>
  );
}


export default App;
