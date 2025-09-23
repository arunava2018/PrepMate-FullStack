import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Linkedin,
  Github,
  Briefcase,
  Share2,
} from "lucide-react";
import { fetchExperienceById } from "@/db/apiInterviewExperience";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { toast } from "sonner";

export default function ExperienceDetails() {
  const { experienceId } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const data = await fetchExperienceById(experienceId);
        setExperience(data);
      } catch (err) {
        console.error("Failed to fetch experience:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExperience();
  }, [experienceId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Experience Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The interview experience you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const {
    role,
    content,
    users,
    linkedin_url,
    github_url,
    company_name,
    created_at,
  } = experience;

  const userName = users?.full_name || "Anonymous User";

  // Avatar initials (first + last name)
  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  const avatarInitials = getInitials(userName);

  const createdDate = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            {company_name && (
              <h1 className="flex items-center gap-2 text-3xl text-amber-700 dark:text-amber-300">
                <Briefcase className="w-5 h-5" />
                {company_name}
              </h1>
            )}
            <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {role}
            </h1>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition text-sm font-medium"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Author row */}
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-black border rounded-lg">
          {/* Left side: avatar + name + icons */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold">
              {avatarInitials}
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {userName}
            </span>
            {linkedin_url && (
              <a
                href={linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Right side: published date */}
          {createdDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published at <span className="italic">{createdDate}</span>
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border shadow-sm">
        <MarkdownRenderer
          content={
            content ||
            `# No Content Available

This interview experience doesn't have detailed content yet.  

**What you can do:**
- Check back later
- Browse other experiences
- Share your own interview experience`
          }
        />
      </div>
    </div>
  );
}
