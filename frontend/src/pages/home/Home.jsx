import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../components/LogoutButton';
import { useUser } from '../../context/UserContext';

const Home = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/authen/posts/feed');
        const data = await response.json();
        if (response.ok) {
          // Fetch user details for each post
          const postsWithUserDetails = await Promise.all(
            data.map(async (post) => {
              const userResponse = await fetch(`/authen/users/profile/${post.postedBy}`);
              const userData = await userResponse.json();
              return { ...post, username: userData.username };
            })
          );
          setPosts(postsWithUserDetails);
        } else {
          console.error('Error fetching posts:', data.error);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const navigateToPeople = () => {
    navigate('/people');
  };

  const navigateToProfile = () => {
    if (user) {
      console.log(user._id);
      navigate(`/profile/${user._id}`);
      window.location.reload(); 
    } else {
      console.error('User not found');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <div className="w-1/4 p-4 bg-blue-900 text-white flex flex-col justify-between items-center">
        {/* Profile icon */}
        <div className="mt-8">
          <button className="btn btn-circle btn-outline border-white" onClick={navigateToProfile}>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="rounded-full"
            />
          </button>
        </div>

        <div className="mt-4">
          <button className="btn btn-info" onClick={navigateToPeople}>
            People
          </button>
        </div>

        <div className="mb-8">
          <LogoutButton />
        </div>
      </div>

      {/* Main feed */}
      <div className="w-3/4 p-8 bg-gray-100 overflow-y-scroll">
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="card shadow-lg bg-white">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="rounded-full w-10 h-10 mr-4"
                    />
                    <h2 className="card-title text-blue-900">{post.username}</h2>
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
              </div>
            ))
          ) : (
            <p>No posts to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
