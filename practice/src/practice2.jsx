import './Practice.css'
import axios from 'axios'
import { useState, useEffect } from 'react'



const Practice2 = () => {
    const [data, setData] = useState([])
    const [records, setRecords] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(20)
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', phone: '' })
    const [editUser, setEditUser] = useState(null)

    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(res => { 
                setData(res.data.users)
                setRecords(res.data.users)
            })
            .catch(err => console.log(err))
    }, [])

    const Filter = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredRecords = data.filter(user => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            const { id, email, phone } = user;
            return (
                fullName.includes(searchValue) ||
                id.toString().includes(searchValue) ||
                email.toLowerCase().includes(searchValue) ||
                phone.includes(searchValue)
            );
        });
        setRecords(filteredRecords);
        setCurrentPage(1);
    }

    const addUser = () => {
        const newUserData = {
            ...newUser,
            id: data.length + 1
        }
        const updatedData = [...data, newUserData]
        setData(updatedData)
        setRecords(updatedData)
        setNewUser({ firstName: '', lastName: '', email: '', phone: '' })
    }

    const deleteUser = (id) => {
        const updatedData = data.filter(user => user.id !== id)
        setData(updatedData)
        setRecords(updatedData)
    }

    const startEditUser = (user) => {
        setEditUser(user)
    }

    const updateUser = () => {
        const updatedData = data.map(user => user.id === editUser.id ? editUser : user)
        setData(updatedData)
        setRecords(updatedData)
        setEditUser(null)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (editUser) {
            setEditUser(prev => ({ ...prev, [name]: value }))
        } else {

            setNewUser(prev => ({ ...prev, [name]: value }))
        }
    }

    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(records.length / recordsPerPage); i++) {
        pageNumbers.push(i)
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
      <div className="p-5 bg-light">
        <div className="input-bar">
          <input
            type="text"
            className="form-control"
            onChange={Filter}
            placeholder="Search by name"
          />

          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newUser.phone}
              onChange={handleChange}
            />
            <button onClick={addUser}>Add</button>
          </div>

          {editUser && (
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={editUser.firstName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={editUser.lastName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="email"
                placeholder="Email"
                value={editUser.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={editUser.phone}
                onChange={handleChange}
              />

              <button onClick={updateUser}>Update</button>
            </div>
          )}

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => startEditUser(user)}>Edit</button>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <button
                    onClick={() => paginate(number)}
                    className="page-link"
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
}

export default Practice2
