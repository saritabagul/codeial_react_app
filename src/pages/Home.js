// import { useEffect, useState } from 'react';
// import { getPosts } from '../api';
import styles from '../styles/home.module.css';
import propTypes from 'prop-types';
import { Post,Comment,FriendsList ,CreatePost,Loader} from '../components';
import { Link } from 'react-router-dom'
import { useAuth,usePosts } from '../hooks';

const Home = () => {    
  const auth = useAuth();
  const posts = usePosts();
  
  if(posts.loading){
    return <Loader />
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        )
        )}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};
Home.propTypes = {
  posts:propTypes.array.isRequired,
}

export default Home;
