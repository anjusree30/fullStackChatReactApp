import React from 'react'
import {AddChannel} from '../assets'
const TeamChannelList = ({children,error=false,loading,type, isCreating,
    setIsCreating,
    setCreateType,
    setIsEditing,
    setToggleContainer
}) => {

    if(error){
        return type === 'team'?(
        <div className='team-channel-list'>
       <p className='team-channel-list__message'>
        Connection error,please wait a moment and try again.
       </p>

        </div>
        ):null
    }
    if(loading){
        return (
            <div className='team-channel-list'>
            <p className='team-channel-list__message.loading'>
            {type==='team'?'Channels':'Messages'}loading...
            </p>
     
             </div>
        )
    }


  return (
    <div className='team-channel-list'>
        <div className='team-channel-list__header'>

            <p className='team-channel-list_header_title'>
            {type==='team'?'Channels':'Direct Messages'}loading... 
            </p>
            <AddChannel
            type={type ==='team'?'team':'messaging'}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}/>
        </div>
        {children}

    </div>
  )
}

export default TeamChannelList