import { useEffect, useState } from 'react';

import { getPosts } from '../api';
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
  const [posts,setPosts] = useState([]);
  const [Loading,setLoading] = useState(true);

  const auth = useAuth();

  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      // console.log('response', response);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    

    fetchPosts();
  }, []);

  if(auth.loading){
    return <Loader />
  }

  return (
    <div className="App">        
      <Router>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home posts={posts}/>}>          
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
