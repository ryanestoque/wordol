import {
  doc,
  setDoc,
  getDoc,
  collection,
  serverTimestamp,
  updateDoc,
  increment,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "./firebase";
import words from "../words.json";

export const createGameForUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not signed in");

  const userId = user.uid;
  const userDocRef = doc(firestore, "users", userId);

  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      createdAt: serverTimestamp(),
      email: user.email || "unknown@example.com",
      statistics: {
        gamesPlayed: 0,
        losses: 0,
        wins: 0,
      },
    });
  }

  const word = words[Math.floor(Math.random() * words.length)];
  const gamesRef = collection(firestore, "users", userId, "games");
  const newGameRef = doc(gamesRef);
  const gameId = newGameRef.id;

  const gameData = {
    cebuanoWord: word,
    wordGuesses: [],
    numberOfTries: 0,
    hasWon: false,
    startedAt: serverTimestamp(),
    completedAt: null,
  };

  await setDoc(newGameRef, gameData);

  return { gameId, word };
};

export const saveGameProgress = async (
  gameId: string,
  data: {
    wordGuesses: string[];
    numberOfTries: number;
    hasWon: boolean;
    completedAt: Date | null;
  }
) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not signed in");

  const userId = user.uid;
  const gameDocRef = doc(firestore, "users", userId, "games", gameId);

  await updateDoc(gameDocRef, {
    wordGuesses: data.wordGuesses,
    numberOfTries: data.numberOfTries,
    hasWon: data.hasWon,
    completedAt: data.completedAt ? data.completedAt : null,
    updatedAt: serverTimestamp(),
  });
};

export const updateUserStats = async (didWin: boolean) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not signed in");

  const userDocRef = doc(firestore, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) return;

  const statsUpdates = {
    "statistics.gamesPlayed": increment(1),
    "statistics.wins": didWin ? increment(1) : increment(0),
    "statistics.losses": !didWin ? increment(1) : increment(0),
  };

  await updateDoc(userDocRef, statsUpdates);
};

export const getUserStats = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not signed in");

  const userDocRef = doc(firestore, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return data.statistics ?? { gamesPlayed: 0, wins: 0, losses: 0 };
  } else {
    return { gamesPlayed: 0, wins: 0, losses: 0 };
  }
};

export const clearUserStatistics = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not signed in");

  const userId = user.uid;
  const userDocRef = doc(firestore, "users", userId);
  const gamesCollectionRef = collection(firestore, "users", userId, "games");

  await updateDoc(userDocRef, {
    "statistics.gamesPlayed": 0,
    "statistics.wins": 0,
    "statistics.losses": 0,
  });

  const snapshot = await getDocs(gamesCollectionRef);
  const batch = writeBatch(firestore);

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};