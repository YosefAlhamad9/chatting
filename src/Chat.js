import { Avatar , IconButton} from '@material-ui/core';
import { useEffect , useState } from 'react';
import './chat.css';
import { SearchOutlined , AttachFile , MoreVert , InsertEmoticon , Mic} from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

const Chat = () => {

    const [seed,setSeed] = useState('');
    const [input,setInput] = useState('');
    const {roomid} = useParams();
    const [RoomName,setRoomName] = useState('');
    const [messages,setmessages] = useState([]);
    const [{user},dispatch] = useStateValue();


    useEffect(() => {
        if (roomid) {
        db
            .collection("rooms")
            .doc(roomid)
            .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

        db
            .collection('rooms')
            .doc(roomid)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot(snapshot => 
            setmessages(snapshot.docs.map((doc) => doc.data())))
        }
      }, [roomid]);

    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
    }, [roomid]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomid).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }
    return (
        <div className="chat">
           <div className="chat--header">
              <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
              <div className="chat--headerinfo">
                  <h3>{RoomName}</h3>
                  <p>Last seen {" "} {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}</p>
              </div>
              <div className="chat--headerRight">
                  <IconButton>
                      <SearchOutlined/>
                  </IconButton>
                  <IconButton>
                      <AttachFile/>
                  </IconButton>
                  <IconButton>
                      <MoreVert/>
                  </IconButton>
              </div>
           </div>
           <div className="chat--body">
           {messages.map(message => (
                    <p className={`chat--message ${ message.name === user.displayName && "chat--receiver"}`}>
                        <span className="chat--name">{message.name}</span>
                        {message.message}
                        <span className="chat--timestemp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}   
           </div>
           <div className="chat--footer">
             <InsertEmoticon/>
              <form >
                  <input 
                  type="text" 
                  placeholder="Type a message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  />
                  <button
                  type="submit"
                  onClick={sendMessage}
                  >Send a message</button>
              </form>
             <Mic/>
           </div>
        </div>
    );
}
 
export default Chat;