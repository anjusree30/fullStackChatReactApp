import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import {InviteIcon} from '../assets'


const ListContainer = ({ children }) => {
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    );
};

const UserItem = ({ user,setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)
    const handleSelect=()=>{
        if(selected){
            setSelectedUsers((prevUsers)=>prevUsers.filter((prevUser)=>prevUser !==user.id))
        }else{
            setSelectedUsers(prevUsers=>[...prevUsers,user.id])
        }
        setSelected((prevSelected)=>!prevSelected)
    }
    return (
        <div className='user-item__wrapper' onClick={handleSelect}>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className='user-item__name'>{user.fullName || user.id}</p>
            </div>{selected?
            <InviteIcon />:
            <div className='user-item__invite-empty'/>}
        </div>
    );
};

const UserList = ({setSelectedUsers}) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(null);
    // const [error, seterror] = useState(second)


    useEffect(() => {
        let didCancel = false; // Track if the component is unmounted

        const getUsers = async () => {
            if (loading) return;
            setLoading(true);

            try {
                console.log('Client user ID:', client.userID); // Check client.userID

                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    {id : 1}, // Empty object for sort options
                    { limit: 8 }
                );

                console.log('Response users:', response.users); // Check response.users

                if (!didCancel) {
                    if (response.users.length) {
                        setUsers(response.users);
                        setListEmpty(false);
                    } else {
                        setListEmpty(true);
                    }
                }
            } catch (error) {
                console.error('Error querying users:', error); // Catch any errors
                if (!didCancel) {
                    setError(error);
                    setListEmpty(true);
                }
            }

            if (!didCancel) {
                setLoading(false);
            }
        };

        if (client) {
            getUsers();
        }

        return () => {
            didCancel = true; // Set didCancel to true if the component unmounts
        };
    }, [client]);

    if (listEmpty) {
        return (
            <ListContainer>
                <div className='user-list__message'>
                    No users found.
                </div>
            </ListContainer>
        );
    }

    if (error) {
        return (
            <ListContainer>
                <div className='user-list__message'>
                    Error fetching users: {error.message}
                </div>
            </ListContainer>
        );
    }

    return (
        <ListContainer>
            {loading ? (
                <div className='user-list__message'>
                    Loading users...
                </div>
            ) : (
                users.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            )}
        </ListContainer>
    );
};

export default UserList;
