import React from "react";

export const About = () => {
  return (
    <div className="flex flex-col items-center py-5">
      <h1>À Propos du projet</h1>
      <p className="text-center  py-5">
        La mobilité urbaine est une nécessitée pour les citoiyens et citoyennes de notre ville. <br />
        Notre mission est de vous procurer le plus d'informations pour mieux planifier vos déplacements à l'intérieur de la ville.
      </p>
      <img
        style={{ height: "400px", width: "500px" }}
        src="/assets/a-propos.jpg"
        alt="vélo de proche"
      />
      <p>
        Photo de Tony, <a href="https://www.pexels.com/photo/black-mountain-bicycle-990113/" className="custom-button italic underline font-thin" aria-label="Voir sur Pexels" target="_blank" rel="noreferrer">Voir sur Pexels</a>
      </p>
      <p className="text-center py-5">
        Nous vous proposons une série d'informations qu'on souhaite vous être utile pour vos déplacement quotidients en vélo. <br />
        On vous encourage fortement à penser à planifier vos déplacements à l'avance et de limiter votre empreinte carbonique <br />
        tout en vous gardant en forme!      
      </p>
      <div className="h-24"></div>
    </div>
  );
};

export default About;
