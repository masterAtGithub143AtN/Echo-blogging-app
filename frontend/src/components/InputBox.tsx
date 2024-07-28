interface InputBoxProps {
    type: 'text' | 'email' | 'number' | 'password'; // Use specific string literals for type
    placeholder: string;
    message: string;
    value?: string; // Optional prop
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean; // Optional disabled prop
}

export const InputBox = ({
    type,
    placeholder,
    message,
    value,
    onchange,
    disabled = false, // Default to false if not provided
}: InputBoxProps) => {
    const isRequired = message.endsWith("*"); // Simplify boolean check
    const cursorStyle = disabled
        ? { cursor: 'url(/path/to/red-cross-cursor.png), auto' } // Custom cursor for disabled state
        : {};

    return (
        <div>
            <div className="pt-3">
                <label className="p-2 font-bold">{message}</label>
            </div>
            <div className="pt-1">
                <input
                    className={`border border-gray-500 p-2 w-full rounded-md ${disabled ? 'bg-gray-200' : ''}`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onchange}
                    required={isRequired}
                    disabled={disabled} // Apply the disabled attribute
                    style={cursorStyle} // Apply the custom cursor style
                />
            </div>
        </div>
    );
};
