import { useEffect, useState } from 'react';

import { getPosts } from '../api';
import { Home } from '../pages';
import {Loader,Navbar} from './';

function App() {
  const [posts,setPosts] = useState([]);
  const [Loading,setLoading] = useState(true);
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

  if(Loading){
    return <Loader />
  }

  return (
    <div className="App">
         <Navbar />
      <Home posts={posts}/>
    </div>
  )
}

export default App;
