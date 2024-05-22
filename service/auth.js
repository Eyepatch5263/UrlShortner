const SessionIdzToUserMap=new Map()

const setUser=(id,user)=>{
    SessionIdzToUserMap.set(id,user)
}

const getUser=(id)=>{
    return SessionIdzToUserMap.get(id)
}

module.exports={setUser,getUser}