import { useState, useEffect } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/useAuth';
import { get, post } from '../../utils/api';

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
};

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState('');
  const [posting, setPosting] = useState(false);
  const [liking, setLiking] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await get('/posts?sort=newest');
        setPosts(Array.isArray(data.posts) ? data.posts : (Array.isArray(data) ? data : []));
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!newContent.trim() || !user) return;
    setPosting(true);
    try {
      const created = await post('/posts', { content: newContent });
      setPosts((prev) => [created, ...prev]);
      setNewContent('');
    } catch {
      return;
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user || liking[postId]) return;
    setLiking((prev) => ({ ...prev, [postId]: true }));
    try {
      const updated = await post(`/posts/${postId}/like`, {});
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, likesCount: updated.likesCount ?? updated.likes?.length ?? p.likesCount } : p
        )
      );
    } catch {
      return;
    } finally {
      setLiking((prev) => { const n = { ...prev }; delete n[postId]; return n; });
    }
  };

  const initials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : parts[0][0].toUpperCase();
  };

  return (
    <>
      <PageHeader
        title="Community"
        subtitle="Join conversations, share knowledge, and learn alongside peers and mentors."
        action={
          <Button variant="brand" size="lg" leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }>
            Start a Discussion
          </Button>
        }
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="p-5 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                {user ? initials(user.fullName) : 'U'}
              </div>
              <input
                type="text"
                placeholder={user ? 'Share something with the community...' : 'Log in to post…'}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                disabled={!user}
              />
            </div>
            <div className="flex justify-end">
              <Button variant="brand" size="sm" onClick={handlePost} disabled={!user || posting || !newContent.trim()}>
                {posting ? 'Posting…' : 'Post'}
              </Button>
            </div>
          </Card>

          {loading ? (
            <div className="text-center py-16 text-gray-400 text-sm">Loading posts…</div>
          ) : (
            <div className="space-y-5">
              {posts.map((p) => {
                const authorName = p.author?.fullName ?? 'Unknown';
                const tags = Array.isArray(p.tags) ? p.tags : [];
                return (
                  <Card key={p._id} className="p-5 hover:border-orange-200 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {initials(authorName)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{authorName}</span>
                          <span className="text-xs text-gray-400">·</span>
                          <span className="text-xs text-gray-500">{timeAgo(p.createdAt)}</span>
                          {tags[0] && <Badge variant="skill" size="small" className="ml-auto">{tags[0]}</Badge>}
                        </div>
                        <p className="text-base font-semibold text-gray-900 mt-1">{p.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <button
                        className="flex items-center gap-1.5 hover:text-orange-600 transition-colors"
                        onClick={() => handleLike(p._id)}
                        disabled={!user || !!liking[p._id]}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 9V5a3 3 0 00-3-3L6 6a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V9z" />
                        </svg>
                        {p.likesCount ?? p.likes?.length ?? 0}
                      </button>
                    </div>
                  </Card>
                );
              })}
              {posts.length === 0 && (
                <div className="text-center py-16 text-gray-400 text-sm">No posts yet. Be the first to share!</div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Community;
