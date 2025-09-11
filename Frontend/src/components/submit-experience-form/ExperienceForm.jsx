import { useRef } from "react";
import "../../styles/experience-editor.css";
import { Button } from "@/components/ui/button";
import SuccessMessage from "./SuccessMessage";
import FormHeader from "./FormHeader";
import MarkdownEditor from "./MarkdownEditor";
import { useExperienceForm } from "./useExperienceForm";

// Icons
import {
  User,
  Building2,
  Briefcase,
  Linkedin,
  Github,
  FileText,
} from "lucide-react";

const ExperienceForm = () => {
  const editorRef = useRef(null);

  const offerTypes = [
    { value: "internship", label: "Internship" },
    { value: "full_time", label: "Full Time" },
    { value: "internship_ppo", label: "Internship + PPO" },
  ];

  const opportunityTypes = [
    { value: "on", label: "On Campus" },
    { value: "off", label: "Off Campus" },
  ];

  const {
    formData,
    experience,
    errors,
    isSubmitting,
    showSuccess,
    handleChange,
    handleExperienceChange,
    handleSubmit,
  } = useExperienceForm();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <SuccessMessage showSuccess={showSuccess} />

        <form
          onSubmit={(e) => handleSubmit(e, editorRef)}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6"
        >
          <FormHeader />

          {/* Name + Company */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <User className="w-4 h-4 text-yellow-500" /> Your Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your Name *"
                className={`w-full p-3 border rounded-lg outline-none
                  ${
                    errors.username
                      ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600"
                  }
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.username && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Building2 className="w-4 h-4 text-blue-500" /> Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name *"
                className={`w-full p-3 border rounded-lg outline-none
                  ${
                    errors.company
                      ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600"
                  }
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.company && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                  {errors.company}
                </p>
              )}
            </div>
          </div>

          {/* Offer Type + Opportunity Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Briefcase className="w-4 h-4 text-green-500" /> Offer Type
              </label>
              <select
                name="offer_type"
                value={formData.offer_type}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none
                  border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Offer Type *</option>
                {offerTypes.map((offer) => (
                  <option key={offer.value} value={offer.value}>
                    {offer.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Briefcase className="w-4 h-4 text-purple-500" /> Opportunity
                Type
              </label>
              <select
                name="opportunity_type"
                value={formData.opportunity_type}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none
                  border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Opportunity Type *</option>
                {opportunityTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              <Briefcase className="w-4 h-4 text-orange-500" /> Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Software Engineer Intern, Data Analyst, SDE-1 *"
              className={`w-full p-3 border rounded-lg outline-none
                ${
                  errors.position
                    ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-gray-600"
                }
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            {errors.position && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                {errors.position}
              </p>
            )}
          </div>

          {/* LinkedIn + GitHub */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn Profile *"
                className={`w-full p-3 border rounded-lg outline-none
                  ${
                    errors.linkedin
                      ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-600"
                  }
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              />
              {errors.linkedin && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                  {errors.linkedin}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Github className="w-4 h-4 text-gray-400" /> GitHub
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub Profile (optional)"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg outline-none
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Experience Markdown Editor */}
          <MarkdownEditor
            ref={editorRef}
            value={experience}
            onChange={handleExperienceChange}
            error={errors.experience}
            label="Interview Experience *"
            placeholder={`Write your interview experience...

Example:
1. Aptitude test
2. Coding challenge  
3. Technical and HR rounds
4. Final decision

Use **bold** and *italic* for emphasis!`}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 
              text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-5 h-5" />
            {isSubmitting ? "Submitting..." : "Submit Experience"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
