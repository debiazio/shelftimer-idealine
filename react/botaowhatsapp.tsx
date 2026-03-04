import React, { useState } from "react"

function BotaoWhatsapp() {
  const [isHover, setIsHover] = useState(false)

  const telefone = "554198516332"
  // const telefone = "5541985360075"
  const mensagem = "Olá Idealine! Gostaria de ser atendida por uma consultora sobre os produtos!"
  const href = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`

  const iconUrl =
    "https://mfmgroup.vtexassets.com/assets/vtex.file-manager-graphql/images/b01af4d9-4dc4-49a4-b902-217cf2fbcc20___09fd6f73b641157626626f4bdde27deb.svg"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "50px",
        height: "50px",
        marginBottom: "5px",
        borderRadius: "9999px",
        backgroundColor: "#29A71A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        textDecoration: "none",
        cursor: "pointer",
        opacity: isHover ? 1 : 0.5,
        transition: "opacity 200ms ease, box-shadow 200ms ease",
        boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
      }}
    >
      <img
        src={iconUrl}
        alt=""
        aria-hidden="true"
        style={{
          width: "40px",
          height: "40px",
          display: "block",
        }}
      />
    </a>
  )
}

export default BotaoWhatsapp
