import React from 'react';
import { UrlState } from '@/context';
import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaCalendarAlt,
  FaBolt,
} from 'react-icons/fa';
import { IoWarning } from 'react-icons/io5';
import ProfileAction from './profileActions';
import UserExperiences from '@/components/Users Profile/UserExperinces.jsx';

function ProfileInfo() {
  const { user } = UrlState();
  let profileAvatar =
    user?.full_name
      ?.split(' ')
      .map((n) => n[0])
      .join('') || 'U';
  const profileFields = [
    {
      key: 'Full Name',
      value: user?.full_name,
      icon: <FaUser className="text-blue-500 dark:text-blue-400" />,
      placeholder: 'Enter your full name',
    },
    {
      key: 'Email',
      value: user?.email,
      icon: <FaEnvelope className="text-emerald-500 dark:text-emerald-400" />,
      placeholder: 'Enter your email address',
    },
    {
      key: 'College Name',
      value: user?.college_name,
      icon: <FaUniversity className="text-purple-500 dark:text-purple-400" />,
      placeholder: 'Enter your college name',
    },
    {
      key: 'Passout Year',
      value: user?.passout_year,
      icon: <FaCalendarAlt className="text-amber-500 dark:text-amber-400" />,
      placeholder: 'Enter graduation year',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Alert Banner */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl w-full md:w-auto">
            <IoWarning className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Remember to save changes after editing your profile
            </span>
          </div>
        </div>
        {/* Welcome Header */}
        <div className="text-center rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-2 justify-center">
            {/* Avatar */}
            <div className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-lg">
              {profileAvatar}
            </div>

            {/* Text */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Welcome, {user?.full_name?.split(' ')[0] || 'User'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                Manage your profile information and settings
              </p>
            </div>
          </div>
        </div>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information - 2/3 on desktop */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Information
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileFields.map((field) => (
                  <div key={field.key} className="space-y-3">
                    {/* Field Label */}
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        {field.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        {field.key}
                      </span>
                    </div>

                    {/* Field Value */}
                    <div className="ml-10">
                      {field.value ? (
                        <p className="text-gray-900 dark:text-white font-medium">
                          {field.value}
                        </p>
                      ) : (
                        <p className="text-gray-400 dark:text-gray-500 italic">
                          {field.placeholder}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions - 1/3 on desktop */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FaBolt className="text-white text-sm" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Actions
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <ProfileAction />
            </div>
          </div>
        </div>
        {/* User Interview Experiences Section */}
        <UserExperiences userId={user?.id} /> {/* ✅ added here */}
      </div>
    </div>
  );
}

export default ProfileInfo;
