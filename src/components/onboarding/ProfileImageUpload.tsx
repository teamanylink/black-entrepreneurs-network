import { useState } from "react";
import { Camera } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ProfileImageUploadProps {
  onImageSelect: (file: File) => void;
}

export const ProfileImageUpload = ({ onImageSelect }: ProfileImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      onImageSelect(file);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Profile Image</Label>
      <div className="flex items-center justify-center">
        <label
          htmlFor="profile-image"
          className="relative cursor-pointer rounded-full bg-muted p-8 hover:bg-muted/80 transition-colors"
        >
          <Camera className="w-8 h-8" />
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
      {selectedImage && (
        <p className="text-sm text-center text-muted-foreground">
          Selected: {selectedImage.name}
        </p>
      )}
    </div>
  );
};