import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Link, Github, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

interface ProfileCardProps {
  children: React.ReactNode;
  profile: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    profile_image_url?: string | null;
    linkedin_url?: string | null;
    twitter_url?: string | null;
    facebook_url?: string | null;
    instagram_url?: string | null;
    website_url?: string | null;
  };
}

export const ProfileCard = ({ children, profile }: ProfileCardProps) => {
  const fullName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ") || "Anonymous User";

  const socialLinks = [
    { url: profile.linkedin_url, icon: Linkedin, label: "LinkedIn" },
    { url: profile.twitter_url, icon: Twitter, label: "Twitter" },
    { url: profile.facebook_url, icon: Facebook, label: "Facebook" },
    { url: profile.instagram_url, icon: Instagram, label: "Instagram" },
    { url: profile.website_url, icon: Link, label: "Website" },
  ].filter((link) => link.url);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile.profile_image_url || ""} />
            <AvatarFallback>{fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{fullName}</h4>
            <div className="flex items-center pt-2">
              <MapPin className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                San Francisco, CA
              </span>
            </div>
          </div>
        </div>
        {socialLinks.length > 0 && (
          <div className="flex gap-2 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};