import { Avatar } from "@nextui-org/react"


const UserListItem = ({user, handlefuction}) => {
  return (
    <div className="flex flex-row gap-2 mx-6 bg-gray-300 rounded-lg py-2 pr-4 hover:bg-blue-400 " onClick={handlefuction}>
        <Avatar className="ml-2 my-auto bg-white" src={user.pic} />
        <div className="flex flex-col gap-1 content-center"> 
            <p>{user.username}</p>
            <p>{user.email}</p>
        </div>
    </div>
  )
}
export default UserListItem