import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/experience-editor.css';
import { Button } from '@/components/ui/button';
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

  // ✅ handle dialog close with reason
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

  const getInputClasses = (status) => {
    const base =
      'w-full p-3 rounded-lg border outline-none transition-all duration-200 bg-input text-foreground';

    switch (status) {
      case 'error':
        return `${base} border-destructive/70 bg-destructive/10 focus:border-destructive focus:ring-2 focus:ring-destructive/30`;
      case 'success':
        return `${base} border-green-500/60 bg-green-500/10 focus:border-green-500 focus:ring-2 focus:ring-green-500/30`;
      default:
        return `${base} border-border focus:border-primary focus:ring-2 focus:ring-primary/30`;
    }
  };

  const getSelectClasses = (status) => {
    const base =
      'w-full p-3 rounded-lg border outline-none transition-all duration-200 appearance-none bg-input text-foreground';

    switch (status) {
      case 'error':
        return `${base} border-destructive/70 bg-destructive/10 focus:border-destructive focus:ring-2 focus:ring-destructive/30`;
      case 'success':
        return `${base} border-green-500/60 bg-green-500/10 focus:border-green-500 focus:ring-2 focus:ring-green-500/30`;
      default:
        return `${base} border-border focus:border-primary focus:ring-2 focus:ring-primary/30`;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
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
            className="bg-card text-card-foreground rounded-lg shadow-md p-6 space-y-6 border border-border">
            <FormHeader />

            {/* Name + Company */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-muted-foreground">
                  <User className="w-4 h-4 text-primary" /> Your Name
                  <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    disabled={isAnonymous}
                    className={getInputClasses(
                      getFieldStatus('username', formData.user_name)
                    )}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {getStatusIcon(
                      getFieldStatus('username', formData.user_name)
                    )}
                  </div>
                </div>
                {errors.username && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.user_name}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-muted-foreground">
                  <Building2 className="w-4 h-4 text-primary" /> Company
                  <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className={getInputClasses(
                      getFieldStatus('company', formData.company)
                    )}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {getStatusIcon(getFieldStatus('company', formData.company))}
                  </div>
                </div>
                {errors.company && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.company}
                  </p>
                )}
              </div>
            </div>

            {/* Offer Type + Opportunity Type */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-primary" /> Offer Type
                  <span className="text-destructive">*</span>
                </label>
                <select
                  name="offer_type"
                  value={formData.offer_type}
                  onChange={handleChange}
                  className={getSelectClasses(
                    getFieldStatus('offer_type', formData.offer_type)
                  )}>
                  <option value="">Select Offer Type</option>
                  {offerTypes.map((offer) => (
                    <option
                      key={offer.value}
                      value={offer.value}
                      className="bg-card text-card-foreground">
                      {offer.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-primary" /> Opportunity
                  Type
                  <span className="text-destructive">*</span>
                </label>
                <select
                  name="opportunity_type"
                  value={formData.opportunity_type}
                  onChange={handleChange}
                  className={getSelectClasses(
                    getFieldStatus(
                      'opportunity_type',
                      formData.opportunity_type
                    )
                  )}>
                  <option value="">Select Opportunity Type</option>
                  {opportunityTypes.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                      className="bg-card text-card-foreground">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Position */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1 text-muted-foreground">
                <Briefcase className="w-4 h-4 text-primary" /> Position
                <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Software Engineer Intern, Data Analyst, SDE-1"
                className={getInputClasses(
                  getFieldStatus('position', formData.position)
                )}
              />
            </div>

            {/* LinkedIn + GitHub */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-muted-foreground">
                  <Linkedin className="w-4 h-4 text-primary" /> LinkedIn
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className={getInputClasses(
                    getFieldStatus('linkedin', formData.linkedin)
                  )}
                  disabled={isAnonymous}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1 text-muted-foreground">
                  <Github className="w-4 h-4 text-primary" /> GitHub
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className={getInputClasses(
                    getFieldStatus('github', formData.github)
                  )}
                />
              </div>
            </div>

            {/* Markdown Editor */}
            <MarkdownEditor
              ref={editorRef}
              value={experience}
              onChange={handleExperienceChange}
              error={errors.experience}
              label="Interview Experience *"
              placeholder="Write your interview experience..."
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 
                         bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted cursor-pointer">
              <FileText className="w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'Submit Experience'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
