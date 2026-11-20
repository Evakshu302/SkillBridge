import { useState, useEffect } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/useAuth';
import { get, put } from '../../utils/api';

const Profile = () => {
  const { user: authUser, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    location: '',
    skills: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await get('/user/profile');
        setProfile({
          name: data.fullName ?? '',
          email: data.email ?? '',
          role: data.title ?? '',
          bio: data.bio ?? '',
          location: data.location ?? '',
          skills: Array.isArray(data.skills) ? data.skills.join(', ') : '',
        });
      } catch {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = {
        fullName: profile.name,
        title: profile.role,
        bio: profile.bio,
        location: profile.location,
        skills: profile.skills.split(',').map((s) => s.trim()).filter(Boolean),
      };
      const updated = await put('/user/profile', payload);
      updateUser({ ...authUser, ...updated });
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
      setIsEditing(false);
    } catch {
      setError('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const skillList = profile.skills
    ? profile.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500 text-sm">Loading profile…</p>
      </div>
    );
  }

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
            disabled={saving}
          >
            {isEditing ? (saving ? 'Saving…' : 'Save Changes') : 'Edit Profile'}
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
              <span className="text-sm font-medium text-green-800">Profile updated successfully!</span>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="shrink-0">
                  <div className="w-24 h-24 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                    {profile.name?.[0] ?? 'U'}
                  </div>
                  <Badge variant="brand" size="small" className="mt-3 block w-max">✅ Verified</Badge>
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
                        disabled
                      />
                      <Input
                        label="Role / Title"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900">{profile.name || 'No name set'}</h2>
                      <p className="text-orange-600 font-medium">{profile.role || 'No title set'}</p>
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
                        label="Skills (comma separated)"
                        value={profile.skills}
                        onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                        placeholder="React, Node.js, TypeScript"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button variant="brand" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving…' : 'Save Changes'}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-sm text-gray-600 mb-4">{profile.bio || 'No bio added yet.'}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      {profile.location && <span>📍 {profile.location}</span>}
                    </div>
                  </>
                )}
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.length > 0 ? (
                    skillList.map((skill) => (
                      <Badge key={skill} variant="skill" size="small">{skill}</Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No skills added yet.</p>
                  )}
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
