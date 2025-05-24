import { useFonts } from "expo-font";
import { Text, useWindowDimensions } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import PuzzleStore from "@/store/PuzzleStore";
import { observer, useLocalObservable } from "mobx-react-lite";

type KeyboardProps = {
  store: PuzzleStore;
};

export default observer(function Keyboard({ store }: KeyboardProps) {
  const { width } = useWindowDimensions();
  const keySize1 = width / 11.5;
  const keySize2 = width / 7.5;

  const qwerty = [
    "qwertyuiop",
    "asdfghjkl",
    ["enter", ..."zxcvbnm", "backspace"]
  ];

  return (
    <View style={styles.keyboardContainer}>
      {qwerty.map((row, rowIndex) => (
        <View style={styles.keyboardRow} key={rowIndex}>
          {(typeof row === "string" ? row.split('') : row).map((key) => {
            const bgColor = store.exactGuesses.includes(key)
              ? "#1D4ED8"
              : store.inexactGuesses.includes(key)
              ? "#EAB308"
              : store.allGuesses.includes(key)
              ? "#B91C1C" 
              : "#D9D9D9"

            const textColor = store.exactGuesses.includes(key) 
            || store.inexactGuesses.includes(key) ||
            store.allGuesses.includes(key) ? "#fafafa" : "#0a0a0a"
            return (
              <TouchableOpacity
                key={key}
                onPress={() => store.handleKeyPress(key)}
                style={[
                  key === "enter"
                    ? styles.enterKey
                    : key === "backspace"
                    ? styles.backSpaceKey
                    : {
                      backgroundColor: bgColor,
                      borderRadius: 4,    
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  {
                    width: key === "enter" || key === "backspace" ? keySize2 : keySize1,
                    height: 60,
                    maxWidth: key === "enter" || key === "backspace" ? 75 : 50,
                  },
                ]}
              >
                {key === "backspace" ? (
                  <Ionicons name="backspace-outline" size={28} color="black" />
                ) : (
                  <Text style={
                    { 
                      color: textColor,
                      fontFamily: "Martires-Bold", 
                      fontSize: key === "enter" ? 18 : 28}
                      }>
                    {key.toUpperCase()}
                  </Text>
                )}
              </TouchableOpacity>
            )
          })}
        </View>
      ))}
    </View>
  )
});

const styles = StyleSheet.create({
  keyboardContainer: {
    gap: 4,
    alignItems: "center"
  },

  keyboardRow: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  
  keyboardKey: {
    borderRadius: 4,
    fontFamily: "Martires-Bold",
    justifyContent: "center",
    alignItems: "center",
  },

  enterKey: {
    backgroundColor: "#d9d9d9",
    color: "#0a0a0a",
    borderRadius: 4,
    fontFamily: "Martires-Bold",
    justifyContent: "center",
    alignItems: "center"
  },

  backSpaceKey: {
    backgroundColor: "#d9d9d9",
    color: "#0a0a0a",
    borderRadius: 4,
    fontFamily: "Martires-Bold",
    justifyContent: "center",
    alignItems: "center"
  }
});