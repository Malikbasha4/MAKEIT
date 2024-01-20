import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: '',
    dob: '',
    mobile: '',
  });

  useEffect(() => {
    // Load user data from localStorage when the component mounts
    const storedProfileData = localStorage.getItem('profileData');
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const saveProfileData = () => {
    // Save user data to localStorage
    localStorage.setItem('profileData', JSON.stringify(profileData));
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="text"
            name="dob"
            value={profileData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={profileData.mobile}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={saveProfileData}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
