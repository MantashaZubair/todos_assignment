
import './App.css';
import {Route,Routes} from "react-router-dom"
import ToDoForm from './component/ToDoForm';
function App() {
  return (
    <>
    <Routes>
      <Route path ="/" element = {<ToDoForm />} />
    </Routes>
    </>

  );
}

export default App;
