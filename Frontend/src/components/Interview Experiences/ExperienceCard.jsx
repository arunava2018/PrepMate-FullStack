import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Briefcase, Eye, User } from "lucide-react";

function ExperienceCard({ experience, index }) {
  const {
    id,
    role,
    offer_type,
    users,
  } = experience;

  const userName = users?.full_name || "Anonymous User";

  // Badge style and text by offer type
  const getOfferBadgeConfig = (type) => {
    switch (type) {
      case "full_time":
        return {
          className: "bg-green-500 hover:bg-green-600 text-white",
          text: "Full Time",
        };
      case "internship_ppo":
        return {
          className: "bg-purple-500 hover:bg-purple-600 text-white",
          text: "Internship PPO",
        };
      case "internship":
        return {
          className: "bg-blue-500 hover:bg-blue-600 text-white",
          text: "Internship",
        };
      default:
        return {
          className: "bg-gray-500 hover:bg-gray-600 text-white",
          text: type || "Unknown",
        };
    }
  };

  const badgeConfig = getOfferBadgeConfig(offer_type);

  return (
    <div className="w-full border border-gray-200 dark:border-slate-600/30 rounded-xl bg-white dark:bg-slate-800/50 shadow-lg hover:shadow-xl transition-shadow duration-200 mb-4 backdrop-blur-sm p-6 flex items-center justify-between">
      
      {/* Left side - User info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Index circle */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-md flex-shrink-0">
          {index + 1}
        </div>

        {/* User details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-orange-500 dark:text-orange-400 flex-shrink-0" />
            <h3
              className="text-lg font-semibold text-gray-900 dark:text-white truncate"
              title={userName}
            >
              {userName}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-500 dark:text-slate-400 flex-shrink-0" />
            <p
              className="text-sm text-gray-600 dark:text-slate-400 truncate"
              title={role || "Position Not Specified"}
            >
              {role || "Position Not Specified"}
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {offer_type && (
          <Badge
            className={`px-3 py-1 text-xs font-medium transition-colors duration-200 ${badgeConfig.className}`}
          >
            {badgeConfig.text}
          </Badge>
        )}
        <Link
          to={`/view-interview-experiences/${id}`}
          className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors"
        >
          <Eye className="w-4 h-4" />
          View
        </Link>
      </div>
    </div>
  );
}

export default ExperienceCard;
