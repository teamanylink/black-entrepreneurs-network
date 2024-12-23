import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  website: string;
}

interface SocialLinksFormProps {
  socialLinks: SocialLinks;
  onChange: (links: SocialLinks) => void;
}

export const SocialLinksForm = ({ socialLinks, onChange }: SocialLinksFormProps) => {
  return (
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
              onChange({ ...socialLinks, linkedin: e.target.value })
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
              onChange({ ...socialLinks, twitter: e.target.value })
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
              onChange({ ...socialLinks, facebook: e.target.value })
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
              onChange({ ...socialLinks, instagram: e.target.value })
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
              onChange({ ...socialLinks, website: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};