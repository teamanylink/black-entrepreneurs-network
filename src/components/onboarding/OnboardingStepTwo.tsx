import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Camera } from "lucide-react";

interface OnboardingStepTwoProps {
  onComplete: () => void;
}

export const OnboardingStepTwo = ({ onComplete }: OnboardingStepTwoProps) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    website: "",
  });
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let profileImageUrl = null;

    if (profileImage) {
      const fileExt = profileImage.name.split(".").pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("profile_images")
        .upload(filePath, profileImage);

      if (uploadError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to upload profile image. Please try again.",
        });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("profile_images")
        .getPublicUrl(filePath);

      profileImageUrl = publicUrl;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        profile_image_url: profileImageUrl,
        linkedin_url: socialLinks.linkedin || null,
        twitter_url: socialLinks.twitter || null,
        facebook_url: socialLinks.facebook || null,
        instagram_url: socialLinks.instagram || null,
        website_url: socialLinks.website || null,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your profile. Please try again.",
      });
      return;
    }

    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        {profileImage && (
          <p className="text-sm text-center text-muted-foreground">
            Selected: {profileImage.name}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Label>Social Media Links</Label>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={socialLinks.linkedin}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, linkedin: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              type="url"
              placeholder="https://twitter.com/username"
              value={socialLinks.twitter}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, twitter: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              type="url"
              placeholder="https://facebook.com/username"
              value={socialLinks.facebook}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, facebook: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              type="url"
              placeholder="https://instagram.com/username"
              value={socialLinks.instagram}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, instagram: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://example.com"
              value={socialLinks.website}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, website: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Complete Profile
      </Button>
    </form>
  );
};