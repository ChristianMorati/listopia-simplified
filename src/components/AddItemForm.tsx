
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddItemFormProps {
  onAddItem: (text: string) => void;
  className?: string;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, className = "" }) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on initial render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddItem(text);
      setText("");
      
      // Re-focus the input after adding an item
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 w-full ${className}`}>
      <Input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add an item..."
        className="flex-1 h-12 bg-background/90 border-input rounded-lg px-4 shadow-sm focus-visible:ring-1 focus-visible:ring-ring transition-all duration-200"
      />
      <Button
        type="submit"
        size="icon"
        className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-all duration-200"
        disabled={!text.trim()}
      >
        <Plus className="h-5 w-5" />
        <span className="sr-only">Add item</span>
      </Button>
    </form>
  );
};

export default AddItemForm;
