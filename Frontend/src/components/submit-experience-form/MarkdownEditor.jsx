import { useEffect, useRef, forwardRef } from 'react';
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';

const MarkdownEditor = forwardRef(
  ({ value, onChange, error, label, placeholder }, ref) => {
    const textareaRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
      if (textareaRef.current) {
        editorRef.current = new EasyMDE({
          element: textareaRef.current,
          initialValue: value || '',
          placeholder: placeholder || 'Write here...',
          spellChecker: false,
          autosave: { enabled: false },
          toolbar: [
            'bold',
            'italic',
            'heading',
            '|',
            'quote',
            'unordered-list',
            'ordered-list',
            '|',
            'code',
            'link',
            'preview',
            'guide',
          ],
        });

        // Apply theme styles after EasyMDE mounts
        const cmWrapper = editorRef.current.codemirror.getWrapperElement();
        if (cmWrapper) {
          cmWrapper.classList.add(
            'rounded-lg',
            'border',
            'border-border',
            'bg-input',
            'text-foreground',
            'focus-within:ring-2',
            'focus-within:ring-primary/30',
            'transition'
          );
        }

        // Update value on change
        editorRef.current.codemirror.on('change', () => {
          onChange(editorRef.current.value());
        });
      }

      return () => {
        if (editorRef.current) {
          editorRef.current.toTextArea();
          editorRef.current = null;
        }
      };
    }, []);

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <textarea ref={textareaRef} />
        {error && <p className="text-destructive text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

MarkdownEditor.displayName = 'MarkdownEditor';

export default MarkdownEditor;
