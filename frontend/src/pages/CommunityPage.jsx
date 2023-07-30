import HomeButton from "../components/HomeButton";
import {motion} from 'framer-motion';
import SideBar from '../components/sideBar';
import { useGlobalContext } from '../context';
import PageHomeButton from "../components/PageHomeButton";
const CommunityPage = () => {
  
  const {isSidebarExpanded, setIsSidebarExpanded} = useGlobalContext();
  const{recFriends, setRecFriends} = useGlobalContext();
  const date = new Date();
  const handleAddFriend = (event) => {
    const newFriends = recFriends.map((item) => {
      if(item.id === parseInt(event.currentTarget.id)){
        item.friend = true;
      }
      return item;
    });
    setRecFriends(newFriends);
  }
  const handleDeleteFriend = (event) => {
    const newFriends = recFriends.map((item) => {
      if(item.id === parseInt(event.currentTarget.id)){
        item.friend = false;
      }
      return item;
    });
    setRecFriends(newFriends);
  }

    return (
      <motion.div
      initial="page-entering"
      animate="page-entered"
      exit="page-entering"
      variants={{
        'page-entering': { opacity: 0 },
        'page-entered': { opacity: 1 },
      }}
      transition={{ duration: 1 }}
    >
      <div className="container-commu" style={{ marginLeft: isSidebarExpanded ? '200px' : '90px'}}>
      <PageHomeButton/>
        <div className="Whole-box" style={{left: isSidebarExpanded ? '230px' : '120px'}}>
            {
              recFriends.map((friend) => {
                if(!friend.friend){
                  return(
                    <div className="friend-box">
                      <img className="friend-rec"src={friend.img}/>
                      <p className="name">{friend.name}</p>
                      <p className="mutual">{friend.mutalFriends} mutual friends</p>
                      <button id={friend.id} key={friend.id} className="Add-button" onClick={handleAddFriend}> Add Friend</button>
                    </div>
  
                  )
                }
              })
            }
        </div>
        <div className="right-sec">
        <div class="container-textbox">
            <div class="inbox-label">ALL INBOXES</div>
            {
              recFriends.map((friend) => {
                if(friend.friend){
                  return(
                    <div class="email">
                      <div class="sender-picture-container">
                        
                        <img class="sender-picture" src={friend.img}/>
                      </div>
                      <div class="email-content">
                        <div class="email-header">
                          <div class="sender-name">{friend.name}</div>
                          <div class="send-time">{date.getHours()>12?date.getHours()-12:date.getHours()}:{date.getMinutes()<10?`0`+date.getMinutes():date.getMinutes()} {date.getHours()<12?`AM`:`PM`}</div>
                        </div>
                        <div class="subject">
                          {friend.name} is now your friend!
                        </div>
                        <div class="message">
                          Message your new friends!
                          <button className="deleteFriend-button" id={friend.id} key={friend.id} onClick={handleDeleteFriend}>X</button>
                          <button className="Chat-button"> Chat</button>
                        </div>
                      </div>
                    </div>

                  )
                }
              })
            }
            <div class="email">
              <div class="sender-picture-container">
                <img class="sender-picture" src="./images/dog2.jpg"/>
              </div>
              <div class="email-content">
                <div class="email-header">
                  <div class="sender-name">Jack</div>
                  <div class="send-time">{date.getHours()>12?date.getHours()-12:date.getHours()}:{date.getMinutes()<10?`0`+date.getMinutes():date.getMinutes()} {date.getHours()<12?`AM`:`PM`}</div>
                </div>
                <div class="subject">
                  I got a gift for you
                </div>
                <div class="message">
                  Hey! I got a gift for you.
                  <button className="Chat-button"> Chat</button>
                </div>
              </div>
            </div>
            
          </div>
          </div>
        <SideBar/>
      </div>
      </motion.div>
    );
  };

  export default CommunityPage;