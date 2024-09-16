import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(response => {
      setProfile(response.data);
    }).catch(error => {
      console.error('Error fetching profile:', error);
    });
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default ProfilePage;
