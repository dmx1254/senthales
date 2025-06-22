"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { Eye, EyeOff, Loader } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MotDePasseOublie() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started");

    const isValid = validateForm();
    console.log("Form validation result:", isValid);
    console.log("Current form data:", formData);
    console.log("Current errors:", errors);

    if (!isValid) {
      console.log("Form validation failed");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Sending forgot password request with data:", formData);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await response.json();
      console.log("Forgot password response:", data);

      if (response.ok) {
        setIsOtpModalOpen(true);
        toast.success("Code de vérification envoyé avec succès", {
          style: { color: "#10B981" },
          position: "top-right",
        });
      } else {
        toast.error(data.error || "Une erreur est survenue", {
          style: { color: "#EF4444" },
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du code:", error);
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue",
        {
          style: { color: "#EF4444" },
          position: "top-right",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    console.log("Starting form validation");

    if (!formData.phone) {
      newErrors.phone = "Le numéro de téléphone est requis";
      console.log("Phone validation failed");
    }

    // Validation du numéro de téléphone sénégalais
    if (formData.phone) {
      console.log("Validating phone number:", formData.phone);
      // Nettoyer le numéro de téléphone (enlever les espaces, tirets, etc.)
      const cleanPhone = formData.phone.replace(/[\s-]/g, '');
      
      // Si le numéro ne commence pas par +221, l'ajouter
      let formattedPhone = cleanPhone;
      if (!cleanPhone.startsWith('+221')) {
        // Si le numéro commence par 221, ajouter le +
        if (cleanPhone.startsWith('221')) {
          formattedPhone = '+' + cleanPhone;
        } else {
          // Sinon, ajouter +221
          formattedPhone = '+221' + cleanPhone;
        }
      }

      // Vérifier si le numéro a le bon format
      const digitsAfterPrefix = formattedPhone.slice(4); // Prend tout après le +221
      if (digitsAfterPrefix.length !== 9 || !/^\d{9}$/.test(digitsAfterPrefix)) {
        newErrors.phone = "Le numéro de téléphone doit contenir 9 chiffres après le +221";
        console.log("Phone format validation failed:", {
          digitsAfterPrefix,
          length: digitsAfterPrefix.length,
          isDigits: /^\d{9}$/.test(digitsAfterPrefix)
        });
      } else {
        // Mettre à jour le numéro formaté
        setFormData(prev => ({ ...prev, phone: formattedPhone }));
        console.log("Phone number formatted successfully:", formattedPhone);
      }
    }

    setErrors(newErrors);
    console.log("Form validation complete. Errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyCode = async () => {
    const code = otpCode.join("");
    if (code.length !== 6) {
      toast.error("Veuillez entrer le code complet", {
        style: { color: "#EF4444" },
        position: "top-right",
      });
      return;
    }

    try {
      setIsVerifying(true);
      const response = await fetch("/api/auth/forgot-password/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.phone,
          code,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsCodeVerified(true);
        setIsOtpModalOpen(false);
        setIsResetModalOpen(true);
        toast.success("Code vérifié avec succès", {
          style: { color: "#10B981" },
          position: "top-right",
        });
      } else {
        toast.error(data.errorMessage || "Code invalide", {
          style: { color: "#EF4444" },
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue",
        {
          style: { color: "#EF4444" },
          position: "top-right",
        }
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.password || !formData.confirmPassword) {
      toast.error("Veuillez remplir tous les champs", {
        style: { color: "#EF4444" },
        position: "top-right",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas", {
        style: { color: "#EF4444" },
        position: "top-right",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères", {
        style: { color: "#EF4444" },
        position: "top-right",
      });
      return;
    }

    try {
      setIsResetting(true);
      const response = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Mot de passe réinitialisé avec succès !", {
          style: { color: "#10B981" },
          position: "top-right",
        });
        setTimeout(() => router.push("/connexion"), 2000);
      } else {
        toast.error(data.errorMessage || "Erreur lors de la réinitialisation", {
          style: { color: "#EF4444" },
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue",
        {
          style: { color: "#EF4444" },
          position: "top-right",
        }
      );
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] py-12 bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] bg-white rounded-[10px] shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-black/60 hover:text-black transition-colors cursor-pointer hover:bg-black/10 p-2 rounded-full"
          >
            <IoMdArrowBack size={24} />
          </button>
          <h1 className="text-2xl font-bold text-black/70">Mot de passe oublié</h1>
        </div>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-[10px]">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black/60 mb-2">
              Numéro de téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                // Nettoyer l'entrée pour n'accepter que les chiffres, + et -
                const value = e.target.value.replace(/[^\d+-]/g, '');
                setFormData({ ...formData, phone: value });
              }}
              className={`w-full px-4 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-200"
              } rounded-[10px] focus:outline-none focus:border-[#FFCD00]`}
              placeholder="Ex: +221778417586"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Format attendu: +221 suivi de 9 chiffres (ex: +221778417586)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-[#FFCD00] text-black font-bold py-3 rounded-[10px] hover:bg-black hover:text-[#FFCD00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Envoi en cours...</span>
              </div>
            ) : (
              "Envoyer le code"
            )}
          </button>

          <p className="text-center text-sm text-black/60">
            <Link href="/connexion" className="text-[#FFCD00] hover:underline">
              Retour à la connexion
            </Link>
          </p>
        </form>
      </div>

      {/* Modal pour la vérification du code OTP */}
      <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              Vérification du numéro
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Entrez le code de vérification envoyé à votre numéro de téléphone
            </DialogDescription>
          </DialogHeader>

          <div className="my-8">
            <div className="flex justify-center gap-2">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`otp-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-[#FFCD00] focus:outline-none"
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={handleVerifyCode}
              disabled={isVerifying}
              className="w-full cursor-pointer bg-[#FFCD00] text-black font-bold py-3 rounded-[10px] hover:bg-black hover:text-[#FFCD00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Vérification en cours...</span>
                </div>
              ) : (
                "Vérifier"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal pour la réinitialisation du mot de passe */}
      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              Réinitialisation du mot de passe
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Veuillez entrer votre nouveau mot de passe
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-8">
            <div>
              <label className="block text-sm font-medium text-black/60 mb-2">
                Nouveau mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-[10px] focus:outline-none focus:border-[#FFCD00]"
                  placeholder="Entrez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {isPasswordVisible ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black/60 mb-2">
                Confirmer le mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-[10px] focus:outline-none focus:border-[#FFCD00]"
                  placeholder="Confirmez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {isConfirmPasswordVisible ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={handleResetPassword}
              disabled={isResetting}
              className="w-full cursor-pointer bg-[#FFCD00] text-black font-bold py-3 rounded-[10px] hover:bg-black hover:text-[#FFCD00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResetting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Réinitialisation en cours...</span>
                </div>
              ) : (
                "Réinitialiser le mot de passe"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}