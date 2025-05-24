import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

interface GridProps {
  isGuessed: boolean;
  guess: string;
  word: string;
}

export default function Grid({isGuessed, guess, word}: GridProps) {
  const { width } = useWindowDimensions();
  const tileSize = width / 6;

  return (
    <View style={styles.row}>
      {new Array(5).fill(0).map((_, i) => {
        const bgColor = !isGuessed 
          ? "#FAFAFA" 
          : guess[i] === word[i] 
          ? "#1D4ED8" // blue
          : word.includes(guess[i]) 
          ? "#EAB308" // yellow
          : "#B91C1C" // red

        const textColor = !isGuessed ?
        "#0a0a0a" : "#fafafa"

        return (
          <View 
            key={i}
            style={[
              styles.tile, 
                {
                  backgroundColor: bgColor,
                  width: tileSize, 
                  height: 55, 
                  maxWidth: 55
                }
            ]}
          >
            <Text style={{
              color: textColor,
              fontFamily: "Martires-Heavy",
              fontSize: 40
              }}>{guess[i]}</Text>
          </View>
        )
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 4
  },

  tile: {
    borderWidth: 1,
    borderColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },
});
