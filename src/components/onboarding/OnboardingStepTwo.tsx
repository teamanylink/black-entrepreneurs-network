import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { SocialLinksForm, type SocialLinks } from "./SocialLinksForm";

interface OnboardingStepTwoProps {
  onComplete: () => void;
}

export const OnboardingStepTwo = ({ onComplete }: OnboardingStepTwoProps) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    website: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to complete your profile.",
        });
        return;
      }

      let profileImageUrl = null;

      if (profileImage) {
        const fileExt = profileImage.name.split(".").pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("profile_images")
          .upload(filePath, profileImage, {
            upsert: true
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
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

      const { error: updateError } = await supabase
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

      if (updateError) {
        console.error("Profile update error:", updateError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save your profile. Please try again.",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
      onComplete();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfileImageUpload onImageSelect={setProfileImage} />
      <SocialLinksForm socialLinks={socialLinks} onChange={setSocialLinks} />
      <Button type="submit" className="w-full" disabled={isUploading}>
        {isUploading ? "Saving..." : "Complete Profile"}
      </Button>
    </form>
  );
};