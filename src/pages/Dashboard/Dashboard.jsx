import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

// ─── Mock data ────────────────────────────────────────────────────────────────

const user = {
  name: 'Alex Morgan',
  role: 'Full-Stack Developer',
  streak: 7,
  lastActive: '2h ago',
  joinedDaysAgo: 34,
};

const stats = [
  { label: 'Skills Active', value: 3, sub: '2 in progress' },
  { label: 'Jobs Applied', value: 5, sub: 'this month' },
  { label: 'Hours Learned', value: 42, sub: 'total this week' },
  { label: 'Certificates', value: 9, sub: 'earned so far' },
];

const learningPaths = [
  {
    title: 'Full-Stack Web Development',
    progress: 62,
    nextLesson: 'Building REST APIs with Node.js',
    totalHours: 120,
    completedHours: 74,
    color: 'bg-orange-500',
  },
  {
    title: 'UI/UX Design Mastery',
    progress: 38,
    nextLesson: 'Component systems in Figma',
    totalHours: 90,
    completedHours: 34,
    color: 'bg-purple-500',
  },
  {
    title: 'Cloud & DevOps Engineering',
    progress: 15,
    nextLesson: 'Introduction to Docker containers',
    totalHours: 110,
    completedHours: 16,
    color: 'bg-cyan-500',
  },
];

const recommendedJobs = [
  {
    id: 1,
    title: 'Frontend Engineer',
    company: 'CloudBase Inc.',
    location: 'Remote',
    type: 'Full-time',
    match: 94,
    salary: '$90k–$120k',
    posted: '2d ago',
  },
  {
    id: 2,
    title: 'React Developer',
    company: 'PixelWave Studio',
    location: 'Bangalore',
    type: 'Contract',
    match: 88,
    salary: '$70k–$90k',
    posted: '4d ago',
  },
  {
    id: 3,
    title: 'UI Engineer',
    company: 'Insight Labs',
    location: 'Remote',
    type: 'Full-time',
    match: 82,
    salary: '$75k–$100k',
    posted: '1w ago',
  },
  {
    id: 4,
    title: 'Product Designer',
    company: 'Pixel Studio',
    location: 'New York',
    type: 'Internship',
    match: 76,
    salary: '$45k–$60k',
    posted: '1w ago',
  },
];

const notifications = [
  {
    id: 1,
    type: 'match',
    text: 'New job match: Senior React Developer at Vercel',
    time: '30m ago',
    unread: true,
  },
  {
    id: 2,
    type: 'reply',
    text: 'Sarah Chen replied to your community post',
    time: '2h ago',
    unread: true,
  },
  {
    id: 3,
    type: 'course',
    text: 'Your "Node.js APIs" lesson is ready to continue',
    time: '5h ago',
    unread: false,
  },
  {
    id: 4,
    type: 'achievement',
    text: 'You earned the "7-Day Streak" badge 🔥',
    time: 'Yesterday',
    unread: false,
  },
];

const activity = [
  {
    id: 1,
    action: 'Applied to',
    target: 'Frontend Engineer at CloudBase Inc.',
    time: '3h ago',
    icon: '📨',
  },
  {
    id: 2,
    action: 'Completed lesson',
    target: 'React State Management with Context',
    time: '6h ago',
    icon: '✅',
  },
  {
    id: 3,
    action: 'Replied in Community',
    target: '"Best practices for state management in React 19?"',
    time: 'Yesterday',
    icon: '💬',
  },
  {
    id: 4,
    action: 'Proposed on gig',
    target: 'Build a React dashboard — Priya Sharma',
    time: '2d ago',
    icon: '💼',
  },
  {
    id: 5,
    action: 'Started learning path',
    target: 'Cloud & DevOps Engineering',
    time: '3d ago',
    icon: '🚀',
  },
];

const suggestedSkills = [
  { name: 'TypeScript', learners: '14.2K' },
  { name: 'Next.js', learners: '11.8K' },
  { name: 'GraphQL', learners: '8.4K' },
  { name: 'Redis', learners: '6.1K' },
  { name: 'Kubernetes', learners: '5.7K' },
  { name: 'Rust', learners: '4.3K' },
  { name: 'Supabase', learners: '3.9K' },
];

const quickActions = [
  { label: 'Browse Jobs', href: '/jobs', icon: '💼' },
  { label: 'Find Mentors', href: '/skills', icon: '🎓' },
  { label: 'Post a Gig', href: '/freelance', icon: '📋' },
  { label: 'Community', href: '/community', icon: '💬' },
  { label: 'My Portfolio', href: '/portfolio', icon: '🗂️' },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
};

// Animated count-up number
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 700;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{display}</span>;
};

// ─── Greeting helper ──────────────────────────────────────────────────────────

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const getMatchColor = (pct) => {
  if (pct >= 90) return 'text-green-600';
  if (pct >= 80) return 'text-orange-500';
  return 'text-gray-500';
};

const getNotifIcon = (type) => {
  switch (type) {
    case 'match': return '💼';
    case 'reply': return '💬';
    case 'course': return '📚';
    case 'achievement': return '🏆';
    default: return '🔔';
  }
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Welcome strip ───────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                {getGreeting()} ·{' '}
                <span className="text-orange-500">🔥 {user.streak}-day streak</span>
              </p>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.name.split(' ')[0]}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {user.role} · Active {user.lastActive} · {user.joinedDaysAgo} days on SkillBridge
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {user.name[0]}
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Stats row ──────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-white px-5 py-5">
              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                <AnimatedNumber value={stat.value} />
              </p>
              <p className="text-sm font-medium text-gray-700 mt-0.5">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Main two-column body ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column: Learning + Jobs */}
          <div className="lg:col-span-2 space-y-8">

            {/* ── Continue Learning ──────────────────────────────────────── */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900">Continue Learning</h2>
                <Link to="/learning" className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
                  All paths →
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {learningPaths.map((path, i) => (
                  <motion.div
                    key={path.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.5}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${path.color}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">{path.title}</p>
                          <span className="text-xs font-medium text-gray-500 shrink-0 tabular-nums">
                            {path.progress}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2.5 truncate">
                          Next: {path.nextLesson}
                        </p>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <motion.div
                            className={`h-1.5 rounded-full ${path.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${path.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1.5">
                          {path.completedHours}h of {path.totalHours}h complete
                        </p>
                      </div>
                      <Link to="/learning" className="shrink-0">
                        <span className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors">
                          Resume →
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Recommended Jobs ───────────────────────────────────────── */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900">Recommended for You</h2>
                <Link to="/jobs" className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
                  Browse all →
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {recommendedJobs.map((job, i) => (
                  <motion.div
                    key={job.id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.4}
                    className="px-4 py-3.5 hover:bg-gray-50 transition-colors flex items-center gap-4"
                  >
                    {/* Company initial */}
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-gray-600">
                        {job.company[0]}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{job.title}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {job.company} · {job.location} · {job.salary}
                      </p>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-semibold ${getMatchColor(job.match)}`}>
                        {job.match}% match
                      </span>
                      <Badge variant="skill" size="small">{job.type}</Badge>
                      <Link to="/jobs">
                        <span className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors">
                          Apply →
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Recent Activity ────────────────────────────────────────── */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
            >
              <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-1">
                {activity.map((item, i) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.3}
                    className="flex items-start gap-3 py-2.5"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-sm">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">
                        <span className="text-gray-500">{item.action} </span>
                        <span className="font-medium text-gray-900 truncate">{item.target}</span>
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 mt-0.5">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right column: Quick Actions + Notifications */}
          <div className="space-y-6">

            {/* ── Quick Actions ───────────────────────────────────────────── */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <h2 className="text-base font-semibold text-gray-900 mb-3">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action, i) => (
                  <motion.div key={action.label} whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
                    <Link
                      to={action.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-orange-200 hover:shadow-sm transition-all duration-150"
                    >
                      <span className="text-lg leading-none">{action.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{action.label}</span>
                      <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Notifications ──────────────────────────────────────────── */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
                <span className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
                  Mark all read
                </span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {notifications.map((notif, i) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 transition-colors hover:bg-gray-50 ${notif.unread ? 'bg-orange-50/50' : ''}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-base leading-none mt-0.5">{getNotifIcon(notif.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 leading-relaxed">{notif.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                      {notif.unread && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0 mt-1.5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Profile completion ─────────────────────────────────────── */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">Profile Strength</p>
                  <span className="text-sm font-semibold text-orange-500">72%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                  <motion.div
                    className="bg-orange-500 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <ul className="space-y-1.5">
                  {[
                    { text: 'Add a profile photo', done: false },
                    { text: 'Complete bio', done: true },
                    { text: 'Add 3+ skills', done: true },
                    { text: 'Link GitHub account', done: false },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className={item.done ? 'text-green-500' : 'text-gray-300'}>
                        {item.done ? '✓' : '○'}
                      </span>
                      <span className={item.done ? 'line-through text-gray-400' : ''}>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/profile" className="mt-3 block">
                  <Button variant="outline" size="sm" className="w-full mt-1">
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </motion.section>
          </div>
        </div>

        {/* ── Skills you might like ──────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={5}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Skills You Might Like</h2>
            <Link to="/skills" className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
              Explore all →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.3}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to="/skills">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors cursor-pointer">
                    {skill.name}
                    <span className="text-xs text-gray-400">{skill.learners}</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  );
};

export default Dashboard;
