import { useState } from 'react';
import { motion } from 'motion/react';

const smileys = {
  happy: [
    '/images/smiley-happy1.png',
    '/images/smiley-happy2.png',
    '/images/smiley-happy3.png',
    '/images/smiley-happy4.png',
  ],
  sad: [
    '/images/smiley-sad1.png',
    '/images/smiley-sad2.png',
    '/images/smiley-sad3.png',
    '/images/smiley-mad1.png',
    '/images/smiley-mad2.png',
    '/images/smiley-mad3.png',
  ],
};

function Smiley({ mood = 'happy' }) {
  const options = smileys[mood] || smileys.happy;

  const [image] = useState(() => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  });

  return (
    <motion.img
      className="smiley"
      src={image}
      alt={`${mood} smiley`}
      initial={{ scale: 0.5, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 180 }}
    />
  );
}

export default Smiley;
