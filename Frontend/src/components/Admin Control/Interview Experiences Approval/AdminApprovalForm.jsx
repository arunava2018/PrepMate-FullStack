import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Briefcase, FileText } from "lucide-react";
import {
  approveExperience,
  deleteExperience,
} from "@/db/apiInterviewExperience";
import MarkdownEditor from "@/components/submit-experience-form/MarkdownEditor";

export default function AdminApprovalForm({
  initialData,
  onClose,
  fetchData,
}) {
  const [formData, setFormData] = useState({
    role: initialData.role || "",
    offer_type: initialData.offer_type || "",
    opportunity_type: initialData.opportunity_type || "",
    linkedin_url: initialData.linkedin_url || "",
    github_url: initialData.github_url || "",
    content: initialData.content || "",
  });
  const [loading, setLoading] = useState(false);

  const offerTypes = [
    { value: "internship", label: "Internship" },
    { value: "full_time", label: "Full Time" },
    { value: "internship_ppo", label: "Internship + PPO" },
  ];

  const opportunityTypes = [
    { value: "on", label: "On Campus" },
    { value: "off", label: "Off Campus" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExperienceChange = (val) => {
    setFormData((prev) => ({ ...prev, content: val }));
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      await approveExperience(initialData.id, formData);
      fetchData();
      onClose();
    } catch (err) {
      console.error("Error approving:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteExperience(initialData.id);
      fetchData();
      onClose();
    } catch (err) {
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Role (Position) */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-yellow-500" /> Position
        </label>
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
          <Briefcase className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white"
            placeholder="e.g. Software Engineer Intern"
          />
        </div>
      </div>

      {/* Offer Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <FileText className="w-4 h-4 text-green-500" /> Offer Type
        </label>
        <select
          name="offer_type"
          value={formData.offer_type}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white p-2 rounded-lg outline-none"
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
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-500" /> Opportunity Type
        </label>
        <select
          name="opportunity_type"
          value={formData.opportunity_type}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white p-2 rounded-lg outline-none"
        >
          <option value="">Select Opportunity Type</option>
          {opportunityTypes.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* LinkedIn & GitHub */}
      <div className="grid grid-cols-2 space-x-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-blue-500" /> LinkedIn URL
          </label>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
            <input
              type="url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Github className="w-4 h-4 text-gray-400" /> GitHub URL
          </label>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
            <input
              type="url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white"
              placeholder="https://github.com/username"
            />
          </div>
        </div>
      </div>

      {/* Markdown Editor */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
          Experience Content
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={handleExperienceChange}
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-between mt-6">
        <Button
          className="cursor-pointer"
          variant="destructive"
          disabled={loading}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium cursor-pointer"
          disabled={loading}
          onClick={handleApprove}
        >
          Approve
        </Button>
      </div>
    </div>
  );
}
