// PuzzleStore.ts
import { makeAutoObservable } from "mobx";
import words from "../words.json";
import { saveGameProgress, updateUserStats } from "@/firebase/firebaseGameService";

export default class PuzzleStore {
  word = "";
  guesses = new Array(6).fill('');
  currentGuess = 0;
  toast?: { show: (message: string) => void };
  gameId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get won() {
    return this.guesses[this.currentGuess - 1] === this.word;
  }

  get lost() {
    return this.currentGuess === 6;
  }

  get allGuesses() {
    return this.guesses.slice(0, this.currentGuess).join("").split("")
  }

  get exactGuesses() {
    return this.word.split('')
    .filter((letter, i) => {
      return this.guesses
        .slice(0, this.currentGuess)
        .map(word => word[i])
        .includes(letter)
    })
  }

  get inexactGuesses() {
    return this.word
      .split('')
      .filter((letter) => this.allGuesses.includes(letter))
  }

  init(word: string) {
    this.word = word;
    this.guesses = new Array(6).fill('');
    this.currentGuess = 0;
  }

  async submitGuess() {
    const currentAttempt = this.guesses[this.currentGuess];
  
    if (currentAttempt.length < 5) {
      this.toast?.show("Not enough letters");
      return;
    }
  
    const lowercasedWords = words.map(w => w.toLowerCase());
  
    if (!lowercasedWords.includes(currentAttempt.toLowerCase())) {
      this.toast?.show("Not in word list");
      return;
    }
  
    // Save the current attempt into guesses array (if not already saved)
    // This step might be redundant if guesses are updated on input, but good to be safe
    this.guesses[this.currentGuess] = currentAttempt.toLowerCase();
  
    // Check if the guess is the winning word
    if (currentAttempt.toLowerCase() === this.word.toLowerCase()) {
      this.toast?.show("You Win!");
      this.currentGuess += 1;  // increment AFTER handling win
    } else {
      this.currentGuess += 1;
  
      if (this.currentGuess === 6 && currentAttempt !== this.word) {
        this.toast?.show(this.word.toUpperCase());
      }
    }
  
    // Save progress after updating currentGuess and guesses
    if (this.gameId) {
      await saveGameProgress(this.gameId, {
        wordGuesses: this.guesses.slice(0, this.currentGuess),
        numberOfTries: this.currentGuess,
        hasWon: this.won,
        completedAt: this.won || this.lost ? new Date() : null,
      });
    }

    if (this.won || this.lost) {
      await updateUserStats(this.won);
    }
  }

  handleKeyPress(key: string) {
    if (this.won || this.lost) return;
  
    if (key === "enter") {
      this.submitGuess();
      return;
    }
  
    if (key === "backspace") {
      this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
        0, this.guesses[this.currentGuess].length - 1
      );
      return;
    }
  
    if (this.guesses[this.currentGuess].length < 5 && key.match(/^[a-zA-Z]$/)) {
      this.guesses[this.currentGuess] += key.toLowerCase();
    }
  }
  
}
