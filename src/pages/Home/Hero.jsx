import React from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Hero = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block">Build Skills. Find Opportunities.</span>
              <span className="block text-orange-600">Connect With People Who Care.</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-md">
              SkillBridge connects learners with the skills they need and opportunities they seek.
              Discover courses, connect with mentors, and launch your career journey today.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button variant="brand" className="h-12 px-8 font-semibold w-full sm:w-auto">
                Get Started
              </Button>
              <Button variant="outline" className="h-12 px-8 font-semibold w-full sm:w-auto">
                Explore Skills
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <Card className="border-0 shadow-xl bg-linear-to-br from-white to-gray-50 [&>div]:p-6 sm:[&>div]:p-8">
              <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">SkillBridge Platform</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Discover new skills</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Connect with mentors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Find career opportunities</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 min-[380px]:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-100 mt-6">
                    <div className="text-center min-w-0 px-1">
                      <p className="text-2xl min-[380px]:text-3xl font-black text-orange-600 tabular-nums">500+</p>
                      <p className="text-[0.65rem] min-[380px]:text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">Courses</p>
                    </div>
                    <div className="text-center min-w-0 px-1">
                      <p className="text-2xl min-[380px]:text-3xl font-black text-orange-600 tabular-nums">1.2K+</p>
                      <p className="text-[0.65rem] min-[380px]:text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">Mentors</p>
                    </div>
                    <div className="text-center min-w-0 px-1">
                      <p className="text-2xl min-[380px]:text-3xl font-black text-orange-600 tabular-nums">10K+</p>
                      <p className="text-[0.65rem] min-[380px]:text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">Learners</p>
                    </div>
                  </div>
                </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;