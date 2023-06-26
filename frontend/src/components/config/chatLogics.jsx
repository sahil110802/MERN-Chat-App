export const getSender=(logged,users)=>{
    return users[0]._id===logged._id?users[1].name:users[0].name
}

export const getSenderFull=(logged,users)=>{
    return users[0]._id===logged._id?users[1]:users[0]
}

export const isSameSender=(message,m,i,userId)=>{
    return(
        i<message.length-1 && 
        (message[i+1].sender._id!==m.sender._id || message[i+1].sender._id===undefined) &&
        message[i].sender._id!==userId
    );
}

export const isLastMessage=(message,i,userId)=>{
    return(
        i<message.length-1 && 
        message[message.length-1].sender._id!==userId &&
        message[message.length-1].sender._id
    );
}