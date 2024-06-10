import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

const People = () => {
  const [userList, setUserList] = useState([]);
  const loggedInUser = useUser(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/authen/users/people');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const usersFormatted = data
          .filter(user => user._id !== loggedInUser._id) // Excluded the logged-in user
          .map(user => ({
            ...user,
            isFollowing: user.followers.includes(loggedInUser._id) // Checking if the logged-in user is following the user
          }));
        setUserList(usersFormatted);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (loggedInUser) {
      fetchUsers();
    }
  }, [loggedInUser]);

  const handleFollowToggle = async (id) => {
    try {
      const response = await fetch(`/authen/users/follow/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Updating the follow status locally
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user._id === id ? { ...user, isFollowing: !user.isFollowing } : user
          )
        );
      } else {
        console.error('Failed to follow/unfollow the user');
      }
    } catch (error) {
      console.error('Error in follow/unfollow request:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">People</h1>
      <div className="space-y-6">
        {userList.map((user) => (
          <div key={user._id} className="card shadow-lg bg-white flex items-center p-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-blue-900">{user.username}</h2> {/* Displaying username instead of name */}
            </div>
            <button
              className={`btn ${user.isFollowing ? 'btn-outline btn-error' : 'btn-outline btn-info'}`}
              onClick={() => handleFollowToggle(user._id)}
            >
              {user.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
