"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { EyeOff, Loader } from "lucide-react";
import { Eye } from "lucide-react";

export default function Inscription() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confidentialChecked, setConfidentialChecked] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started");

    setCheckboxError("");
    if (!confidentialChecked || !policyChecked) {
      setCheckboxError(
        "Vous devez accepter la confidentialité des données clients, la politique de confidentialité et les conditions d'utilisation."
      );
      console.log("Checkbox validation failed");
      return;
    }

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
      console.log("Sending registration request with data:", formData);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Registration response:", data);

      if (response.ok) {
        setIsModalOpen(true);
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
      console.error("Erreur lors de l'inscription:", error);
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

    if (!formData.gender) {
      newErrors.gender = "Le genre est requis";
      console.log("Gender validation failed");
    }
    if (!formData.email) {
      newErrors.email = "L'email est requis";
      console.log("Email validation failed");
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      console.log("Password validation failed");
    }
    if (!formData.firstname) {
      newErrors.firstname = "Le prénom est requis";
      console.log("Firstname validation failed");
    }
    if (!formData.lastname) {
      newErrors.lastname = "Le nom est requis";
      console.log("Lastname validation failed");
    }
    if (!formData.phone) {
      newErrors.phone = "Le téléphone est requis";
      console.log("Phone validation failed");
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
      console.log("Email format validation failed");
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      console.log("Password length validation failed");
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
      const response = await fetch("/api/auth/register/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...formData,
            code,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Inscription réussie ! Redirection...", {
          style: { color: "#10B981" },
          position: "top-right",
        });
        setTimeout(() => router.push("/connexion"), 2000);
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

  return (
    <div className="min-h-[calc(100vh-100px)] py-12 bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] bg-white rounded-[10px] shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-black/60 hover:text-black transition-colors cursor-pointer hover:bg-black/10 p-2 rounded-full"
          >
            <IoMdArrowBack size={24} />
          </button>
          <h1 className="text-2xl font-bold text-black/70">Inscription</h1>
        </div>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-[10px]">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black/60 mb-2">
                  Genre <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className={`w-full px-4 py-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-200"
                  } rounded-[10px] focus:outline-none focus:border-[#FFCD00]`}
                >
                  <option value="">Sélectionnez votre genre</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black/60 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, firstname: e.target.value })
                    }
                    className={`w-full px-4 py-2 border ${
                      errors.firstname ? "border-red-500" : "border-gray-200"
                    } rounded-[10px] focus:outline-none focus:border-[#FFCD00]`}
                    placeholder="Entrez votre prénom"
                  />
                  {errors.firstname && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstname}</p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black/60 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                    className={`w-full px-4 py-2 border ${
                      errors.lastname ? "border-red-500" : "border-gray-200"
                    } rounded-[10px] focus:outline-none focus:border-[#FFCD00]`}
                    placeholder="Entrez votre nom"
                  />
                  {errors.lastname && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastname}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black/60 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-[10px] focus:outline-none focus:border-[#FFCD00]`}
                  placeholder="Entrez votre email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black/60 mb-2">
                  Téléphone <span className="text-red-500">*</span>
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
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black/60 mb-2">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`w-full px-4 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } rounded-[10px] focus:outline-none focus:border-[#FFCD00]`}
                    placeholder="Entrez votre mot de passe"
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black/60 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-[10px] focus:outline-none focus:border-[#FFCD00]"
                  placeholder="Entrez votre adresse"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black/60 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-[10px] focus:outline-none focus:border-[#FFCD00]"
                    placeholder="Ville"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/60 mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-[10px] focus:outline-none focus:border-[#FFCD00]"
                    placeholder="Code postal"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="confidential"
                checked={confidentialChecked}
                onChange={(e) => setConfidentialChecked(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="confidential" className="text-sm text-black/60">
                J&apos;accepte la confidentialité des données clients
              </label>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="policy"
                checked={policyChecked}
                onChange={(e) => setPolicyChecked(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="policy" className="text-sm text-black/60">
                J&apos;accepte la politique de confidentialité et les conditions
                d&apos;utilisation
              </label>
            </div>

            {checkboxError && (
              <p className="text-sm text-red-500">{checkboxError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-[#FFCD00] text-black font-bold py-3 rounded-[10px] hover:bg-black hover:text-[#FFCD00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Inscription en cours...</span>
              </div>
            ) : (
              "S'inscrire"
            )}
          </button>

          <p className="text-center text-sm text-black/60">
            Déjà inscrit ?{" "}
            <Link href="/connexion" className="text-[#FFCD00] hover:underline">
              Se connecter
            </Link>
          </p>
        </form>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
    </div>
  );
}
