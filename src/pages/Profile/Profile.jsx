import React, { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'Full-Stack Developer',
    bio: 'Passionate about building scalable web applications and mentoring junior developers. 8+ years of experience with React, Node.js, and cloud platforms.',
    location: 'San Francisco, CA',
    website: 'alexmorgan.dev',
  });

  const achievements = [
    { label: 'Skills Learned', value: '24' },
    { label: 'Projects Completed', value: '18' },
    { label: 'Mentor Sessions', value: '142' },
    { label: 'Certificates', value: '9' },
  ];

  const handleSave = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
    setIsEditing(false);
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Manage your profile, skills, and preferences."
        action={
          <Button
            variant={isEditing ? 'brand' : 'outline'}
            size="lg"
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        }
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {savedMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-green-800">
                Profile updated successfully!
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Card */}
            <Card className="lg:col-span-2 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="shrink-0">
                  <div className="w-24 h-24 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                    {profile.name[0]}
                  </div>
                  <Badge variant="brand" size="small" className="mt-3 block w-max">
                    ✅ Verified
                  </Badge>
                </div>
                <div className="flex-1 w-full">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                      <Input
                        label="Role / Title"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                      <p className="text-orange-600 font-medium">{profile.role}</p>
                      <p className="text-sm text-gray-500 mt-1">📧 {profile.email}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="Bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                      <Input
                        label="Website"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button variant="brand" onClick={handleSave}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-sm text-gray-600 mb-4">{profile.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>📍 {profile.location}</span>
                      <span>🔗 {profile.website}</span>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Achievements Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                  Achievements
                </h3>
                <div className="space-y-4">
                  {achievements.map((a) => (
                    <div key={a.label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{a.label}</span>
                      <span className="text-lg font-bold text-orange-600">{a.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'].map((skill) => (
                    <Badge key={skill} variant="skill" size="small">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;