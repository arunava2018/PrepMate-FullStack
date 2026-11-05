import { useEffect, useState } from 'react';
import { LoaderCircle, MessageSquareText, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { updateQuestion } from '@/db/apiQuestion';

export default function UpdateQuestionModal({ isOpen, onClose, question }) {
  const [formData, setFormData] = useState({ question_text: '', answer_text: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!question) return;
    setFormData({ question_text: question.question_text || '', answer_text: question.answer_text || '' });
    setError('');
  }, [question]);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!question) return;
    setSaving(true);
    setError('');
    try {
      await updateQuestion({ questionId: question.id, ...formData });
      onClose();
    } catch (cause) {
      setError(cause.message || 'Could not update this question');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl border-black/10 bg-[#fdfbf7] p-0 text-[#1f1b16] shadow-xl dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de]">
        <DialogHeader className="border-b border-black/10 px-6 py-5 pr-14 text-left dark:border-white/10">
          <DialogTitle className="flex items-center gap-2 text-lg font-medium">
            <MessageSquareText size={18} className="text-[#5e554a] dark:text-[#aaa398]" />
            Edit question
          </DialogTitle>
          <DialogDescription className="text-sm leading-5 text-[#5e554a] dark:text-[#aaa398]">
            Update the question or its answer
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-5 px-6 py-5">
          <div className="space-y-2">
            <label htmlFor="edit-question-text" className="text-sm font-medium">Question</label>
            <Input id="edit-question-text" value={formData.question_text} onChange={(event) => setFormData((current) => ({ ...current, question_text: event.target.value }))} className="h-11 rounded-lg border-black/10 bg-[#f7f4ee] text-sm shadow-none focus-visible:ring-2 dark:border-white/10 dark:bg-[#161513]" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-answer-text" className="text-sm font-medium">Answer</label>
            <Textarea id="edit-answer-text" value={formData.answer_text} onChange={(event) => setFormData((current) => ({ ...current, answer_text: event.target.value }))} className="min-h-48 rounded-lg border-black/10 bg-[#f7f4ee] text-sm leading-6 shadow-none focus-visible:ring-2 dark:border-white/10 dark:bg-[#161513]" rows={8} required />
          </div>

          <div className="flex flex-wrap justify-between gap-2 text-xs tabular-nums text-[#776f65] dark:text-[#8a847a]">
            <span>Question: {formData.question_text.length} characters</span>
            <span>Answer: {formData.answer_text.length} characters</span>
          </div>

          {error && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

          <DialogFooter className="border-t border-black/10 pt-4 dark:border-white/10">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving} className="h-10 rounded-md shadow-none">Cancel</Button>
            <Button type="submit" disabled={saving || !formData.question_text.trim() || !formData.answer_text.trim()} className="h-10 rounded-md bg-[#2459a6] text-white shadow-none hover:bg-[#1d4a8a]">
              {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
