// components/common/Toast.tsx
import { observer } from "mobx-react-lite";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
import { useEffect, useRef } from "react";

export const Toast = observer(({ store }: { store: any }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (store.visible) {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 50, // drop from top
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [store.visible]);

  if (!store.visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          transform: [{ translateY: slideAnim }],
          alignSelf: "center",
        },
      ]}
    >
      <Text style={styles.toastText}>{store.message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 0,
    padding: 16,
    backgroundColor: "#0a0a0a",
    borderRadius: 8,
    zIndex: 1000,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter-Medium"
  },
});
