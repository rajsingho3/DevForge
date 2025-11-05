"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MarkedToggleButtonProps {
  markedForRevision?: boolean;
  id: string;
}

export default function MarkedToggleButton({ markedForRevision = false, id }: MarkedToggleButtonProps) {
  const [isMarked, setIsMarked] = useState(markedForRevision);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement the toggle star API call
      // const response = await toggleStarmark(id);
      console.log('Toggling starmark for project:', id);
      
      setIsMarked(!isMarked);
      toast.success(isMarked ? "Removed from starred" : "Added to starred");
    } catch (error) {
      toast.error("Failed to update starred status");
      console.error("Error toggling starmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer transition-colors"
    >
      <Star
        className={`h-4 w-4 mr-2 ${isMarked ? "fill-yellow-400 text-yellow-400" : ""}`}
      />
      <span>{isMarked ? "Unstar" : "Star"}</span>
    </button>
  );
}
