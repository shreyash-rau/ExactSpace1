
import React from 'react';

const UserList = ({ users, activeUser, setActiveUser }) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className={`user ${user === activeUser ? 'active-user' : ''}`} onClick={() => setActiveUser(user)}>
          {user}
        </div>
      ))}
    </div>
  );
};

export default UserList;
