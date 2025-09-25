import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PostingPreferenceDialog({ open, onClose, onSelect }) {
  const [selected, setSelected] = useState("public"); // default choice

  const handleContinue = () => {
    onSelect(selected === "anonymous"); // true if anonymous
    onClose("confirmed"); // ✅ tell parent it was confirmed
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose("dismissed")}>
      <DialogContent className="max-w-md rounded-xl bg-card text-card-foreground border border-border shadow-xl">
        <DialogHeader className="pb-3">
          <DialogTitle className="text-lg font-bold text-center">
            Choose Your Posting Preference
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Public option */}
          <div
            onClick={() => setSelected("public")}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selected === "public"
                ? "border-primary bg-primary/10 ring-2 ring-primary/50"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <p className="font-semibold text-sm mb-1">Post with your name</p>
            <p className="text-xs text-muted-foreground">
              Your name and profile visible • LinkedIn linkable • Direct networking
            </p>
          </div>

          {/* Anonymous option */}
          <div
            onClick={() => setSelected("anonymous")}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selected === "anonymous"
                ? "border-primary bg-primary/10 ring-2 ring-primary/50"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <p className="font-semibold text-sm mb-1">Post anonymously</p>
            <p className="text-xs text-muted-foreground">
              Identity remains private • Experience shared safely • Full privacy protection
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => onClose("dismissed")}
            className="w-24 h-9 rounded-lg border-border text-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            className="w-24 h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
