import Data from '../data/phrases.json'
import React, {FunctionComponent, useEffect, useState} from 'react'

export type Variant = "success" | "danger" | "warning" | undefined

interface IAppProps {
  data?: any;
  subsetData?: any;
  mode?: string;
  category?: string;
  quizMode?: string;
}

const soundsPath = process.env.PUBLIC_URL + '/assets/sounds/';


//TODO set initial state in () below.
export const App:FunctionComponent<IAppProps> = (props) => {
  const initialSubsetData = props.subsetData || Data;
  const initialMode = props.mode || 'english-to-thai';
  const initialQuizMode = props.quizMode || 'easy';

  const [entered, setEntered] = useState('');
  const [displayAnswer, setDisplayAnswer] = useState('');
  const [subsetData, setSubsetData] = useState(initialSubsetData);
  const [pos, setPos] = useState(0);
  const [answer, setAnswer] = useState(initialSubsetData[0]?.thai || '');
  const [currentWord, setCurrentWord] = useState(initialSubsetData[0]?.[initialMode === 'english-to-thai' ? 'english' : 'thai'] || '');
  const [previousWord, setPreviousWord] = useState('');

  const [tries, setTries] = useState(0);
  const [ans, setAns] = useState("warning" as Variant);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shakeAnswer, setShakeAnswer] = useState(false);
  const [bloomAnswer, setBloomAnswer] = useState(false);
  const [soundPath, setSoundPath] = useState<string>('../assets/sounds/beer.m4a')
  const [choices, setChoices] = useState<any[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  // Update subsetData when props change
  useEffect(() => {
    setSubsetData(initialSubsetData);
  }, [initialSubsetData]);

  const getRan = () => {
    return Math.floor(Math.random() * Math.floor(subsetData.length))
  };


  const getSoundPath = (soundsPath:string, newSound:string) => {
    //remove question marks from word, not allowed in filenames
    newSound = newSound.replace(/[?]/g,'');
    let soundPath = soundsPath + newSound + '.m4a';
    return soundPath;
  }

  const generateChoices = (currentIndex: number, correctAnswer: string) => {
    // Get items from same category (or all if default)
    let categoryData = subsetData;
    if (props.category && props.category !== 'default') {
      categoryData = subsetData.filter((item: any) => item.category === props.category);
    }

    // Get the correct answer field based on mode
    const correctAnswerField = initialMode === 'english-to-thai' ? 'thai' : 'english';
    
    // Get 3 random wrong answers from same category
    const wrongAnswers: string[] = [];
    while (wrongAnswers.length < 3) {
      const randomIndex = Math.floor(Math.random() * categoryData.length);
      const randomItem = categoryData[randomIndex];
      const randomAnswer = randomItem[correctAnswerField];
      
      // Make sure it's not the correct answer and not already selected
      if (randomAnswer !== correctAnswer && !wrongAnswers.includes(randomAnswer)) {
        wrongAnswers.push(randomAnswer);
      }
    }

    // Combine correct and wrong answers, then shuffle
    const allChoices: string[] = [correctAnswer, ...wrongAnswers];
    const shuffled = allChoices.sort(() => Math.random() - 0.5);
    
    setChoices(shuffled);
    setSelectedChoice(null);
  };

  const sendAnswer = (e: any) => {
    e.preventDefault();
    setTries(tries + 1);
    
    let userAnswer = '';
    let ans = "";
    
    if (initialQuizMode === 'easy') {
      // Multiple choice mode
      if (selectedChoice === null) return;
      userAnswer = choices[selectedChoice];
    } else {
      // Text input mode
      userAnswer = entered;
      setDisplayAnswer(entered);
    }
    
    if (initialMode === 'english-to-thai') {
      setAnswer(subsetData[pos].thai);
      setPreviousWord(subsetData[pos].english);
      ans = (subsetData[pos].thai === userAnswer) ? "success" : "danger";
    } else {
      setAnswer(subsetData[pos].english);
      setPreviousWord(subsetData[pos].thai);
      ans = (subsetData[pos].english === userAnswer) ? "success" : "danger";
    }
    
    setAns(ans as Variant);
    setShowFeedback(true);

    if (ans === "success") {
      setBloomAnswer(true);
      setTimeout(() => setBloomAnswer(false), 600);
    } else {
      setShakeAnswer(true);
      setTimeout(() => setShakeAnswer(false), 600);
    }
  };

  const handleEasyModeChoice = (index: number) => {
    setSelectedChoice(index);
    // Create a synthetic event for the form submission
    const event = new Event('submit', { bubbles: true });
    setTimeout(() => {
      sendAnswer({ preventDefault: () => {} } as any);
    }, 100);
  };

  const goToNextWord = () => {
    let p = getRan();
    setPos(p);
    setCurrentWord(subsetData[p][initialMode === 'english-to-thai' ? 'english' : 'thai']);
    setSoundPath(getSoundPath(soundsPath, subsetData[p].english));
    setEntered('');
    setDisplayAnswer('');
    setShowFeedback(false);
    setTries(0);
    setSelectedChoice(null);
    
    // Generate choices for easy mode
    if (initialQuizMode === 'easy') {
      const correctAnswer = initialMode === 'english-to-thai' ? subsetData[p].thai : subsetData[p].english;
      generateChoices(p, correctAnswer);
    }
  };

  //TODO update the type to use React.FormEvent<HTMLInputElement>
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
  const handleChange = (event:any) => {
    setEntered(event.currentTarget.value)
  };

  const loadAndPlay = () => {
    let url = soundPath;
    fetch(url)
    .then(response => {
      if (response.status === 200) {
        let aud = new Audio(soundPath);
        aud.play();
      }else if (response.status === 404) {
        alert('Sound clip for this word not found!');
      } else {
        alert(response.statusText);
      }
    });
  }

  //do this then set other things
  useEffect(() => {
    if (subsetData.length > 0) {
      let p = getRan();
      setPos(p);
      setCurrentWord(subsetData[p][initialMode === 'english-to-thai' ? 'english' : 'thai'])
      setSoundPath(getSoundPath(soundsPath, subsetData[p].english));
      
      // Generate choices for easy mode
      if (initialQuizMode === 'easy') {
        const correctAnswer = initialMode === 'english-to-thai' ? subsetData[p].thai : subsetData[p].english;
        generateChoices(p, correctAnswer);
      }
    }
  }, [subsetData, initialMode, initialQuizMode]);

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 border border-white/20">
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">Learn Thai</h2>
              <p className="text-gray-500 text-sm">Translate and master Thai vocabulary</p>
            </div>

            {/* Word to Translate Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 mb-5 border border-blue-200">
              <p className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wide">Translate this word:</p>
              <h3 className="text-4xl font-bold text-blue-600">{currentWord}</h3>
            </div>

            {/* Form */}
            <form onSubmit={sendAnswer} className="space-y-4">
              
              {/* Hard Mode: Text Input */}
              {initialQuizMode === 'hard' && (
                <>
                  {/* Answer Input */}
                  <div>
                    <label htmlFor="answer-input" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Answer
                    </label>
                    <input
                      id="answer-input"
                      type="text"
                      value={entered}
                      onChange={handleChange}
                      placeholder="Type your answer here..."
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                        shakeAnswer 
                          ? 'border-red-400 animate-shake' 
                          : bloomAnswer 
                          ? 'border-green-400 animate-bloom' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      autoFocus
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm"
                  >
                    Check Answer
                  </button>
                </>
              )}

              {/* Easy Mode: Multiple Choice */}
              {initialQuizMode === 'easy' && (
                <>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Choose the correct answer:
                  </label>
                  <div className="space-y-2">
                    {choices.map((choice, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleEasyModeChoice(index)}
                        disabled={showFeedback}
                        className={`w-full py-4 px-4 rounded-lg font-semibold transition-all duration-200 border-2 text-base ${
                          selectedChoice === index && showFeedback
                            ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                            : selectedChoice === index
                            ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Next Word Button - Only show after feedback */}
              {showFeedback && (
                <button
                  type="button"
                  onClick={goToNextWord}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl animate-bounce_in text-sm"
                >
                  Next Word →
                </button>
              )}

              {/* Feedback Alert */}
              {showFeedback && (
                <div
                  className={`p-3 rounded-lg border-l-4 animate-bounce_in text-sm ${
                    ans === 'success'
                      ? 'bg-green-50 border-green-500 text-green-800'
                      : 'bg-red-50 border-red-500 text-red-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 text-lg">
                      {ans === 'success' ? '✓' : '✗'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        {ans === 'success' ? 'Excellent! 🎉' : 'Not quite right'}
                      </p>
                      <p className="text-xs opacity-90 mb-1">
                        <span className="font-semibold">{previousWord}</span> means:
                      </p>
                      <p className="font-bold mb-1">{answer}</p>
                      {ans !== 'success' && (
                        <p className="text-xs opacity-90">
                          You chose: <span className="font-semibold">{initialQuizMode === 'easy' && selectedChoice !== null ? choices[selectedChoice] : displayAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Sound Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={loadAndPlay}
                  className="inline-flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:scale-110 text-sm"
                  title="Play pronunciation"
                >
                  <span className="text-lg">🔊</span>
                  Play Sound
                </button>
              </div>
            </form>

            {/* Stats Footer & Settings Link */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xs text-gray-600">
                <span>Attempts: <span className="font-semibold text-gray-800">{tries}</span></span>
              </div>
              <a
                href="/thai/options"
                className="text-blue-500 hover:text-blue-700 font-semibold text-sm transition-colors"
              >
                ⚙️ Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;
