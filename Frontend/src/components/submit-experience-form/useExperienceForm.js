// useExperienceForm.js
import { useState } from "react";
import { addInterviewExperience } from "@/db/apiInterviewExperience";
import { UrlState } from "@/context";
export const useExperienceForm = () => {
  const { user } = UrlState();
  const [formData, setFormData] = useState({
    username: user?.full_name || "",
    company: "",
    offer_type: "",
    opportunity_type: "",
    position: "",
    linkedin: "",
    github: "",
  });
  
  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // URL validation function
  const validateURL = (url) => {
    if (!url) return true; // Empty is valid for optional fields
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return urlPattern.test(url);
  };

  // Real-time validation function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters long";
        }
        break;

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
        if (!value.trim()) {
          error = "LinkedIn profile is required";
        } else if (!validateURL(value)) {
          error = "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourprofile)";
        } else if (!value.includes("linkedin.com")) {
          error = "Please provide a LinkedIn profile URL";
        }
        break;

      case "github":
        // GitHub is optional, only validate if provided
        if (value && !validateURL(value)) {
          error = "Please enter a valid GitHub URL (e.g., https://github.com/yourusername)";
        } else if (value && !value.includes("github.com")) {
          error = "Please provide a GitHub profile URL";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Validate experience content
  const validateExperience = (content) => {
    if (!content || !content.trim()) {
      return "Interview experience is required";
    }
    if (content.trim().length < 50) {
      return "Please provide a detailed experience (at least 50 characters)";
    }
    return "";
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Handle experience editor changes
  const handleExperienceChange = (content) => {
    setExperience(content);
    
    // Real-time validation for experience
    const experienceError = validateExperience(content);
    setErrors(prev => ({
      ...prev,
      experience: experienceError
    }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};

    // Validate all required fields
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validate experience
    const experienceError = validateExperience(experience);
    if (experienceError) {
      newErrors.experience = experienceError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const resetForm = (editorRef) => {
    setFormData({
      username: user.name,
      company: "",
      position: "",
      linkedin: "",
      github: "",
      role: "",
      offer_type: "",
      opportunity_type: "",
      is_public: false,
    });
    setExperience("");
    if (editorRef?.current?.clearEditor) {
      editorRef.current.clearEditor();
    }
    setErrors({});
  };
  // Handle form submission
  const handleSubmit = async (e, editorRef) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!validateForm()) {
        setIsSubmitting(false);
        
        // Focus on first error field
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField === "experience" && editorRef?.current) {
          editorRef.current.focus();
        } else {
          const field = document.querySelector(`[name="${firstErrorField}"]`);
          if (field) field.focus();
        }
        
        return;
      }

      // Prepare submission data
      const submissionData = {
        ...formData,
        experience: experience.trim()
      };
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        // username: "",
        company: "",
        offer_type: "",
        opportunity_type: "",
        position: "",
        linkedin: "",
        github: "",
      });
      setExperience("");
      setErrors({});
      await addInterviewExperience({
        userId: user.id,
        company_name: formData.company,
        role: formData.position,
        linkedin_url: formData.linkedin,
        github_url: formData.github,
        offer_type: formData.offer_type,
        opportunity_type: formData.opportunity_type,
        content: experience,
        is_public: formData.is_public,
      });
      resetForm(editorRef);
      setShowSuccess(true);
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
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
    experience,
    errors,
    isSubmitting,
    showSuccess,
    handleChange,
    handleExperienceChange,
    handleSubmit,
  };
};
