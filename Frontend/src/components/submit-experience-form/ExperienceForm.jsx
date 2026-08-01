import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/experience-editor.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SuccessMessage from './SuccessMessage';
import { UrlState } from '@/context';
import FormHeader from './FormHeader';
import MarkdownEditor from './MarkdownEditor';
import { useExperienceForm } from './useExperienceForm';
import PostingPreferenceDialog from './PostingPreferenceDialog';
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
} from 'lucide-react';

const ExperienceForm = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { user } = UrlState();
  
  // preference state
  const [showPreferenceDialog, setShowPreferenceDialog] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(null);

  const offerTypes = [
    { value: 'internship', label: 'Internship' },
    { value: 'full_time', label: 'Full Time' },
    { value: 'internship_ppo', label: 'Internship + PPO' },
  ];

  const opportunityTypes = [
    { value: 'on', label: 'On Campus' },
    { value: 'off', label: 'Off Campus' },
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
    setFormData,
  } = useExperienceForm();

  // apply anonymous preference once chosen
  const handlePreferenceSelect = (anonymous) => {
    setIsAnonymous(anonymous);
    if (anonymous) {
      setFormData((prev) => ({
        ...prev,
        user_name: 'Anonymous User',
        linkedin: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        user_name: user?.full_name || '',
        linkedin: '',
      }));
    }
  };

  // handle dialog close with reason
  const handleDialogClose = (reason) => {
    if (reason === 'dismissed' && isAnonymous === null) {
      navigate('/'); // redirect home if dismissed without choosing
    }
    setShowPreferenceDialog(false); // otherwise just close
  };

  // URL validation
  const validateURL = (url) => {
    if (!url) return true;
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return urlPattern.test(url);
  };

  const getFieldStatus = (fieldName, value) => {
    if (errors[fieldName]) return 'error';
    if (value && !errors[fieldName]) {
      if (fieldName === 'linkedin' || fieldName === 'github') {
        return validateURL(value) ? 'success' : 'error';
      }
      return 'success';
    }
    return 'default';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <SuccessMessage showSuccess={showSuccess} />

        {/* preference dialog */}
        <PostingPreferenceDialog
          open={showPreferenceDialog}
          onClose={handleDialogClose}
          onSelect={handlePreferenceSelect}
        />

        {/* only show form after choice */}
        {isAnonymous !== null && (
          <form
            onSubmit={(e) => handleSubmit(e, editorRef, isAnonymous)}
            className="bg-card text-card-foreground rounded-xl shadow-sm border border-border p-6 sm:p-8 space-y-8">
            <FormHeader />

            <div className="space-y-6">
              {/* Name + Company */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="w-4 h-4 text-primary" /> Your Name
                    <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      name="username"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      disabled={isAnonymous}
                      className={`pr-10 ${errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      {getStatusIcon(getFieldStatus('username', formData.user_name))}
                    </div>
                  </div>
                  {errors.username && (
                    <p className="text-destructive text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building2 className="w-4 h-4 text-primary" /> Company
                    <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className={`pr-10 ${errors.company ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      {getStatusIcon(getFieldStatus('company', formData.company))}
                    </div>
                  </div>
                  {errors.company && (
                    <p className="text-destructive text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Offer Type + Opportunity Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase className="w-4 h-4 text-primary" /> Offer Type
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="offer_type"
                    value={formData.offer_type}
                    onChange={handleChange}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.offer_type ? 'border-destructive focus-visible:ring-destructive' : ''}`}>
                    <option value="">Select Offer Type</option>
                    {offerTypes.map((offer) => (
                      <option key={offer.value} value={offer.value}>
                        {offer.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase className="w-4 h-4 text-primary" /> Opportunity Type
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="opportunity_type"
                    value={formData.opportunity_type}
                    onChange={handleChange}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.opportunity_type ? 'border-destructive focus-visible:ring-destructive' : ''}`}>
                    <option value="">Select Opportunity Type</option>
                    {opportunityTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Position */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Briefcase className="w-4 h-4 text-primary" /> Position
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer Intern, Data Analyst, SDE-1"
                  className={errors.position ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
              </div>

              {/* LinkedIn + GitHub */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Linkedin className="w-4 h-4 text-primary" /> LinkedIn
                    <span className="text-muted-foreground text-xs font-normal">
                      (optional)
                    </span>
                  </label>
                  <Input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    disabled={isAnonymous}
                    className={errors.linkedin ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Github className="w-4 h-4 text-primary" /> GitHub
                    <span className="text-muted-foreground text-xs font-normal">
                      (optional)
                    </span>
                  </label>
                  <Input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                    className={errors.github ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                </div>
              </div>

              {/* Markdown Editor */}
              <div className="pt-2">
                <MarkdownEditor
                  ref={editorRef}
                  value={experience}
                  onChange={handleExperienceChange}
                  error={errors.experience}
                  label="Interview Experience *"
                  placeholder="Write your interview experience..."
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold transition-all">
              <FileText className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
