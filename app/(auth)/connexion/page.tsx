"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "sonner";
import { Eye, EyeOff, Loader } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Connexion() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "L'email est requis";
    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!response?.ok) {
        if (response?.error?.includes("Adresse E-mail incorrect")) {
          toast.error("Adresse E-mail incorrect", {
            style: { color: "#EF4444" },
            position: "top-right",
          });
        }
        if (response?.error?.includes("Mot de passe incorrect")) {
          toast.error("Mot de passe incorrect", {
            style: { color: "#EF4444" },
            position: "top-right",
          });
        }
        if (response?.error?.includes("Utilisateur banni")) {
          toast.error("Utilisateur banni", {
            style: { color: "#EF4444" },
            position: "top-right",
          });
        }
      } else {
        toast.success("Connexion réussie !", {
          style: { color: "#10B981" },
          position: "top-right",
        });
        setTimeout(() => router.push(callbackUrl), 2000);
      }
    } catch (error) {
      setErrors({ submit: "Erreur lors de la connexion" });
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue",
        { style: { color: "#EF4444" }, position: "top-right" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px] bg-white rounded-[10px] shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-black/60 hover:text-black transition-colors cursor-pointer hover:bg-black/10 p-2 rounded-full"
          >
            <IoMdArrowBack size={24} />
          </button>
          <h1 className="text-2xl font-bold text-black/70">Connexion</h1>
        </div>
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-[10px]">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black/60 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-[10px] focus:outline-none focus:border-[#FFCD00]`}
              placeholder="Entrez votre email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-black/60 mb-2">
              Mot de passe
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-200"} rounded-[10px] focus:outline-none focus:border-[#FFCD00]`}
              placeholder="Entrez votre mot de passe"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-4 top-9 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {isPasswordVisible ? <Eye size={22} /> : <EyeOff size={22} />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <Link
              href="/mot-de-passe-oublie"
              className="text-[#FFCD00] hover:text-black text-sm transition-colors"
            >
              Mot de passe oublié ?
            </Link>
            <Link
              href="/inscription"
              className="text-[#FFCD00] hover:text-black text-sm transition-colors"
            >
              S&apos;inscrire
            </Link>
          </div>
          <button
            type="submit"
            className="w-full flex cursor-pointer items-center justify-center bg-[#FFCD00] text-black px-4 py-2 rounded-[10px] font-medium hover:bg-black hover:text-[#FFCD00] transition-colors duration-300 mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
