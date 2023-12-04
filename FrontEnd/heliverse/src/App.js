import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserSearch from './Search';
import './css/UserList.css'
import './css/UserCard.css'
import UserFilter from './Filter';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.first_name}</h3>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Domain: {user.domain}</p>
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await axios.get('heliverse-user.vercel.app/api/users');
        setUsers(response.data);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-list">
      <div className="search_filter">
        <div className="UserSearch">
          <UserSearch />
        </div>
        <div className="UserFilter">
          <UserFilter />
        </div>
      </div>
      <h2>User List</h2>
      <div className="user-cards">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
//
export default UserList;

