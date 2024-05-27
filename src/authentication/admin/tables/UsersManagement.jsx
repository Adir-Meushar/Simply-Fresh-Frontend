import { useContext, useEffect, useState } from 'react'
import { GeneralContext, RoleType } from '../../../App';
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
function UsersManagement() {
    const [users, setUsers] = useState([]);
    const { snackbar } = useContext(GeneralContext)

    const fetchUsers = async () => {

        try {
            const response = await fetch('http://localhost:4000/users', {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token,
                },
            })

            const data = await response.json();

            setUsers(data)

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const deleteUser = async (userId) => {

        if (!window.confirm(`Are you sure you want to delete this user?`)) {
            return;

        } else {

            try {
                const response = await fetch(`http://localhost:4000/users/${userId}`, {
                    credentials: "include",
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                })

                const data = await response.json();

                setUsers(users.filter((user) => user._id !== userId));

                snackbar(`${data.deletedUser.firstName} was deleted successfully.`)

            } catch (error) {
                console.error("Error Deleteing user:", error);
            }
        }
    };

    const updateUserRole = async (userId) => {

        if (!window.confirm(`Are you sure you want to change this user role?`)) {
            return;

        } else {

            try {
                const response = await fetch(`http://localhost:4000/users/${userId}`, {
                    credentials: "include",
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                })

                const updatedUserData = await response.json();

                setUsers(users.map(user => user._id === userId ?
                    {
                        ...user, roleType: user.roleType === RoleType.user ?
                            RoleType.admin : RoleType.user
                    } : user));

                snackbar(`${updatedUserData.updated.firstName} is now 
                        ${updatedUserData.updated.roleType == 20 ? 'Admin User!' : 'Commen User!'} `)

            } catch (error) {
                console.error("Error Updating user:", error);
            }
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container-table">
            <div className='page-header'>
                <h1 >Users Management</h1>
                <p>Here you can find information about the users.</p>
                <p>Total Users:{users.length}</p>
            </div>
            <table className='users-table'>
                <thead>
                    <tr >
                        <th>X</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Edit User</th>
                        <th>Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.firstName + ' ' + user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.street + ' ' + user.houseNumber + ' ' + user.city}</td>
                            <td>{user.roleType == RoleType.user ? 'User' : 'Admin'}</td>
                            <td >< FaRegEdit className="fa-edit" onClick={() => updateUserRole(user._id)} /></td>
                            <td ><AiFillDelete className="ai-delete" onClick={() => deleteUser(user._id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersManagement
