import React from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const posts = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: 'SC',
    time: '2 hours ago',
    title: 'Best practices for state management in React 19?',
    body: 'With the new compiler features, I\'m curious how everyone is structuring their state. Any recommended patterns for large apps?',
    replies: 24,
    likes: 56,
    tag: 'React',
  },
  {
    id: 2,
    author: 'Michael Rodriguez',
    avatar: 'MR',
    time: '5 hours ago',
    title: 'Sharing my sentiment analysis notebook',
    body: 'Built a BERT-based classifier that reaches 94% accuracy on product reviews. Happy to share the code and explain the pipeline.',
    replies: 18,
    likes: 89,
    tag: 'Python',
  },
  {
    id: 3,
    author: 'Priya Sharma',
    avatar: 'PS',
    time: '1 day ago',
    title: 'Design system resources for small teams',
    body: 'Curated a list of accessible component libraries and Figma plugins that work well for startups with limited design resources.',
    replies: 31,
    likes: 112,
    tag: 'Design',
  },
  {
    id: 4,
    author: 'David Kim',
    avatar: 'DK',
    time: '2 days ago',
    title: 'Kubernetes cost optimization tips',
    body: 'Some practical steps we took to cut our cluster spend by 40% — right-sizing, node pools, and autoscaling strategies.',
    replies: 42,
    likes: 134,
    tag: 'DevOps',
  },
];

const Community = () => (
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
        {/* New post box */}
        <Card className="p-5 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
              U
            </div>
            <input
              type="text"
              placeholder="Share something with the community..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="brand" size="sm">
              Post
            </Button>
          </div>
        </Card>

        <div className="space-y-5">
          {posts.map((post) => (
            <Card key={post.id} className="p-5 hover:border-orange-200 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{post.author}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{post.time}</span>
                    <Badge variant="skill" size="small" className="ml-auto">{post.tag}</Badge>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mt-1">{post.title}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{post.body}</p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <button className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 9V5a3 3 0 00-3-3L6 6a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V9z" />
                  </svg>
                  {post.likes}
                </button>
                <span className="flex items-center gap-1.5">
                  💬 {post.replies} replies
                </span>
                <button className="ml-auto text-orange-600 font-medium hover:underline">
                  Join discussion →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Community;