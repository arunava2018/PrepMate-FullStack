import { use, useState } from "react";
import { addInterviewExperience } from "@/db/apiInterviewExperience";
import { UrlState } from "@/context";
export const useExperienceForm = () => {
  const { user } = UrlState();

  const [formData, setFormData] = useState({
    username: user?.full_name || "",
    company: "",
    position: "",
    linkedin: "",
    github: "",
    role: "",
    opportunity_type: "",
    offer_type: "",
    is_public: false,
  });

  const [experience, setExperience] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name] && value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleExperienceChange = (value) => {
    setExperience(value);
    if (errors.experience && value.trim()) {
      setErrors((prev) => ({ ...prev, experience: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Name is required";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    if (!formData.linkedin.trim()) {
      newErrors.linkedin = "LinkedIn profile is required";
    }
    if (!formData.opportunity_type.trim()) {
      newErrors.opportunity_type = "Opportunity type is required";
    }
    if (!formData.offer_type.trim()) {
      newErrors.offer_type = "Offer type is required";
    }
    if (!experience.trim()) {
      newErrors.experience = "Interview experience is required";
    }
    return newErrors;
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

  const handleSubmit = async (e, editorRef) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const dataToSave = { ...formData, experience };
      // console.log("Submitting:", dataToSave);

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
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
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
