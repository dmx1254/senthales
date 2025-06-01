import React from "react";

interface SignupSuccessTemplateProps {
  firstname: string;
  lastname: string;
}

export const SignupSuccessTemplate: React.FC<SignupSuccessTemplateProps> = ({
  firstname,
  lastname,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #FFCD00 0%, #FFCD00 100%)",
          padding: "40px 20px",
          textAlign: "center",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Inscription réussie !
        </h1>
      </div>

      <div
        style={{
          padding: "40px 20px",
          backgroundColor: "#ffffff",
          borderRadius: "0 0 8px 8px",
          border: "1px solid #e5e7eb",
          borderTop: "none",
        }}
      >
        <p
          style={{
            color: "#374151",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Bonjour {firstname} {lastname},
        </p>

        <p
          style={{
            color: "#374151",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Nous sommes ravis de vous accueillir sur senthales. Votre compte a été
          créé avec succès.
        </p>

        <p
          style={{
            color: "#374151",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Si vous avez des questions, n&apos;hésitez pas à nous contacter.
        </p>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "24px",
            marginTop: "24px",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Cet email a été envoyé automatiquement, merci de ne pas y répondre.
          </p>
        </div>
      </div>
    </div>
  );
};
