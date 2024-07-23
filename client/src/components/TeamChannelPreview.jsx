import React from 'react'
import {Avatar,Channel,useChatContext} from 'stream-chat-react';
const TeamChannelPreview = ({setActiveChannel,setIsCreating,setIsEditing,setToggleContainer,channel,type}) => {
  const {channel:activeChannel,client}=useChatContext();
 
  const ChannelPreview =()=>(
    <p className='channel-preview__item'>
      #{channel?.data.name||channel?.data.id}
    </p>
  );
  const DirectPreview =()=>{
    const members =Object.values(channel.state.members).filter(({user})=>user.id !==client.userID);
    return (
      <div className='channel-preview__item'>
        <Avatar
      image={members[0]?.user?.image}
      name={members[0]?.user?.fullName}
      size={24}
      />
      <p>{members[0]?.user?.fullName ||members[0]?.user?.id}</p>
      
      </div>
    )

    
  }

  


  return (
    <div className={
      channel?.id===activeChannel?.id ?'channel-preview_wrapper_selected':'channel-preview__wrapper'
    } onClick={()=>{
      setIsCreating(false)
      setIsEditing(false)
      setActiveChannel(channel)
      if(setToggleContainer){
        setToggleContainer((prevState)=>!prevState)
      }
      console.log(channel);
    }}
   
    
    >
       {type==='team'?<ChannelPreview/>:<DirectPreview/>}
    </div>
  )
}

export default TeamChannelPreview