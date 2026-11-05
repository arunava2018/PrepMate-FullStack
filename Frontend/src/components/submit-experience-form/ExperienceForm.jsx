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
    setShowSuccess,
    handleChange,
    handleExperienceChange,
    handleSubmit,
  } = useExperienceForm();

  // apply anonymous preference once chosen
  const handlePreferenceSelect = (anonymous) => {
    setIsAnonymous(anonymous);
  };

  // handle dialog close with reason
  const handleDialogClose = (reason) => {
    if (reason === 'dismissed' && isAnonymous === null) {
      navigate('/view-interview-experiences');
    }
    setShowPreferenceDialog(false); // otherwise just close
  };

  return (
    <div className="bg-[#f7f4ee] px-5 py-10 dark:bg-[#161513] sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <FormHeader />
        <SuccessMessage showSuccess={showSuccess} onClose={() => setShowSuccess(false)} />

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
            className="experience-form space-y-8 rounded-xl border border-black/10 bg-[#fdfbf7] p-5 text-[#1f1b16] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de] sm:p-8 [&_input]:border-black/10 [&_input]:bg-[#fdfbf7] [&_input]:text-[#1f1b16] [&_input]:placeholder:text-[#776f65] [&_input]:focus-visible:ring-[#2459a6] [&_label]:text-[#1f1b16] [&_label_svg]:text-[#2459a6] dark:[&_input]:border-white/10 dark:[&_input]:bg-[#1c1a18] dark:[&_input]:text-[#efe9de] dark:[&_input]:placeholder:text-[#8a847a] dark:[&_label]:text-[#efe9de] dark:[&_label_svg]:text-[#a8c7f3]">

            <div className="space-y-6">
              {/* Posting preference and company */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sharing as</p>
                  <div className="flex min-h-10 items-center gap-2 rounded-md border border-black/10 px-3 text-sm text-[#5e554a] dark:border-white/10 dark:text-[#aaa398]">
                    <User size={16} aria-hidden="true" />
                    {isAnonymous ? 'Anonymous' : user?.full_name || 'Your PrepMate profile'}
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building2 className="h-4 w-4" /> Company
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className={errors.company ? 'border-destructive focus-visible:ring-destructive' : ''}
                    />
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
                    <Briefcase className="h-4 w-4" /> Offer type
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="offer_type"
                    value={formData.offer_type}
                    onChange={handleChange}
                    className={`flex h-10 w-full rounded-md border border-black/10 bg-[#fdfbf7] px-3 py-2 text-sm text-[#1f1b16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2459a6] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de] ${errors.offer_type ? 'border-destructive focus-visible:ring-destructive' : ''}`}>
                    <option value="">Select offer type</option>
                    {offerTypes.map((offer) => (
                      <option key={offer.value} value={offer.value}>
                        {offer.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase className="h-4 w-4" /> Opportunity type
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="opportunity_type"
                    value={formData.opportunity_type}
                    onChange={handleChange}
                    className={`flex h-10 w-full rounded-md border border-black/10 bg-[#fdfbf7] px-3 py-2 text-sm text-[#1f1b16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2459a6] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de] ${errors.opportunity_type ? 'border-destructive focus-visible:ring-destructive' : ''}`}>
                    <option value="">Select opportunity type</option>
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
                    <Briefcase className="h-4 w-4" /> Position
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
                    <Linkedin className="h-4 w-4" /> LinkedIn
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
                    <Github className="h-4 w-4" /> GitHub
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
                  id="interview-experience"
                  value={experience}
                  onChange={handleExperienceChange}
                  error={errors.experience}
                  label="Interview experience *"
                  placeholder="Write your interview experience..."
                />
              </div>
            </div>

            {errors.submit && (
              <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {errors.submit}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-md bg-[#2459a6] text-sm font-medium text-white shadow-none transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:bg-[#a8c7f3] dark:text-[#111a27] dark:hover:bg-[#91b8ef]">
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
