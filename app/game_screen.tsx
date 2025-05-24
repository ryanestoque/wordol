import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, useWindowDimensions, Text, View, Image, Button, TouchableOpacity } from "react-native";
import SIZE from "@/styles/size";
import useBreakpoint from "@/hooks/useBreakpoint";
import Ionicons from '@expo/vector-icons/Ionicons';
import Grid from "@/components/common/Grid";
import Keyboard from "@/components/common/Keyboard";
import { observer, useLocalObservable } from "mobx-react-lite";
import PuzzleStore from "@/store/PuzzleStore";
import { Toast } from "@/components/common/Toast";
import ToastStore from "@/components/common/ToastStore";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router, useRouter } from "expo-router";
import { createGameForUser } from "../firebase/firebaseGameService";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import Settings from "@/components/common/Settings";
import MyStats from "@/components/common/MyStats";

const GameScreen = observer(() => {
  const [user, setUser] = useState<User | null>(null);
  const store = useLocalObservable(() => new PuzzleStore());
  const toastStore = useLocalObservable(() => new ToastStore());

  store.toast = toastStore;

  const [loaded] = useFonts({
    "Inter-Black": require("../assets/fonts/inter_black.ttf"),
    "Inter-BlackItalic": require("../assets/fonts/inter_blackitalic.ttf"),
    "Inter-Bold": require("../assets/fonts/inter_bold.ttf"),
    "Inter-BoldItalic": require("../assets/fonts/inter_bolditalic.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/inter_extrabold.ttf"),
    "Inter-ExtraBoldItalic": require("../assets/fonts/inter_extrabolditalic.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/inter_extralight.ttf"),
    "Inter-ExtraLightItalic": require("../assets/fonts/inter_extralightitalic.ttf"),
    "Inter-Italic": require("../assets/fonts/inter_italic.ttf"),
    "Inter-Light": require("../assets/fonts/inter_light.ttf"),
    "Inter-LightItalic": require("../assets/fonts/inter_lightitalic.ttf"),
    "Inter-Medium": require("../assets/fonts/inter_medium.ttf"),
    "Inter-MediumItalic": require("../assets/fonts/inter_mediumitalic.ttf"),
    "Inter-Regular": require("../assets/fonts/inter_regular.ttf"),
    "Inter-Semibold": require("../assets/fonts/inter_semibold.ttf"),
    "Inter-SemiboldItalic": require("../assets/fonts/inter_semibolditalic.ttf"),
    "Inter-Thin": require("../assets/fonts/inter_thin.ttf"),
    "Inter-ThinItalic": require("../assets/fonts/inter_thinitalic.ttf"),
    "Martires-Black": require("../assets/fonts/martires_black.otf"),
    "Martires-Bold": require("../assets/fonts/martires_bold.otf"),
    "Martires-Demi-Bold": require("../assets/fonts/martires_demi_bold.otf"),
    "Martires-Extra-Bold": require("../assets/fonts/martires_extra_bold.otf"),
    "Martires-Extra-Light": require("../assets/fonts/martires_extra_light.otf"),
    "Martires-Heavy": require("../assets/fonts/martires_heavy.otf"),
    "Martires-Light": require("../assets/fonts/martires_light.otf"),
    "Martires-Medium": require("../assets/fonts/martires_medium.otf"),
    "Martires-Regular": require("../assets/fonts/martires_regular.otf"),
    "Martires-Semibold": require("../assets/fonts/martires_semi_bold.otf"),
    "Martires-Thin": require("../assets/fonts/martires_thin.otf"),
    "Martires-Ultra-Bold": require("../assets/fonts/martires_ultra_bold.otf"),
    "Martires-Ultra-Light": require("../assets/fonts/martires_ultra_light.otf"),
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [loaded]); 

  const restartGame = async () => {
    try {
      const { word, gameId } = await createGameForUser();
      store.init(word);
      store.gameId = gameId;
    } catch (error) {
      toastStore.show("Failed to restart game");
      console.error("restartGame error:", error);
    }
  };

  if (!loaded) {
    return null;
  }

  const breakpoint = useBreakpoint();
  const { width } = useWindowDimensions();
  const tileSize = width / 6;

  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [isStatsVisible, setStatsVisible] = useState<boolean>(false);

  const handleOpenPopup = (): void => {
    setPopupVisible(true);
  };

  const handleClosePopup = (): void => {
    setPopupVisible(false);
  };

  const handleOpenStats = (): void => {
    setStatsVisible(true);
  };

  const handleCloseStats = (): void => {
    setStatsVisible(false);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      // User not signed in yet — do nothing or show loading
      return;
    }

    const startGame = async () => {
      try {
        const { word, gameId } = await createGameForUser();
        store.init(word);
        store.gameId = gameId;
      } catch (error) {
        toastStore.show("Failed to start game.");
        console.error("startGame error:", error);
      }
    };

    startGame();
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fafafa" barStyle="dark-content"></StatusBar>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}>
        <Link href="/home">
          <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "center"}}>
            <Image 
              style={{width: 28, height: 28}}
              source={require('../assets/images/wordol_logo.png')}/>

            <Text style={styles.title}>
              Wordol
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={{flexDirection: "row", gap: 16}}>
        <TouchableOpacity onPress={restartGame}>
            <AntDesign name="reload1" size={24} color="#0a0a0a" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOpenStats}>
            <Ionicons name="bar-chart-outline" size={28} color="#0a0a0a" />
          </TouchableOpacity>
          <MyStats
            visible={isStatsVisible}
            onClose={handleCloseStats}
            title="STATISTICS">
          </MyStats>

          <TouchableOpacity onPress={handleOpenPopup}>
            <Ionicons name="settings-outline" size={28} color="#0a0a0a" />
          </TouchableOpacity>
          <Settings
            visible={isPopupVisible}
            onClose={handleClosePopup}
            title="Settings">
          </Settings>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.grid}>
          {store.guesses.map((_, i) => (
            <Grid 
              key={i}
              word={store.word} 
              guess={store.guesses[i]} 
              isGuessed={i < store.currentGuess}/>
          ))}
        </View>
        <Keyboard store={store}/>
      </View>
      {/* word: {store.word}
      guesses: {JSON.stringify(store.guesses)} */}
      <Toast store={toastStore} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 16
  },

  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 16
  },

  grid: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4
  },

  row: {
    flexDirection: "row",
    gap: 4
  },

  tile: {
    borderWidth: 1,
    borderColor: "#0a0a0a",
  },
  
  title: {
    textAlign: "center",
    fontFamily: "Martires-Heavy",
    fontSize: 28,
  },

  primaryBtn: {
    fontFamily: "Inter-Semibold",
    color: "#fafafa",
    backgroundColor: "#0a0a0a",
    textAlign: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: 192,
  },
  secondaryBtn: {
    fontFamily: "Inter-Semibold",
    color: "#0a0a0a",
    backgroundColor: "#fafafa",
    textAlign: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: 192,
    borderWidth: 1,
    borderColor: "#0a0a0a"
  }
});

export default GameScreen;