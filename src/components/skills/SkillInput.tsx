import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface SkillInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
}

export function SkillInput({ skills, onChange, placeholder = "Add a skill..." }: SkillInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addSkill = () => {
    const skill = inputValue.trim();
    if (skill && !skills.includes(skill)) {
      onChange([...skills, skill]);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter(s => s !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button onClick={addSkill} size="icon" variant="secondary">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-accent-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Add skills like: React, Python, Machine Learning, AWS, etc.
      </p>
    </div>
  );
}
