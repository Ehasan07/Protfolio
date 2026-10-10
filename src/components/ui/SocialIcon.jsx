import { FaGithub, FaLinkedinIn, FaWhatsapp, FaFacebookF } from "react-icons/fa6";
import { IdCard, Mail, Phone } from "lucide-react";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  facebook: FaFacebookF,
  card: IdCard,
  email: Mail,
  phone: Phone,
};

export default function SocialIcon({ id, className = "h-4 w-4" }) {
  const Icon = ICONS[id] ?? Mail;
  return <Icon aria-hidden className={className} />;
}
