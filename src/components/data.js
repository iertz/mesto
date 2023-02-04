const ergakiImage = new URL('../images/ergaki.jpg', import.meta.url);
const kamchatkaImage = new URL('../images/kamchatka.jpg', import.meta.url);
const karachaevoImage = new URL('../images/karachaevocherkessia.jpg', import.meta.url);
const manpupunerImage = new URL('../images/manpupuner.jpeg', import.meta.url);
const smolenskImage = new URL('../images/smolensk.jpg', import.meta.url);
const peterburgImage = new URL('../images/stpetersburg.jpg', import.meta.url);





export const initialCards = [
  {
    name: 'Ергаки',
    link: ergakiImage
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
  },
  {
    name: 'Карачаево-Черкессия',
    link: karachaevoImage
  },
  {
    name: 'Маньпупунёр',
    link: manpupunerImage
  },
  {
    name: 'Смоленск',
    link: smolenskImage
  },
  {
    name: 'Санкт-Петербург',
    link: peterburgImage
  },
];