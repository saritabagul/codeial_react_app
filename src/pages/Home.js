// import { useEffect, useState } from 'react';
// import { getPosts } from '../api';
import styles from '../styles/home.module.css';
import propTypes from 'prop-types';
import { Comment,FriendsList ,CreatePost,Loader} from '../components';
import { Link } from 'react-router-dom'
import { useAuth,usePost } from '../hooks';

const Home = () => {    
  const auth = useAuth();
  const posts = usePost();
  
  if(posts.loading){
    return <Loader />
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                alt="user-pic"
              />
              <div>
                <Link to={`user/${post.user._id}`} className={styles.postAuthor}>{post.user.name}</Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2589/2589197.png"
                  alt="likes-icon"
                />
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>
            <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <Comment comment={comment} />
                ))}
              </div>
            
          </div>
        </div>
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
