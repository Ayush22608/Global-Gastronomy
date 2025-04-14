import React, { useState, useEffect } from 'react';

// Types
type Difficulty = 'easy' | 'medium' | 'hard';
type GameStatus = 'menu' | 'playing' | 'gameover' | 'win';

interface Dish {
  id: string;
  name: string;
  emoji: string;
  country: string;
  difficulty: Difficulty;
  fact: string;
}

interface Country {
  id: string;
  name: string;
  emoji: string;
  continent: string;
}

// Game data
const DISHES: Dish[] = [
  // Easy dishes
  { id: 'sushi', name: 'Sushi', emoji: '🍣', country: 'Japan', difficulty: 'easy', fact: 'Sushi originated in Southeast Asia and later spread to Japan' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕', country: 'Italy', difficulty: 'easy', fact: 'Modern pizza originated in Naples, Italy in the late 1700s' },
  { id: 'tacos', name: 'Tacos', emoji: '🌮', country: 'Mexico', difficulty: 'easy', fact: 'Tacos predate European arrival in Mexico' },
  { id: 'curry', name: 'Curry', emoji: '🍛', country: 'India', difficulty: 'easy', fact: 'The word curry comes from Tamil word kari' },
  { id: 'burger', name: 'Hamburger', emoji: '🍔', country: 'United States', difficulty: 'easy', fact: 'Gained popularity at the 1904 St. Louis World Fair' },
  { id: 'croissant', name: 'Croissant', emoji: '🥐', country: 'France', difficulty: 'easy', fact: 'Often eaten for breakfast with coffee in France' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝', country: 'Italy', difficulty: 'easy', fact: 'There are over 300 types of pasta worldwide' },
  { id: 'bratwurst', name: 'Bratwurst', emoji: '🌭', country: 'Germany', difficulty: 'easy', fact: 'Germany has over 1,500 varieties of sausages' },
  { id: 'burrito', name: 'Burrito', emoji: '🌯', country: 'Mexico', difficulty: 'easy', fact: 'Burritos were popularized in California in the 20th century' },
  { id: 'sashimi', name: 'Sashimi', emoji: '🍣', country: 'Japan', difficulty: 'easy', fact: 'Features thinly sliced raw fish or meat' },
  { id: 'fries', name: 'French Fries', emoji: '🍟', country: 'Belgium', difficulty: 'easy', fact: 'Despite the name, they originated in Belgium' },
  { id: 'pancakes', name: 'Pancakes', emoji: '🥞', country: 'United States', difficulty: 'easy', fact: 'Often served with maple syrup for breakfast' },
  { id: 'donuts', name: 'Donuts', emoji: '🍩', country: 'United States', difficulty: 'easy', fact: 'Popularized in America by Dutch immigrants' },
  { id: 'noodles', name: 'Ramen', emoji: '🍜', country: 'Japan', difficulty: 'easy', fact: 'Became popular after World War II in Japan' },
  { id: 'baguette', name: 'Baguette', emoji: '🥖', country: 'France', difficulty: 'easy', fact: 'Traditional long French bread with a crispy crust' },
  
  // Medium dishes
  { id: 'paella', name: 'Paella', emoji: '🥘', country: 'Spain', difficulty: 'medium', fact: 'Traditional paella contains rabbit and snails' },
  { id: 'kimchi', name: 'Kimchi', emoji: '🥬', country: 'South Korea', difficulty: 'medium', fact: 'There are over 200 varieties of kimchi' },
  { id: 'goulash', name: 'Goulash', emoji: '🍲', country: 'Hungary', difficulty: 'medium', fact: 'A hearty stew flavored with paprika' },
  { id: 'moussaka', name: 'Moussaka', emoji: '🍆', country: 'Greece', difficulty: 'medium', fact: 'Layered dish with eggplant, potato and minced meat' },
  { id: 'poutine', name: 'Poutine', emoji: '🍟', country: 'Canada', difficulty: 'medium', fact: 'Consists of fries topped with cheese curds and gravy' },
  { id: 'falafel', name: 'Falafel', emoji: '🧆', country: 'Egypt', difficulty: 'medium', fact: 'Made from ground chickpeas or fava beans' },
  { id: 'pad_thai', name: 'Pad Thai', emoji: '🍜', country: 'Thailand', difficulty: 'medium', fact: 'Stir-fried rice noodle dish typically served as street food' },
  { id: 'pierogi', name: 'Pierogi', emoji: '🥟', country: 'Poland', difficulty: 'medium', fact: 'Dumplings filled with potato, cheese, or sauerkraut' },
  { id: 'empanada', name: 'Empanada', emoji: '🥟', country: 'Argentina', difficulty: 'medium', fact: 'Baked or fried pastry filled with various ingredients' },
  { id: 'schnitzel', name: 'Schnitzel', emoji: '🍗', country: 'Austria', difficulty: 'medium', fact: 'Thin meat cutlet breaded and fried' },
  { id: 'tikka_masala', name: 'Tikka Masala', emoji: '🍛', country: 'United Kingdom', difficulty: 'medium', fact: 'Actually originated in the UK, not India' },
  { id: 'borscht', name: 'Borscht', emoji: '🍲', country: 'Ukraine', difficulty: 'medium', fact: 'Beetroot soup often served with sour cream' },
  { id: 'pavlova', name: 'Pavlova', emoji: '🍰', country: 'New Zealand', difficulty: 'medium', fact: 'Meringue-based dessert named after Russian ballerina' },
  { id: 'ceviche', name: 'Ceviche', emoji: '🐟', country: 'Peru', difficulty: 'medium', fact: 'Raw fish cured in citrus juices with spices' },
  { id: 'bibimbap', name: 'Bibimbap', emoji: '🍚', country: 'South Korea', difficulty: 'medium', fact: 'Rice dish with vegetables, meat, egg and chili paste' },
  
  // Hard dishes
  { id: 'pho', name: 'Pho', emoji: '🍜', country: 'Vietnam', difficulty: 'hard', fact: 'Influenced by both Chinese and French cuisine' },
  { id: 'haggis', name: 'Haggis', emoji: '🥩', country: 'Scotland', difficulty: 'hard', fact: 'Made from sheep organs, oatmeal, suet and spices' },
  { id: 'escargot', name: 'Escargot', emoji: '🐌', country: 'France', difficulty: 'hard', fact: 'Cooked land snails, typically with garlic butter' },
  { id: 'couscous', name: 'Couscous', emoji: '🍚', country: 'Morocco', difficulty: 'hard', fact: 'Small steamed balls of semolina wheat' },
  { id: 'feijoada', name: 'Feijoada', emoji: '🍲', country: 'Brazil', difficulty: 'hard', fact: 'Black bean stew with pork and beef' },
  { id: 'gochujang', name: 'Gochujang', emoji: '🌶️', country: 'South Korea', difficulty: 'hard', fact: 'Fermented chili paste used in Korean cuisine' },
  { id: 'bobotie', name: 'Bobotie', emoji: '🥘', country: 'South Africa', difficulty: 'hard', fact: 'Spiced minced meat baked with an egg topping' },
  { id: 'rendang', name: 'Rendang', emoji: '🥩', country: 'Indonesia', difficulty: 'hard', fact: 'Spicy meat dish from West Sumatra, Indonesia' },
  { id: 'poke', name: 'Poke', emoji: '🐟', country: 'United States', difficulty: 'hard', fact: 'Hawaiian dish with raw fish and various toppings' },
  { id: 'mole', name: 'Mole', emoji: '🧮', country: 'Mexico', difficulty: 'hard', fact: 'Sauce containing chocolate, chili peppers, and spices' },
  { id: 'injera', name: 'Injera', emoji: '🫓', country: 'Ethiopia', difficulty: 'hard', fact: 'Sourdough flatbread used as a base for Ethiopian dishes' },
  { id: 'khachapuri', name: 'Khachapuri', emoji: '🥖', country: 'Georgia', difficulty: 'hard', fact: 'Cheese-filled bread topped with egg' },
  { id: 'poutingi', name: 'Poutingi', emoji: '🧇', country: 'Lebanon', difficulty: 'hard', fact: 'Traditional Lebanese breakfast dessert' },
  { id: 'biltong', name: 'Biltong', emoji: '🥩', country: 'South Africa', difficulty: 'hard', fact: 'Dried, cured meat similar to beef jerky' },
  { id: 'tteokbokki', name: 'Tteokbokki', emoji: '🍡', country: 'South Korea', difficulty: 'hard', fact: 'Spicy rice cakes served as street food' },
  { id: 'arepas', name: 'Arepas', emoji: '🫓', country: 'Venezuela', difficulty: 'hard', fact: 'Flatbread made from ground maize dough' },
  { id: 'vegemite', name: 'Vegemite', emoji: '🍞', country: 'Australia', difficulty: 'hard', fact: 'Salty, savory spread made from yeast extract' },
  { id: 'tamales', name: 'Tamales', emoji: '🫔', country: 'Mexico', difficulty: 'hard', fact: 'Masa dough filled with meat or vegetables, steamed in corn husks' },
  { id: 'churrasco', name: 'Churrasco', emoji: '🥩', country: 'Brazil', difficulty: 'hard', fact: 'Grilled meat prepared in churrascarias' },
  { id: 'congee', name: 'Congee', emoji: '🥣', country: 'China', difficulty: 'hard', fact: 'Rice porridge often eaten for breakfast' }
];

const COUNTRIES: Country[] = [
  { id: 'japan', name: 'Japan', emoji: '🇯🇵', continent: 'Asia' },
  { id: 'italy', name: 'Italy', emoji: '🇮🇹', continent: 'Europe' },
  { id: 'mexico', name: 'Mexico', emoji: '🇲🇽', continent: 'North America' },
  { id: 'india', name: 'India', emoji: '🇮🇳', continent: 'Asia' },
  { id: 'united_states', name: 'United States', emoji: '🇺🇸', continent: 'North America' },
  { id: 'spain', name: 'Spain', emoji: '🇪🇸', continent: 'Europe' },
  { id: 'south_korea', name: 'South Korea', emoji: '🇰🇷', continent: 'Asia' },
  { id: 'vietnam', name: 'Vietnam', emoji: '🇻🇳', continent: 'Asia' },
  { id: 'france', name: 'France', emoji: '🇫🇷', continent: 'Europe' },
  { id: 'thailand', name: 'Thailand', emoji: '🇹🇭', continent: 'Asia' },
  { id: 'germany', name: 'Germany', emoji: '🇩🇪', continent: 'Europe' },
  { id: 'brazil', name: 'Brazil', emoji: '🇧🇷', continent: 'South America' },
  { id: 'hungary', name: 'Hungary', emoji: '🇭🇺', continent: 'Europe' },
  { id: 'greece', name: 'Greece', emoji: '🇬🇷', continent: 'Europe' },
  { id: 'canada', name: 'Canada', emoji: '🇨🇦', continent: 'North America' },
  { id: 'egypt', name: 'Egypt', emoji: '🇪🇬', continent: 'Africa' },
  { id: 'poland', name: 'Poland', emoji: '🇵🇱', continent: 'Europe' },
  { id: 'argentina', name: 'Argentina', emoji: '🇦🇷', continent: 'South America' },
  { id: 'austria', name: 'Austria', emoji: '🇦🇹', continent: 'Europe' },
  { id: 'united_kingdom', name: 'United Kingdom', emoji: '🇬🇧', continent: 'Europe' },
  { id: 'ukraine', name: 'Ukraine', emoji: '🇺🇦', continent: 'Europe' },
  { id: 'new_zealand', name: 'New Zealand', emoji: '🇳🇿', continent: 'Oceania' },
  { id: 'peru', name: 'Peru', emoji: '🇵🇪', continent: 'South America' },
  { id: 'scotland', name: 'Scotland', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', continent: 'Europe' },
  { id: 'morocco', name: 'Morocco', emoji: '🇲🇦', continent: 'Africa' },
  { id: 'south_africa', name: 'South Africa', emoji: '🇿🇦', continent: 'Africa' },
  { id: 'indonesia', name: 'Indonesia', emoji: '🇮🇩', continent: 'Asia' },
  { id: 'ethiopia', name: 'Ethiopia', emoji: '🇪🇹', continent: 'Africa' },
  { id: 'georgia', name: 'Georgia', emoji: '🇬🇪', continent: 'Europe' },
  { id: 'lebanon', name: 'Lebanon', emoji: '🇱🇧', continent: 'Asia' },
  { id: 'venezuela', name: 'Venezuela', emoji: '🇻🇪', continent: 'South America' },
  { id: 'australia', name: 'Australia', emoji: '🇦🇺', continent: 'Oceania' },
  { id: 'china', name: 'China', emoji: '🇨🇳', continent: 'Asia' },
  { id: 'belgium', name: 'Belgium', emoji: '🇧🇪', continent: 'Europe' }
];

// Main game component
const Game: React.FC = () => {
  // State
  const [status, setStatus] = useState<GameStatus>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('foodGameHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [currentDish, setCurrentDish] = useState<Dish | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [timeLeft, setTimeLeft] = useState(0);
  const [usedDishIds, setUsedDishIds] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // Add state for custom confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Start a new game
  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setRoundsPlayed(0);
    setStreak(0);
    setMaxStreak(0);
    
    // Set different time limits based on difficulty
    const timeLimit = selectedDifficulty === 'easy' ? 15 : 
                     selectedDifficulty === 'medium' ? 10 : 5;
    setTimeLeft(timeLimit);
    
    setStatus('playing');
    setUsedDishIds([]); // Reset used dishes
    generateQuestion();
  };
  
  // Generate a new question
  const generateQuestion = () => {
    // Filter dishes by difficulty
    const availableDishes = DISHES.filter(dish => {
      // Filter by difficulty
      let difficultyMatches = false;
      if (difficulty === 'easy') difficultyMatches = dish.difficulty === 'easy';
      else if (difficulty === 'medium') difficultyMatches = ['easy', 'medium'].includes(dish.difficulty);
      else difficultyMatches = true; // hard difficulty includes all dishes
      
      // Filter out already used dishes
      const notUsed = !usedDishIds.includes(dish.id);
      
      return difficultyMatches && notUsed;
    });
    
    // If we're running out of dishes, reset the used dishes (should only happen in very long games)
    if (availableDishes.length === 0) {
      setUsedDishIds([]);
      // Try again with reset used dishes
      generateQuestion();
      return;
    }
    
    // Select a random dish
    const randomDish = availableDishes[Math.floor(Math.random() * availableDishes.length)];
    setCurrentDish(randomDish);
    
    // Mark dish as used
    setUsedDishIds(prev => [...prev, randomDish.id]);
    
    // Find correct country
    const correctCountry = COUNTRIES.find(c => c.name === randomDish.country);
    if (!correctCountry) return; // Safety check
    
    // Get 3 random wrong countries
    const wrongCountries = COUNTRIES
      .filter(c => c.name !== randomDish.country)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // Combine and shuffle options
    const allOptions = [correctCountry, ...wrongCountries].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setShowFact(false);
  };
  
  // Handle answer selection
  const handleAnswer = (country: Country) => {
    if (!currentDish || showFact) return;
    
    // Stop the timer immediately when an answer is selected
    clearAllTimers();
    
    // Store the selected answer
    setSelectedAnswer(country.name);
    const isCorrect = country.name === currentDish.country;
    
    // Update score
    if (isCorrect) {
      // Add bonus points for fast answers
      const timeBonus = Math.ceil(timeLeft * 0.5);
      const difficultyPoints = difficulty === 'easy' ? 10 : 
                               difficulty === 'medium' ? 20 : 30;
      const totalPoints = difficultyPoints + timeBonus;
      
      // Update score with the calculated points
      setScore(prevScore => {
        const newScore = prevScore + totalPoints;
        return newScore;
      });
      
      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
    } else {
      // Reset streak on wrong answer
      setStreak(0);
    }
    
    // Show fact
    setShowFact(true);
    
    // Prepare for next question
    setTimeout(() => {
      const newRoundsPlayed = roundsPlayed + 1;
      setRoundsPlayed(newRoundsPlayed);
      setSelectedAnswer(null);
      
      if (newRoundsPlayed >= 10) {
        // Game over after 10 rounds
        setStatus('win');
      } else {
        // Continue to next question with new time limit
        const timeLimit = difficulty === 'easy' ? 15 : 
                         difficulty === 'medium' ? 10 : 5;
        setTimeLeft(timeLimit);
        generateQuestion();
      }
    }, 2000);
  };
  
  // Update high score when game ends
  useEffect(() => {
    // Only check for high score update when the game ends (win or game over)
    if (status === 'win' || status === 'gameover') {
      // Update high score if needed
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('foodGameHighScore', score.toString());
        console.log(`New high score saved: ${score}`);
      }
    }
  }, [status, score, highScore]);

  // Create a function to clear all timers
  const clearAllTimers = () => {
    // This function will be used to clear any active timers
    // when the game state changes or answer is selected
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
      window.clearTimeout(i);
    }
  };
  
  // Timer effect
  useEffect(() => {
    let timer: number | undefined;
    
    if (status === 'playing' && timeLeft > 0 && !showFact) {
      timer = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setStatus('gameover');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status, timeLeft, showFact]);

  // Render menu screen
  const renderMenu = () => (
    <div className="p-6 text-center">
      <h1 className="text-5xl font-bold mb-6 text-indigo-700 drop-shadow-md">Global Gastronomy</h1>
      <p className="mb-8 text-gray-600 max-w-md mx-auto">
        Test your knowledge of world cuisine! Match traditional dishes to their countries of origin.
      </p>
      
      <div className="space-y-4 mb-8">
        <button 
          onClick={() => startGame('easy')}
          className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg transform hover:scale-105"
        >
          Easy Mode - 15 seconds per dish
        </button>
        
        <button 
          onClick={() => startGame('medium')}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg transform hover:scale-105"
        >
          Medium Mode - 10 seconds per dish
        </button>
        
        <button 
          onClick={() => startGame('hard')}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105"
        >
          Hard Mode - 5 seconds per dish
        </button>
      </div>
      
      {highScore > 0 && (
        <div className="text-gray-600 font-semibold p-3 bg-amber-100 rounded-lg">
          <span className="text-amber-600 mr-2">🏆</span> High Score: {highScore}
        </div>
      )}
    </div>
  );

  // Render gameplay screen
  const renderGame = () => {
    if (!currentDish) return null;
    
    // Calculate the maximum time based on difficulty
    const maxTime = difficulty === 'easy' ? 15 : 
                   difficulty === 'medium' ? 10 : 5;
    
    return (
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl shadow-md">
          <div>
            <h2 className="text-xl font-bold text-indigo-700">Food Quiz</h2>
            <div className="text-indigo-500 font-medium">Level: {difficulty}</div>
          </div>
          
          <div className="text-center bg-white px-4 py-2 rounded-lg shadow">
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-2xl font-bold text-indigo-600">{score}</div>
          </div>
          
          <div className="text-center bg-white px-4 py-2 rounded-lg shadow">
            <div className="text-sm text-gray-600">Round</div>
            <div className="text-2xl font-bold text-indigo-600">{roundsPlayed + 1}/10</div>
          </div>
        </div>
        
        {/* Timer */}
        <div className="mb-4 bg-white p-2 rounded-lg shadow-md">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500" 
              style={{ width: `${(timeLeft / maxTime) * 100}%`, transition: 'width 1s linear' }}
            />
          </div>
          <div className="text-center text-sm text-gray-500 mt-1">Time: {timeLeft}s</div>
        </div>
        
        {/* Dish display */}
        <div className="mb-8 text-center bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-lg border border-amber-200">
          <div className="text-6xl md:text-7xl mb-4 transform hover:scale-110 transition-transform">{currentDish.emoji}</div>
          <h3 className="text-2xl font-bold text-amber-800 mb-2">{currentDish.name}</h3>
          <p className="text-gray-600">Which country is this dish from?</p>
        </div>
        
        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map(country => (
            <button
              key={country.id}
              onClick={() => handleAnswer(country)}
              disabled={showFact}
              className={`p-4 rounded-xl shadow-md transition-all ${
                showFact 
                  ? country.name === currentDish.country
                    ? 'bg-green-100 border-2 border-green-500' 
                    : country.name === selectedAnswer
                      ? 'bg-red-100 border-2 border-red-500'
                      : 'bg-gray-100 opacity-70'
                  : 'bg-white hover:bg-indigo-50 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{country.emoji}</span>
                <span className="text-lg font-medium">{country.name}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Show fact when answered */}
        {showFact && (
          <div className={`p-4 rounded-lg mb-4 text-center border-2 ${
            selectedAnswer === currentDish.country 
              ? 'bg-green-100 text-green-800 border-green-500'
              : 'bg-red-100 text-red-800 border-red-500'
          }`}>
            <p className="font-medium mb-2">
              {selectedAnswer === currentDish.country
                ? '✅ Correct!'
                : `❌ Wrong! ${currentDish.name} is from ${currentDish.country}`
              } {COUNTRIES.find(c => c.name === currentDish.country)?.emoji}
            </p>
            <p className="text-sm">{currentDish.fact}</p>
          </div>
        )}
        
        {/* Main menu button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow"
          >
            Main Menu
          </button>
        </div>
        
        {/* Streak indicator */}
        {streak > 1 && (
          <div className="fixed bottom-4 right-4 bg-gradient-to-r from-amber-500 to-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse shadow-lg">
            {streak} in a row! 🔥
          </div>
        )}
        
        {/* Custom Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform transition-all animate-fadeIn">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">Return to Main Menu?</h3>
              <p className="text-gray-600 mb-6">Your current progress will be lost. Are you sure you want to exit?</p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowConfirmModal(false);
                    setStatus('menu');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render game over screen
  const renderGameOver = () => (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-red-600">Game Over!</h2>
      
      <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <p className="text-xl text-gray-700 mb-2">Time's up!</p>
        <p className="text-3xl font-bold text-indigo-600">Score: {score}</p>
      </div>
      
      {score > highScore && (
        <div className="py-4 px-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg mb-8 shadow-md">
          <p className="text-yellow-700 font-bold text-2xl">
            New High Score! 🏆
          </p>
        </div>
      )}
      
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => startGame(difficulty)}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg transform hover:scale-105"
        >
          Try Again
        </button>
        
        <button
          onClick={() => setStatus('menu')}
          className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors shadow"
        >
          Main Menu
        </button>
      </div>
    </div>
  );

  // Render win screen
  const renderWin = () => (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-indigo-600">Congratulations!</h2>
      
      <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <p className="text-xl text-gray-700 mb-2">You completed all rounds!</p>
        <p className="text-3xl font-bold text-indigo-600">Final Score: {score}</p>
      </div>
      
      <div className="py-4 px-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg mb-8 shadow-md">
        <p className="text-green-700">Best Streak: {maxStreak}</p>
      </div>
      
      {score > highScore && (
        <div className="py-4 px-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg mb-8 shadow-md">
          <p className="text-yellow-700 font-bold text-2xl">
            New High Score! 🏆
          </p>
        </div>
      )}
      
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => startGame(difficulty)}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg transform hover:scale-105"
        >
          Play Again
        </button>
        
        <button
          onClick={() => setStatus('menu')}
          className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors shadow"
        >
          Main Menu
        </button>
      </div>
    </div>
  );

  // Main render function
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-indigo-100">
        {status === 'menu' && renderMenu()}
        {status === 'playing' && renderGame()}
        {status === 'gameover' && renderGameOver()}
        {status === 'win' && renderWin()}
      </div>
    </div>
  );
};

export default Game; 