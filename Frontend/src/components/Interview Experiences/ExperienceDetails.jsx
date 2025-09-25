import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Linkedin, Github, Briefcase, Share2 } from "lucide-react";
import { fetchExperienceById } from "@/db/apiInterviewExperience";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

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

  // Share
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
    }
  };

  // Avatar initials
  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        {/* Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>

        <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border shadow-sm space-y-3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
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
    is_anonymous,
  } = experience;

  // Anonymity check
  const userName = is_anonymous ? "Anonymous User" : users?.full_name || "Unknown User";
  const avatarInitials = is_anonymous ? "A" : getInitials(userName);

  const createdDate = created_at
    ? new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {/* Company + Role */}
          <div>
            {company_name && (
              <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold text-amber-700 dark:text-amber-300">
                <Briefcase className="w-5 h-5" />
                {company_name}
              </h1>
            )}
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-1">
              {role}
            </h2>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center rounded-md bg-amber-500 text-white hover:bg-amber-600 transition px-3 py-2 text-sm font-medium"
          >
            <Share2 className="w-5 h-5 block sm:hidden" />
            <span className="hidden sm:flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </span>
          </button>
        </div>

        {/* Author Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3">
          {/* Left: avatar + name + socials */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold">
              {avatarInitials}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {userName}
              </span>
              {!is_anonymous && linkedin_url && (
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
              {!is_anonymous && github_url && (
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
          </div>

          {/* Right: published date */}
          {createdDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published on <span className="italic">{createdDate}</span>
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
