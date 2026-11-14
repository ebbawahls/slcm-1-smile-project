import { useState } from 'react';
import { motion } from 'motion/react';
import Smiley from './Smiley';

const surprises = [
  'You are someone’s favorite person!',
  'Today is your lucky day!',
  'You deserve something nice today!',
  'Surprise! You just made a good choice!',
  'Something wonderful is coming your way!',
];

function Surprise() {
  const [message] = useState(
    () => surprises[Math.floor(Math.random() * surprises.length)],
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      className="surprise-content"
    >
      <Smiley mood="happy" />
      <h1>{message}</h1>
      <p>See? Surprises can be nice.</p>
    </motion.div>
  );
}

export default Surprise;
