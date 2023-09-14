import { useEffect, useState } from "react";
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useToasts } from "react-toast-notifications";
import { useParams,Navigate } from "react-router-dom";
import { fetchUserProfile } from "../api";
import { Loader } from "../components";

const UserProfile = () => {
  const [user,setUser] = useState({});
  const [loading,setLoading] = useState(true);
  const {userId} = useParams();

  console.log('userId',userId);
  const {addToast} = useToasts();

  const  auth = useAuth();

  // console.log("Auth", auth);

  useEffect(()=>{
    const getUser = async()=>{
      const response = await fetchUserProfile(userId);
      console.log(response);
      if(response.success){
        setUser(response.data.user);
      }else{
        addToast(response.message,{
          apperance:'error'
        });
        return <Navigate to="/" />;
      }     
      setLoading(false);
    };

    getUser();   
  },[userId,addToast]);

  if(loading){
    return <Loader/>;
  }

  
  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;

    // console.log(friends);
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  }


  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>       
          <div className={styles.fieldValue}>{user?.name}</div>       
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`}>Remove friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
