// useExperienceForm.js
import { useState } from "react";
import { addInterviewExperience } from "@/db/apiInterviewExperience";
import { UrlState } from "@/context";

export const useExperienceForm = () => {
  const { user } = UrlState();

  const [formData, setFormData] = useState({
    company: "",
    offer_type: "",
    opportunity_type: "",
    position: "",
    linkedin: "",
    github: "",
    is_public: false,
    is_anonymous: false,
  });

  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // -------------------------
  // URL validation
  // -------------------------
  const validateURL = (url) => {
    if (!url) return true; // Empty is valid for optional fields
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return urlPattern.test(url);
  };

  // -------------------------
  // Field validation
  // -------------------------
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "company":
        if (!value.trim()) {
          error = "Company name is required";
        } else if (value.trim().length < 2) {
          error = "Company name must be at least 2 characters long";
        }
        break;

      case "offer_type":
        if (!value) {
          error = "Please select an offer type";
        }
        break;

      case "opportunity_type":
        if (!value) {
          error = "Please select an opportunity type";
        }
        break;

      case "position":
        if (!value.trim()) {
          error = "Position is required";
        } else if (value.trim().length < 2) {
          error = "Position must be at least 2 characters long";
        }
        break;

      case "linkedin":
        if (value && !validateURL(value)) {
          error =
            "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourprofile)";
        } else if (value && !value.includes("linkedin.com")) {
          error = "Please provide a LinkedIn profile URL";
        }
        break;

      case "github":
        if (value && !validateURL(value)) {
          error =
            "Please enter a valid GitHub URL (e.g., https://github.com/yourusername)";
        } else if (value && !value.includes("github.com")) {
          error = "Please provide a GitHub profile URL";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // -------------------------
  // Experience validation
  // -------------------------
  const validateExperience = (content) => {
    if (!content || !content.trim()) {
      return "Interview experience is required";
    }
    if (content.trim().length < 50) {
      return "Please provide a detailed experience (at least 50 characters)";
    }
    return "";
  };

  // -------------------------
  // Handlers
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleExperienceChange = (content) => {
    setExperience(content);

    const experienceError = validateExperience(content);
    setErrors((prev) => ({
      ...prev,
      experience: experienceError,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    const experienceError = validateExperience(experience);
    if (experienceError) {
      newErrors.experience = experienceError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = (editorRef) => {
    setFormData({
      company: "",
      position: "",
      linkedin: "",
      github: "",
      offer_type: "",
      opportunity_type: "",
      is_public: false,
      is_anonymous: false,
    });
    setExperience("");
    if (editorRef?.current?.clearEditor) {
      editorRef.current.clearEditor();
    }
    setErrors({});
  };

  // -------------------------
  // Submit
  // -------------------------
  const handleSubmit = async (e, editorRef, isAnonymous) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateForm()) {
        setIsSubmitting(false);

        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField === "experience" && editorRef?.current) {
          editorRef.current.focus();
        } else {
          const field = document.querySelector(`[name="${firstErrorField}"]`);
          if (field) field.focus();
        }

        return;
      }

      // ✅ Use dialog value directly, not stale state
      await addInterviewExperience({
        company_name: formData.company,
        role: formData.position,
        linkedin_url: formData.linkedin,
        github_url: formData.github,
        offer_type: formData.offer_type,
        opportunity_type: formData.opportunity_type,
        content: experience,
        is_public: !isAnonymous,      // post with name = public
        is_anonymous: isAnonymous,    // direct from dialog
      });

      resetForm(editorRef);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = "/"; // ✅ redirect after toast
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to submit experience. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    experience,
    errors,
    isSubmitting,
    showSuccess,
    handleChange,
    handleExperienceChange,
    handleSubmit,
  };
};
