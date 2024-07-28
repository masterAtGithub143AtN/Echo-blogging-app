import { useState, useEffect, useRef, ChangeEvent } from 'react';

interface AutoResizingTextareaProps {
  message: string;
  placeholder: string;
  text_message: string;
  text_placeholder: string;
  onTextChange: (text: string, type: string) => void;
  type: string;
  value: string; // Add this prop
  height: number;
}

const AutoResizingTextarea = (props: AutoResizingTextareaProps) => {
  const [text, setText] = useState<string>(props.value); // Initialize with props.value
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    props.onTextChange(event.target.value, props.type); // Call the callback with the new text
  };
  const h=props.height;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.max(textarea.scrollHeight,h); // Ensure minimum height of 128px
      textarea.style.height = `${newHeight}px`;

      // Scroll into view if the textarea gets close to the bottom of the viewport
      const rect = textarea.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (viewportHeight - rect.bottom < 128) {
        textarea.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [text]);

  // Update internal state if props.value changes
  useEffect(() => {
    setText(props.value);
  }, [props.value]);

  return (
    <form className='w-full'>
      <label htmlFor="paragraph" className={`block text-gray-700 font-medium text-${props.text_message}`}>
        {props.message}
      </label>
      <textarea
        id="paragraph"
        name="paragraph"
        value={text}
        onChange={handleChange}
        ref={textareaRef}
        rows={1}
        placeholder={props.placeholder}
        className={`w-full text-${props.text_placeholder} border-red-500 box-border overflow-hidden resize-none border-none outline-none`}
      />
    </form>
  );
};

export default AutoResizingTextarea;
