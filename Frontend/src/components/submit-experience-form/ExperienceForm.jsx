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
  AlertCircle,
  CheckCircle,
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

  // Helper function to validate URL format
  const validateURL = (url) => {
    if (!url) return true; // Optional field
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return urlPattern.test(url);
  };

  // Helper function to get field validation status
  const getFieldStatus = (fieldName, value) => {
    if (errors[fieldName]) return "error";
    if (value && !errors[fieldName]) {
      // Special validation for URL fields
      if (fieldName === "linkedin" || fieldName === "github") {
        return validateURL(value) ? "success" : "error";
      }
      return "success";
    }
    return "default";
  };

  // Helper function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  // Helper function to get input classes based on status
  const getInputClasses = (status) => {
    const baseClasses = "w-full p-3 border rounded-lg outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200";
    
    switch (status) {
      case "error":
        return `${baseClasses} border-red-400 bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-1 focus:ring-red-200`;
      case "success":
        return `${baseClasses} border-green-400 bg-green-50 dark:bg-green-900/20 focus:border-green-500 focus:ring-1 focus:ring-green-200`;
      default:
        return `${baseClasses} border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-200`;
    }
  };

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
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={getInputClasses(getFieldStatus("username", formData.username))}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {getStatusIcon(getFieldStatus("username", formData.username))}
                </div>
              </div>
              {errors.username && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Building2 className="w-4 h-4 text-blue-500" /> Company
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className={getInputClasses(getFieldStatus("company", formData.company))}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {getStatusIcon(getFieldStatus("company", formData.company))}
                </div>
              </div>
              {errors.company && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
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
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="offer_type"
                  value={formData.offer_type}
                  onChange={handleChange}
                  className={getInputClasses(getFieldStatus("offer_type", formData.offer_type))}
                >
                  <option value="">Select Offer Type</option>
                  {offerTypes.map((offer) => (
                    <option key={offer.value} value={offer.value}>
                      {offer.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-8 pr-3 flex items-center pointer-events-none">
                  {getStatusIcon(getFieldStatus("offer_type", formData.offer_type))}
                </div>
              </div>
              {errors.offer_type && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.offer_type}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Briefcase className="w-4 h-4 text-purple-500" /> Opportunity Type
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="opportunity_type"
                  value={formData.opportunity_type}
                  onChange={handleChange}
                  className={getInputClasses(getFieldStatus("opportunity_type", formData.opportunity_type))}
                >
                  <option value="">Select Opportunity Type</option>
                  {opportunityTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-8 pr-3 flex items-center pointer-events-none">
                  {getStatusIcon(getFieldStatus("opportunity_type", formData.opportunity_type))}
                </div>
              </div>
              {errors.opportunity_type && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.opportunity_type}
                </p>
              )}
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              <Briefcase className="w-4 h-4 text-orange-500" /> Position
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Software Engineer Intern, Data Analyst, SDE-1"
                className={getInputClasses(getFieldStatus("position", formData.position))}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {getStatusIcon(getFieldStatus("position", formData.position))}
              </div>
            </div>
            {errors.position && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.position}
              </p>
            )}
          </div>

          {/* LinkedIn + GitHub */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className={getInputClasses(getFieldStatus("linkedin", formData.linkedin))}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {getStatusIcon(getFieldStatus("linkedin", formData.linkedin))}
                </div>
              </div>
              {errors.linkedin && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.linkedin}
                </p>
              )}
              {formData.linkedin && !errors.linkedin && !validateURL(formData.linkedin) && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourprofile)
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <Github className="w-4 h-4 text-gray-400" /> GitHub
                <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className={getInputClasses(getFieldStatus("github", formData.github))}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {getStatusIcon(getFieldStatus("github", formData.github))}
                </div>
              </div>
              {formData.github && !validateURL(formData.github) && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Please enter a valid GitHub URL (e.g., https://github.com/yourusername)
                </p>
              )}
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
