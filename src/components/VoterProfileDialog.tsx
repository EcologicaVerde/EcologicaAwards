import * as React from "react";
import { Upload, Link as LinkIcon, Trash2, Check } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { useLanguage } from "@/i18n/LanguageContext";
import type { VoterProfile } from "@/types/awards";

interface VoterProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: VoterProfile;
  onSave: (profile: VoterProfile) => void;
}

function resizeImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read_error"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("image_error"));
      img.onload = () => {
        const size = 256;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
        resolve(canvas.toDataURL("image/png", 0.92));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const VoterProfileDialog: React.FC<VoterProfileDialogProps> = ({
  open,
  onOpenChange,
  profile,
  onSave,
}) => {
  const { t } = useLanguage();
  const [username, setUsername] = React.useState(profile.username);
  const [avatar, setAvatar] = React.useState<string | null>(profile.avatar);
  const [avatarUrlInput, setAvatarUrlInput] = React.useState("");
  const [showUrlInput, setShowUrlInput] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setUsername(profile.username);
      setAvatar(profile.avatar);
      setAvatarUrlInput("");
      setShowUrlInput(false);
      setUploadError(null);
    }
  }, [open, profile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError(t.profileDialog.invalidImageType);
      return;
    }
    try {
      setUploadError(null);
      const dataUrl = await resizeImageToDataUrl(file);
      setAvatar(dataUrl);
    } catch {
      setUploadError(t.profileDialog.invalidImageProcess);
    }
  };

  const handleApplyUrl = () => {
    const trimmed = avatarUrlInput.trim();
    if (!trimmed) return;
    setAvatar(trimmed);
    setShowUrlInput(false);
    setAvatarUrlInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      username: username.trim() || t.defaultUsername,
      avatar,
    });
    onOpenChange(false);
  };

  const initials = (username.trim() || t.defaultUsername)
    .slice(0, 2)
    .toUpperCase();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t.profileDialog.title}
      description={t.profileDialog.description}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-4 rounded-lg border border-[#1e1e21] bg-[#0c0c0d] p-4">
          <Avatar
            src={avatar}
            fallback={initials}
            size="xl"
            className="ring-2 ring-[#4caf50]/35 ring-offset-2 ring-offset-[#0c0c0d]"
          />

          <div className="flex flex-1 flex-col gap-2">
            <p className="text-xs font-medium text-[#e4e4e7]">
              {t.profileDialog.avatarImage}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="emeraldSoft"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-3.5 w-3.5" />
                {t.profileDialog.uploadPhoto}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowUrlInput((v) => !v)}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                {t.profileDialog.urlButton}
              </Button>
              {avatar && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setAvatar(null)}
                  className="text-[#8c8c94] hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
            {uploadError && (
              <p className="text-[11px] text-red-400">{uploadError}</p>
            )}
          </div>
        </div>

        {showUrlInput && (
          <div className="flex gap-2">
            <Input
              type="url"
              value={avatarUrlInput}
              onChange={(e) => setAvatarUrlInput(e.target.value)}
              placeholder={t.profileDialog.urlPlaceholder}
              className="text-xs"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleApplyUrl}
              className="h-9 shrink-0"
            >
              {t.profileDialog.apply}
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="voter-username">{t.profileDialog.usernameLabel}</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#66666e]">
              @
            </span>
            <Input
              id="voter-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.defaultUsername}
              maxLength={28}
              className="pl-7"
            />
          </div>
          <p className="text-[11px] text-[#6e6e77]">
            {t.profileDialog.savedNote}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            {t.profileDialog.cancel}
          </Button>
          <Button type="submit">
            <Check className="h-4 w-4" />
            {t.profileDialog.save}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
