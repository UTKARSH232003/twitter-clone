import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton';

const Profile = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postText, setPostText] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/authen/users/profile/${query}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error('Error fetching profile:', data.error);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const userResponse = await fetch(`/authen/users/profile/${query}`);
        const userData = await userResponse.json();
        if (!userResponse.ok) {
          console.error('Error fetching username:', userData.error);
          return;
        }
        const username = userData.username;

        const response = await fetch(`/authen/posts/user/${username}`);
        const postData = await response.json();
        if (response.ok) {
          setPosts(postData);
        } else {
          console.error('Error fetching posts:', postData.error);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [query]);

  const navigateToHome = () => {
    navigate('/');
  };

  const handleCreatePost = async () => {
    const userId = user._id;
    try {
      const response = await fetch('/authen/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postedBy: userId,
          text: postText,
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setPosts((prevPosts) => [data, ...prevPosts]);
        setShowCreatePost(false);
        setPostText('');
      } else {
        console.error('Error creating post:', data.error);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/authen/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="w-1/4 p-4 bg-blue-900 text-white flex flex-col justify-between items-center">
        <div className="mt-8">
          <button className="btn btn-circle btn-outline border-white" onClick={navigateToHome}>
            <img
              src="https://via.placeholder.com/40"
              alt="Home"
              className="rounded-full"
            />
          </button>
        </div>

        <div className="mt-4">
          <button className="btn btn-info" onClick={() => setShowCreatePost(true)}>
            Create Post
          </button>
        </div>

        <div className="mb-8">
          <LogoutButton />
        </div>
      </div>

      {/* Main profile content */}
      <div className="w-3/4 p-8 bg-gray-100 overflow-y-scroll">
        {user ? (
          <div className="card shadow-lg bg-white p-6 mb-6">
            <div className="flex items-center mb-4">
              <img src={user.profilePic} alt="Profile" className="rounded-full w-24 h-24 mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">{user.fullname}</h1>
                <p className="text-gray-700">@{user.username}</p>
              </div>
            </div>
            <div className="flex space-x-8">
              <div>
                <span className="font-bold">{user.followers?.length || 0}</span> Followers
              </div>
              <div>
                <span className="font-bold">{user.following?.length || 0}</span> Following
              </div>
            </div>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="card shadow-lg bg-white p-4">
                <div className="flex items-center justify-between mb-4">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="rounded-full w-10 h-10 mr-4"
                  />
                  <h2 className="text-lg font-semibold text-blue-900">{user.username}</h2>
                  {post.postedBy === user._id && ( // Only show delete button if post is authored by logged-in user
                    <div>
                      <button className="text-red-500 mr-2" onClick={() => handleDeletePost(post._id)}>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-black mb-4">{post.text}</p>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.343l-6.828-6.828a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-600">{post.likes.length} Likes</p>
                </div>
              </div>
            ))
          ) : (
          <p>No posts to display.</p>
          )}
          </div>
          </div>
          {showCreatePost && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Create Post</h2>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    rows="4"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="What's on your mind?"
                  />
                  <div className="flex justify-end">
                    <button
                      className="btn btn-secondary mr-2"
                      onClick={() => setShowCreatePost(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleCreatePost}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
);
};
export default Profile;