import React from "react";
import { FaEdit, FaLock, FaTrashAlt, FaCog, FaDownload, FaEye } from 'react-icons/fa';

function ProfileAction() {
  const actionButtons = [
    {
      id: 'edit',
      label: 'Edit Profile',
      icon: <FaEdit className="w-4 h-4" />,
      variant: 'primary',
      description: 'Update your personal information'
    },
    {
      id: 'password',
      label: 'Change Password',
      icon: <FaLock className="w-4 h-4" />,
      variant: 'secondary',
      description: 'Update your account security'
    },
    {
      id: 'delete',
      label: 'Delete Account',
      icon: <FaTrashAlt className="w-4 h-4" />,
      variant: 'danger',
      description: 'Permanently remove your account'
    }
  ];

  const getButtonStyles = (variant) => {
    const baseStyles = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm hover:shadow-md`;
      case 'secondary':
        return `${baseStyles} bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-500`;
      case 'outline':
        return `${baseStyles} border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500`;
      case 'danger':
        return `${baseStyles} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md`;
      default:
        return baseStyles;
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick Actions Header */}
      <div className="text-center mb-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Available Actions
        </h3>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {actionButtons.map((action) => (
          <div key={action.id} className="group">
            <button className={getButtonStyles(action.variant)}>
              <div className="flex-shrink-0">
                {action.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">
                  {action.label}
                </div>
                <div className="text-xs opacity-75 mt-0.5">
                  {action.description}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Need Help?
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                Contact support if you have questions about your account or need assistance with any features.
              </p>
              <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2">
                Get Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAction;
