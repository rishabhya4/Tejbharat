import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountManagement = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: settings.account?.name || 'John Doe',
    email: settings.account?.email || 'john.doe@example.com',
    bio: settings.account?.bio || 'News enthusiast and technology professional'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Basic news access', 'Limited bookmarks', 'Standard support'],
      current: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      features: ['Unlimited access', 'Unlimited bookmarks', 'Ad-free experience', 'Priority support', 'Exclusive content'],
      current: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: 'month',
      features: ['Everything in Premium', 'Advanced analytics', 'Custom categories', 'API access', 'White-label options'],
      current: false
    }
  ];

  const handleProfileSave = () => {
    onSettingsChange('account', {
      ...settings.account,
      ...profileData
    });
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // Simulate password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
    alert('Password changed successfully!');
  };

  const handleSubscriptionChange = (planId) => {
    if (planId === 'free') {
      if (window.confirm('Are you sure you want to downgrade to the free plan? You will lose access to premium features.')) {
        alert('Subscription cancelled. You will retain premium features until the end of your billing period.');
      }
    } else {
      alert(`Redirecting to payment page for ${planId} plan...`);
    }
  };

  const handleAccountDeactivation = () => {
    if (window.confirm('Are you sure you want to deactivate your account? This action can be reversed within 30 days.')) {
      alert('Account deactivation request submitted. You will receive a confirmation email.');
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-surface transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} className="text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-primary">Account Management</h3>
            <p className="text-sm text-text-secondary">Manage your profile and subscription</p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-text-secondary transform transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-8">
          {/* Profile Information */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-primary">Profile Information</h4>
              <Button
                variant="outline"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                iconName={isEditingProfile ? "X" : "Edit"}
              >
                {isEditingProfile ? 'Cancel' : 'Edit'}
              </Button>
            </div>

            {isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
                  <Input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button variant="primary" onClick={handleProfileSave}>
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} color="white" />
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-primary">{profileData.name}</h5>
                    <p className="text-sm text-text-secondary">{profileData.email}</p>
                    <p className="text-sm text-text-secondary mt-1">{profileData.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Password Change */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-primary">Password & Security</h4>
              <Button
                variant="outline"
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                iconName={isChangingPassword ? "X" : "Lock"}
              >
                {isChangingPassword ? 'Cancel' : 'Change Password'}
              </Button>
            </div>

            {isChangingPassword ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Current Password</label>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">New Password</label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Confirm New Password</label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button variant="primary" onClick={handlePasswordChange}>
                    Update Password
                  </Button>
                  <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={18} className="text-success" />
                  <div>
                    <p className="text-sm text-primary font-medium">Password last changed</p>
                    <p className="text-xs text-text-secondary">March 15, 2024</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Subscription Management */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Subscription Plan</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    plan.current
                      ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-lg font-semibold text-primary">{plan.name}</h5>
                    {plan.current && (
                      <span className="status-indicator status-online text-xs">
                        <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
                        Current
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">{plan.price}</span>
                    <span className="text-sm text-text-secondary">/{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <Icon name="Check" size={14} className="text-success" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <Button
                      variant={plan.id === 'premium' ? 'primary' : 'outline'}
                      fullWidth
                      onClick={() => handleSubscriptionChange(plan.id)}
                    >
                      {plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Account Actions */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Account Actions</h4>
            <div className="space-y-4">
              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-primary">Two-Factor Authentication</h5>
                    <p className="text-xs text-text-secondary">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" iconName="Shield">
                    Enable 2FA
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-primary">Login Sessions</h5>
                    <p className="text-xs text-text-secondary">Manage your active login sessions</p>
                  </div>
                  <Button variant="outline" iconName="Monitor">
                    View Sessions
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-warning">Deactivate Account</h5>
                    <p className="text-xs text-text-secondary">Temporarily deactivate your account</p>
                  </div>
                  <Button variant="warning" onClick={handleAccountDeactivation} iconName="UserX">
                    Deactivate
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="bg-surface rounded-lg p-4 border border-border">
            <h4 className="text-sm font-semibold text-primary mb-4">Account Statistics</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1,247</div>
                <div className="text-xs text-text-secondary">Articles Read</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">89</div>
                <div className="text-xs text-text-secondary">Bookmarks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">156</div>
                <div className="text-xs text-text-secondary">Shares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">23</div>
                <div className="text-xs text-text-secondary">Days Active</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;