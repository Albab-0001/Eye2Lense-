import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    location: '',
    photoURL: ''
  });
  
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Update profile state whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      console.log('Current user data:', currentUser);
      setProfile({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        location: currentUser.location || '',
        photoURL: currentUser.photoURL || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }
    
    try {
      setUploadingPhoto(true);
      setError('');
      
      const storage = getStorage();
      const fileRef = ref(storage, `profile-photos/${currentUser.uid}/${file.name}`);
      
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      
      // Update profile state immediately
      setProfile(prev => ({ ...prev, photoURL }));
      
      // Update in Firebase
      const result = await updateUserProfile({ photoURL });
      
      if (result.success) {
        setSuccess('Profile photo updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Photo upload error:', err);
      setError('Failed to upload photo: ' + (err.message || 'Unknown error'));
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const updates = {
        displayName: profile.displayName,
        phoneNumber: profile.phoneNumber,
        location: profile.location
      };
      
      console.log('Updating profile with:', updates);
      const result = await updateUserProfile(updates);
      
      if (result.success) {
        setSuccess('Profile updated successfully');
        setTimeout(() => setSuccess(''), 3000);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError('Failed to update profile: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      setError('Failed to log out');
    }
  };

  // Debug function to log current state
  const debugProfile = () => {
    console.log('Current profile state:', profile);
    console.log('Current user data:', currentUser);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button onClick={handleLogout} className="logout-button">
          Sign Out
        </button>
      </div>
      
      {error && <div className="profile-alert error">{error}</div>}
      {success && <div className="profile-alert success">{success}</div>}
      
      <div className="profile-content">
        <div className="profile-photo-section">
          <div className="profile-photo-container">
            {profile.photoURL ? (
              <img 
                src={profile.photoURL} 
                alt="Profile" 
                className="profile-photo" 
                onError={(e) => {
                  console.error('Image failed to load');
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150?text=Profile';
                }}
              />
            ) : (
              <div className="profile-photo-placeholder">
                <FaUser />
              </div>
            )}
            <label htmlFor="photo-upload" className="photo-upload-label">
              <FaCamera />
              <input 
                type="file" 
                id="photo-upload" 
                onChange={handlePhotoUpload}
                accept="image/*"
                disabled={uploadingPhoto}
              />
            </label>
          </div>
          {uploadingPhoto && <p className="uploading-text">Uploading...</p>}
        </div>
        
        <div className="profile-details">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="displayName">Full Name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  disabled
                  className="disabled-input"
                />
                <small>Email cannot be changed</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile.phoneNumber || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profile.location || ''}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
              
              <div className="profile-actions">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-button"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-item">
                <FaUser className="info-icon" />
                <div>
                  <h3>Full Name</h3>
                  <p>{profile.displayName || 'Not set'}</p>
                </div>
              </div>
              
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h3>Email</h3>
                  <p>{profile.email}</p>
                </div>
              </div>
              
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <h3>Phone Number</h3>
                  <p>{profile.phoneNumber || 'Not set'}</p>
                </div>
              </div>
              
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h3>Location</h3>
                  <p>{profile.location || 'Not set'}</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsEditing(true)} 
                className="edit-profile-button"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 