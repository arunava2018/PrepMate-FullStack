import { useEffect, useState } from "react";
import { fetchUserInterviewExperiences, deleteExperience } from "@/db/apiInterviewExperience";
import { Edit3, Trash2, Calendar, Building, FileText } from "lucide-react";
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
      <div className="p-8 flex items-center justify-center text-gray-400">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-yellow-500 border-t-transparent mr-3"></div>
        Loading your experiences...
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
          <h2 className="text-2xl font-bold text-white">Interview Experiences</h2>
          <p className="text-gray-400 text-sm">Manage your shared experiences</p>
        </div>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-12 bg-neutral-900/50 rounded-xl border border-neutral-800">
          <FileText className="h-10 w-10 text-gray-500 mx-auto mb-3" />
          <p className="text-lg text-gray-400 mb-1">No experiences yet</p>
          <p className="text-gray-500 text-sm">Share your first interview experience to help others!</p>
        </div>
      ) : (
        <div className="bg-neutral-900 rounded-xl border border-neutral-700 overflow-hidden">
          {/* Table Header (desktop only) */}
          <div className="hidden lg:grid grid-cols-12 px-6 py-3 bg-neutral-800/50 border-b border-neutral-700 text-sm font-semibold text-gray-300 uppercase">
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-3 text-center">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-neutral-700/50">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 hover:bg-neutral-800/30 transition"
              >
                {/* Title */}
                <div className="lg:col-span-3 flex items-center">
                  <FileText className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-white font-medium">{exp.company_name} Interview</span>
                </div>

                {/* Status */}
                <div className="lg:col-span-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      exp.is_public
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        exp.is_public ? "bg-green-400" : "bg-yellow-400"
                      }`}
                    />
                    {exp.is_public ? "Published" : "In Review"}
                  </span>
                </div>

                {/* Company */}
                <div className="lg:col-span-2 flex items-center text-gray-300 text-sm">
                  <Building className="h-4 w-4 mr-1 text-gray-500" /> {exp.company_name}
                </div>

                {/* Date */}
                <div className="lg:col-span-2 flex items-center text-gray-300 text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  {new Date(exp.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                {/* Actions */}
                <div className="lg:col-span-3 flex flex-wrap gap-2 justify-end">
                  {!exp.is_public ? (
                    <>
                      <button
                        onClick={() => handleEdit(exp)}
                        className="flex items-center px-3 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition"
                      >
                        <Edit3 className="h-4 w-4 mr-1" /> Edit
                      </button>

                      {/* Shadcn Delete Modal */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="flex items-center px-3 py-1.5 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition disabled:opacity-50"
                            disabled={deleting === exp.id}
                          >
                            {deleting === exp.id ? (
                              <div className="animate-spin h-4 w-4 border-2 border-red-400 border-t-transparent rounded-full mr-1" />
                            ) : (
                              <Trash2 className="h-4 w-4 mr-1" />
                            )}
                            Delete
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-neutral-900 border border-neutral-700 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Experience</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              Are you sure you want to delete{" "}
                              <span className="font-semibold">{exp.company_name} Interview</span>? <br />
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-600">
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
                    <span className="text-gray-500 text-sm italic">No actions</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
