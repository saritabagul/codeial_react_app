
import { Home,Login} from '../pages';
import {Loader,Navbar} from './';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { useAuth } from '../hooks';

const About = () => {
  return <h1>About</h1>;
};

const UserInfo = () => {
  return <h1>UserInfo</h1>;
};

const Page404 = () =>{
  return <h1>Page 404 not found</h1>
};

function App() {
  const auth = useAuth();

  if(auth.loading){
    return <Loader />
  }

  return (
    <div className="App">        
      <Router>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home posts={[]}/>}>          
        </Route>

        <Route exact path="/login" element={<Login/>}>
         
        </Route>

        <Route exact path="/about" element={<About/>}>            
        </Route>

        <Route exact path="/userinfo" element={<UserInfo/>}>          
        </Route>

        <Route path="*" element={<Page404/>}></Route>
        </Routes>
      </Router>
    
    </div>
  )
}

export default App;
