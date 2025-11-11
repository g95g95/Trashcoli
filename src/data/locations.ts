import { UrbexLocation } from '../types';

export const initialLocations: UrbexLocation[] = [
  {
    id: 'ex-cartiera-papale',
    name: 'Ex Cartiera Papale',
    municipality: 'Ascoli Piceno',
    coordinates: [42.8558, 13.5789],
    originUse: 'Complesso industriale per la lavorazione della carta',
    description:
      'Un labirinto di sale e macchinari che raccontano secoli di produzione. Oggi la natura si è ripresa i capannoni, lasciando scorci affascinanti e dal sapore post-industriale.',
    accessInfo:
      'Ingresso dal sentiero lungo il Castellano. Attenzione a pavimenti sconnessi e recinzioni danneggiate: serve calzatura robusta e torcia affidabile.',
    abandonmentLevel: 'Avanzato',
    photoGallery: [
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad'
    ],
    tips:
      'Le prime luci del mattino filtrano tra le finestre rotte creando giochi di luce perfetti per gli scatti.'
  },
  {
    id: 'manicomio-santa-maria',
    name: 'Complesso Psichiatrico Santa Maria',
    municipality: 'Folignano',
    coordinates: [42.8172, 13.6417],
    originUse: 'Struttura sanitaria psichiatrica dismessa',
    description:
      'Corridoi lunghissimi, archivi abbandonati e un teatro interno che sembra pronto a riprendere la scena. Atmosfera intensa, ideale per reportage fotografici narrativi.',
    accessInfo:
      'Accesso da un varco sul retro, oggi privo del cancello. Portare mascherina antipolvere: molte stanze ospitano muffe e detriti.',
    abandonmentLevel: 'Estremo',
    photoGallery: [
      'https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2',
      'https://images.unsplash.com/photo-1523419409543-0c1df022bdd1'
    ],
    tips: 'Il teatro centrale offre un punto di vista scenografico, ma attenzione ai ballatoi instabili.'
  },
  {
    id: 'villino-liberty',
    name: 'Villino Liberty sul Tronto',
    municipality: 'Castel di Lama',
    coordinates: [42.8537, 13.6974],
    originUse: 'Residenza privata in stile liberty',
    description:
      'Affreschi consumati e vetrate colorate creano un contrasto poetico con le erbacce che invadono le stanze. Un set perfetto per chi ama l’estetica decadente.',
    accessInfo:
      'Il cancello principale è serrato, ma lungo il lato nord una recinzione cedevole permette il passaggio. Consigliato ingresso in piccoli gruppi per non attirare l’attenzione.',
    abandonmentLevel: 'Moderato',
    photoGallery: [
      'https://images.unsplash.com/photo-1467987506553-8f3916508521',
      'https://images.unsplash.com/photo-1505842475344-81f8b84b9b8f'
    ],
    tips:
      'La scala a chiocciola è fragile: osservare dal basso è già sufficiente per cogliere la magia del luogo.'
  }
];
