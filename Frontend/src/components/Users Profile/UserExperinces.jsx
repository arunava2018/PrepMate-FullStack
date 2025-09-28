import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserInterviewExperiences, deleteExperience } from "@/db/apiInterviewExperience";
import { Edit3, Trash2, Calendar, Building, FileText, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserExperiences({ userId }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const loadData = async () => {
      try {
        const data = await fetchUserInterviewExperiences(userId);
        setExperiences(data);
      } catch (err) {
        console.error("Error loading experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userId]);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error("Error deleting experience:", err);
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (exp) => alert("TODO: Open edit form");

  if (loading) {
    return (
      <div className="p-8">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
          {/* Table header skeleton */}
          <div className="hidden lg:grid grid-cols-12 px-6 py-3 bg-gray-50 dark:bg-neutral-800/50 border-b border-gray-200 dark:border-neutral-700">
            <Skeleton className="h-4 w-20 col-span-3" />
            <Skeleton className="h-4 w-16 col-span-2" />
            <Skeleton className="h-4 w-20 col-span-2" />
            <Skeleton className="h-4 w-20 col-span-2" />
            <Skeleton className="h-4 w-24 col-span-3 justify-self-end" />
          </div>

          {/* Table rows skeleton */}
          <div className="divide-y divide-gray-200 dark:divide-neutral-700/40">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-6"
              >
                <Skeleton className="h-5 w-40 col-span-3" />
                <Skeleton className="h-5 w-24 col-span-2" />
                <Skeleton className="h-5 w-28 col-span-2" />
                <Skeleton className="h-5 w-28 col-span-2" />
                <Skeleton className="h-8 w-32 col-span-3 justify-self-end rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
          <FileText className="text-white text-lg" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interview Experiences</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage and track your shared experiences
          </p>
        </div>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
          <FileText className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">No experiences yet</p>
          <p className="text-gray-500 text-sm mb-4">
            Share your first interview experience to help others in their journey.
          </p>
          <Link to="/share-experience">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
              + Add Experience
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-12 px-6 py-3 bg-gray-50 dark:bg-neutral-800/50 border-b border-gray-200 dark:border-neutral-700 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase">
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-200 dark:divide-neutral-700/40">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 transition ${
                  idx % 2 === 0
                    ? "bg-gray-50 dark:bg-neutral-800/20"
                    : "bg-white dark:bg-transparent"
                }`}
              >
                {/* Title */}
                <div className="lg:col-span-3 flex items-center font-medium text-gray-900 dark:text-gray-200">
                  <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                  {exp.company_name} Interview
                </div>

                {/* Status */}
                <div className="lg:col-span-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      exp.is_public
                        ? "bg-green-100 text-green-700 border border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        exp.is_public ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    {exp.is_public ? "Published" : "In Review"}
                  </span>
                </div>

                {/* Company */}
                <div className="lg:col-span-2 flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <Building className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />{" "}
                  {exp.company_name}
                </div>

                {/* Date */}
                <div className="lg:col-span-2 flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" />
                  {new Date(exp.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                {/* Actions */}
                <div className="lg:col-span-3 flex gap-2 justify-end">
                  {!exp.is_public ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(exp)}
                        className="flex items-center gap-1 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-500/30 dark:text-blue-400 dark:hover:bg-blue-600/20"
                      >
                        <Edit3 className="h-4 w-4" /> Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-600/20 disabled:opacity-50"
                            disabled={deleting === exp.id}
                          >
                            {deleting === exp.id ? (
                              <div className="animate-spin h-4 w-4 border-2 border-red-400 border-t-transparent rounded-full" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Experience</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                              Are you sure you want to delete{" "}
                              <span className="font-semibold">
                                {exp.company_name} Interview
                              </span>? <br />
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 border border-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(exp.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Confirm Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <Link to={`/view-interview-experiences/${exp.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-500/30 dark:text-blue-400 dark:hover:bg-blue-600/20"
                      >
                        <Eye className="h-4 w-4" /> View
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
          <div className="mt-4 text-right">
            <Link to={"/share-experience"}
              className="inline-block">
              <Button variant="secondary">
                + Add New Experience
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
