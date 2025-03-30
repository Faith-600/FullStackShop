import React from 'react'



const About = () => {
  const openGitHub = () => {
    window.open('https://github.com/Faith-600', '_blank');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <img
        src="https://i0.wp.com/picjumbo.com/wp-content/uploads/cheers-free-photo.jpg?w=2210&quality=70"
        alt="Our Story"
        className="w-full h-80 object-cover rounded-lg shadow-lg"
      />

      <h1 className="text-2xl font-bold mt-6">Our Story</h1>
      <p className="text-lg leading-7 p-4 text-center max-w-3xl">
        Hi 👋🏽👋🏻👋🏿, I'm Faith Ezekiel, the creator of CircleKonnect.
        CircleKonnect is my first major project since transitioning into tech. What started as a simple login and signup project soon grew into something bigger.
        I've always been curious about my friends' wider circles, wanting to connect with their friends and get to know them better. That curiosity inspired me to build CircleConnect, 
        a platform designed to bridge connections, expand friendships, and help people discover more about their extended networks.
        Beyond just social connections, CircleConnect is also about supporting each other. If a friend has a business, I can patronize it, and they can do the same for others. 
        My goal is to create a thriving community where we can connect, grow, and succeed together.
      </p>
      
      <button
        onClick={openGitHub}
        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-700 transition-all"
      >
        <i className="fab fa-github text-2xl"></i>
        <span>Visit My GitHub Profile</span>
      </button>
    </div>
  );
};

export default About;


