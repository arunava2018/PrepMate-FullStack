import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Briefcase, FileText } from "lucide-react";
import {
  approveExperience,
  deleteExperience,
} from "@/db/apiInterviewExperience";
import MarkdownEditor from "@/components/submit-experience-form/MarkdownEditor";

export default function AdminApprovalForm({ initialData, onClose, fetchData }) {
  const [formData, setFormData] = useState({
    role: initialData.role || "",
    offer_type: initialData.offer_type || "",
    opportunity_type: initialData.opportunity_type || "",
    linkedin_url: initialData.linkedin_url || "",
    github_url: initialData.github_url || "",
    content: initialData.content || "",
  });
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);

  const offerTypes = [
    { value: "internship", label: "Internship" },
    { value: "full_time", label: "Full Time" },
    { value: "internship_ppo", label: "Internship + PPO" },
  ];

  const opportunityTypes = [
    { value: "on", label: "On Campus" },
    { value: "off", label: "Off Campus" },
  ];

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleExperienceChange = (val) =>
    setFormData((prev) => ({ ...prev, content: val }));

  const handleApprove = async () => {
    try {
      setLoading(true);
      setAction("approve");

      // ✅ preserve is_anonymous from initial data
      await approveExperience(initialData.id, {
        ...formData,
        is_anonymous: initialData.is_anonymous,
      });

      await fetchData();
      onClose();
    } catch (err) {
      console.error("Error approving:", err);
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setAction("delete");
      await deleteExperience(initialData.id);
      await fetchData();
      onClose();
    } catch (err) {
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  return (
    <div className="space-y-6 bg-card text-card-foreground">
      {/* Role */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" /> Position
        </label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-border bg-input text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="e.g. Software Engineer Intern"
        />
      </div>

      {/* Offer Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <FileText className="w-4 h-4 text-green-500" /> Offer Type
        </label>
        <select
          name="offer_type"
          value={formData.offer_type}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-primary/30"
        >
          <option value="">Select Offer Type</option>
          {offerTypes.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Opportunity Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-500" /> Opportunity Type
        </label>
        <select
          name="opportunity_type"
          value={formData.opportunity_type}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-primary/30"
        >
          <option value="">Select Opportunity Type</option>
          {opportunityTypes.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Links (responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-blue-500" /> LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-border bg-input text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Github className="w-4 h-4 text-muted-foreground" /> GitHub URL
          </label>
          <input
            type="url"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-border bg-input text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Markdown Editor */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Experience Content
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={handleExperienceChange}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <Button
          className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
          variant="destructive"
          disabled={loading}
          onClick={handleDelete}
        >
          {loading && action === "delete" ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </Button>

        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
          disabled={loading}
          onClick={handleApprove}
        >
          {loading && action === "approve" ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
              Approving...
            </>
          ) : (
            "Approve"
          )}
        </Button>
      </div>
    </div>
  );
}
