import RoutesApp from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={30000}/>
      <RoutesApp/>
    </div>
  );
}

export default App;
