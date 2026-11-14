import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Smiley from './components/Smiley';
import Surprise from './components/Surprise';
import './App.css';

function App() {
  const [view, setView] = useState('home');

  return (
    <main className="app">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            className="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {view === 'home' && (
              <>
                <Smiley />
                <h1>Feeling curious?</h1>
                <p>Do you want to be surprised by Smajla?</p>

                <div className="buttons">
                  <button onClick={() => setView('surprise')}>YES!</button>

                  <button className="no-button" onClick={() => setView('sad')}>
                    NO..
                  </button>
                </div>
              </>
            )}

            {view === 'surprise' && (
              <>
                <Surprise />
                <button onClick={() => setView('home')}>AGAIN!</button>
              </>
            )}

            {view === 'sad' && (
              <>
                <Smiley mood="sad" />
                <h1>Oh no...</h1>
                <p>Are you really sure?</p>
                <button onClick={() => setView('home')}>
                  Let me try again
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

export default App;
