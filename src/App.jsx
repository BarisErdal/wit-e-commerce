
import './App.css'

  import { ToastContainer} from 'react-toastify';
import PageContent from './layout/PageContent';
import Header from './layout/Header';
function App() {

  return (
    <>
      <Header/>
   <PageContent />
      <ToastContainer/>
    </>
  )
}

export default App
