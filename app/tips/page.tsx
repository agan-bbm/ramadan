'use client';

import { useLanguage } from '../context/LanguageContext';

export default function Tips() {
  const { t } = useLanguage();

  const tips = [
    {
      title: "Hidratimi",
      description: "Pini shumë ujë gjatë Suhur-it (vaktit të mëngjesit) për të qëndruar të hidratuar gjatë gjithë ditës. Shmangni pijet me kafeinë pasi ato mund të shkaktojnë dehidratim."
    },
    {
      title: "Ushqyerja e Shëndetshme",
      description: "Zgjidhni ushqime të pasura me proteina dhe fibra gjatë Suhur-it. Kjo do t'ju ndihmojë të ndiheni të ngopur për një kohë më të gjatë. Shmangni ushqimet tepër të kripura ose të ëmbla."
    },
    {
      title: "Gjumi i Mjaftueshëm",
      description: "Mundohuni të merrni gjumë të mjaftueshëm duke u shtrirë herët në mbrëmje. Një pushim i shkurtër gjatë ditës mund të ndihmojë gjithashtu në ruajtjen e energjisë."
    },
    {
      title: "Aktiviteti Fizik",
      description: "Zvogëloni aktivitetin intensiv fizik gjatë orëve të nxehta të ditës. Nëse dëshironi të ushtroheni, bëjeni këtë pak para Iftar-it ose pas tij."
    },
    {
      title: "Menaxhimi i Energjisë",
      description: "Planifikoni aktivitetet tuaja më të rëndësishme për orët e mëngjesit kur keni më shumë energji. Shmangni ekspozimin e zgjatur në diell."
    },
    {
      title: "Thyerja e Agjërimit",
      description: "Filloni Iftar-in me hurma dhe ujë, pastaj bëni një pushim të shkurtër para se të konsumoni një vakt të plotë. Kjo ndihmon në parandalimin e mbingarkesës së stomakut."
    },
    {
      title: "Shëndeti Mendor",
      description: "Përdorni Ramazanin si një mundësi për meditim dhe reflektim. Praktikoni mirënjohjen dhe përpiquni të qëndroni pozitiv gjatë ditës."
    },
    {
      title: "Përgatitja e Vakteve",
      description: "Planifikoni dhe përgatisni vaktet tuaja paraprakisht. Kjo kursen energji dhe siguron që të keni ushqime të shëndetshme në dispozicion për Suhur dhe Iftar."
    },
    {
      title: "Ruajtja e Rutinës",
      description: "Mundohuni të mbani një rutinë të qëndrueshme gjatë Ramazanit. Kjo ndihmon trupin tuaj të përshtatet me ndryshimet në modelet e të ngrënit dhe të fjeturit."
    },
    {
      title: "Solidariteti Social",
      description: "Ndani Iftar-in me familjen dhe miqtë kur është e mundur. Solidariteti social është një aspekt i rëndësishëm i Ramazanit."
    }
  ];

  return (
    <div className="tips-container">
      <h1 className="tips-title">Këshilla për Ramazan</h1>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <h2 className="tip-title">{tip.title}</h2>
            <p className="tip-description">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 