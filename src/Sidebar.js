import './sidebar.css';
import SidebarChat from './SidebarChat';
import { Avatar , IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { SearchOutlined } from '@material-ui/icons';
import db from './firebase';
import { useState , useEffect} from 'react';
import { useStateValue } from './StateProvider';
const Sidebar = () => {

    const [rooms,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();


    useEffect(() => {
        const unSubscribe = db.collection('rooms').onSnapshot(snapshot => {
         setRooms(snapshot.docs.map(doc => ({
             id: doc.id,
             data: doc.data(),
            })
         ))
        })

        return () => {
            unSubscribe();
        }
    },[]);
    return (
        <div className="sidebar"> 

        <div className="sidebar--header">
           <Avatar src={user?.photoURL}/>
           <div className="sidebar--headerRight">
            <IconButton>
                <DonutLargeIcon/>
            </IconButton>
            <IconButton>
                <ChatIcon/>
            </IconButton>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
            
           </div>

        </div>
        <div className="sidebar--search">
            <div className="sidebar--searchContainer">
                <SearchOutlined/>
                <input placeholder="Search or start a new chat" type="text"/>
            </div>
        </div>
        <div className="sidebar--chats">

            <SidebarChat addnewchat/>
            
           {rooms.map(room => (
                   <SidebarChat 
                   key={room.id} 
                   id={room.id}
                   name={room.data.name} />
               ))}

        </div>
            
        </div>
    )
}

export default Sidebar
