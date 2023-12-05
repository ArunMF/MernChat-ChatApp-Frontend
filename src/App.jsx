import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import MainPage from './Components/MainPage/MainPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/Signup' element={<SignUp/>}/>
        <Route path='/MainPage/:id' element={<MainPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
