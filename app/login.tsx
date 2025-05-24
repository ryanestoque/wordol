import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, StyleSheet, useWindowDimensions, Text, View, Image, Button, TouchableOpacity, TextInput } from "react-native";
import SIZE from "@/styles/size";
import useBreakpoint from "@/hooks/useBreakpoint";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from "expo-router";
import Login from "@/components/common/Login";

export default function Index() {
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

  if (!loaded) {
    return null;
  }

  const breakpoint = useBreakpoint();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fafafa" barStyle="dark-content"></StatusBar>
      {/* <View style={{
        alignSelf: "flex-end",
        flex: 0
      }}>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#0a0a0a" />
        </TouchableOpacity>
      </View> */}

      <View style={styles.body}>
        <Image 
          style={[styles.wordolLogo, styles[`${breakpoint}WordolLogo`]]}
          source={require('../assets/images/wordol_logo.png')}/>

        <Text style={[styles.title, styles[`${breakpoint}Title`]]}>
          Wordol
        </Text>

        <Text style={[styles.subTitle, styles[`${breakpoint}SubTitle`]]}>
          YOU HAVE 6 TRIES TO GUESS A 5-LETTER BISAYA WORD.
        </Text>

        <Login />

        {/* <View
          style={[styles.btnContainer, styles[`${breakpoint}BtnContainer`]]}
        >

        </View> */}

        <View style={{
          alignItems: "center",
          gap: 4
        }}>
          {/* <Text style={{
            fontFamily: "Inter-Bold", 
            textAlign: "center",
            fontSize: 16       
          }}>
            May 17, 2025
          </Text>
          <Text style={{
            fontFamily: "Inter-Regular",   
            textAlign: "center",
            fontSize: 16        
          }}>
            Word No. 1
          </Text> */}
          <Text style={{
            fontFamily: "Inter-Regular",   
            textAlign: "center",
            fontSize: 12,
            marginTop: 16      
          }}>
            © 2025 Albacite, Asoy, Dela Cruz, Estoque
          </Text>
        </View>
      </View>
    </View>
  );
}

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
  },

  wordolLogo: {
    marginBottom: 8
  },
  xxsWordolLogo: {
    width: SIZE['6xl'],
    height: SIZE['6xl']
  },
  xsWordolLogo: {
    width: SIZE['7xl'],
    height: SIZE['7xl']
  },
  smWordolLogo: {
    width: SIZE['7xl'],
    height: SIZE['7xl']
  },
  mdWordolLogo: {
    width: SIZE['7xl'],
    height: SIZE['7xl']
  },
  lgWordolLogo: {
    width: SIZE['7xl'],
    height: SIZE['7xl']
  },
  xlWordolLogo: {
    width: SIZE['7xl'],
    height: SIZE['7xl']
  },
  '2xlWordolLogo': {
    width: SIZE['7xl'],
    height: SIZE['7xl']
  },

  title: {
    textAlign: "center",
    fontFamily: "Martires-Heavy",
    marginBottom: 16
  },
  xxsTitle: {
    fontSize: SIZE['5xl'], 
  },
  xsTitle: {
    fontSize: SIZE['5xl'], 
  },
  smTitle: {
    fontSize: SIZE['5xl'], 
  }, 
  mdTitle: {
    fontSize: SIZE['6xl'],
  },
  lgTitle: {
    fontSize: SIZE['6xl'],
  },
  xlTitle: {
    fontSize: SIZE['6xl'],
  },
  '2xlTitle': {
    fontSize: SIZE['6xl'],
  },

  subTitle: {
    textAlign: "center",
    fontFamily: "Martires-Medium",
    marginBottom: 32,
    maxWidth: 304
  },
  xxsSubTitle: {
    fontSize: SIZE['3xl'],
  },
  xsSubTitle: {
    fontSize: SIZE['3xl'],
    maxWidth: 304
  },
  smSubTitle: {
    fontSize: SIZE['3xl'],
    maxWidth: 304
  },
  mdSubTitle: {
    fontSize: SIZE['4xl'],
    maxWidth: 360,
    marginBottom: 40,
  },
  lgSubTitle: {
    fontSize: SIZE['4xl'],
    maxWidth: 360,
    marginBottom: 40,
  },
  xlSubTitle: {
    fontSize: SIZE['4xl'],
    maxWidth: 360,
    marginBottom: 40,
  },
  '2xlSubTitle': {
    fontSize: SIZE['4xl'],
    maxWidth: 360,
    marginBottom: 40,
  },

  txtInptContainer: {
    gap: 12,
    marginBottom: 32,
    width: 280
  },

  txtInpt: {
    backgroundColor: "#eaeaea",
    padding: 16,
    borderRadius: 12,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "#0a0a0a",
    width: "100%",
    borderWidth: 1,
    borderColor: "#5a5a5a"
  },

  btnContainer: {
    gap: 8,
    marginBottom: 40,
  },
  xxsBtnContainer: {
    
  },
  xsBtnContainer: {
    
  },
  smBtnContainer: {
    
  },
  mdBtnContainer: {
    flexDirection: "row-reverse",
    gap: 16
  },
  lgBtnContainer: {
    flexDirection: "row-reverse",
    gap: 16
  },
  xlBtnContainer: {
    flexDirection: "row-reverse",
    gap: 16
  },
  '2xlBtnContainer': {
    flexDirection: "row-reverse",
    gap: 16
  },

  primaryBtn: {
    fontFamily: "Inter-Medium",
    color: "#fafafa",
    backgroundColor: "#0a0a0a",
    textAlign: "center",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "center",
    marginTop: 16
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
