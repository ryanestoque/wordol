import { StatusBar, StyleSheet, useWindowDimensions, Text, View, Image, Button, TouchableOpacity, TextInput } from "react-native";
import useBreakpoint from "@/hooks/useBreakpoint";
import { Link } from "expo-router";
import { registerUser, loginUser } from "@/firebase/authFunctions";
import { useState } from "react";
import { useRouter } from 'expo-router';


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("register"); // or "register"
  const [error, setError] = useState("");

  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (mode === "register") {
        await registerUser(email, password);
      } else {
        await loginUser(email, password);
      }
      router.navigate("/home")
    } catch (err) {
      alert("Failed!")
    }
  };

  const breakpoint = useBreakpoint();
  return(
    <View style={[styles.txtInptContainer, styles[`${breakpoint}TxtInptContainer`]]}>
      <TextInput  
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor={"#5a5a5a"}
        style={[styles.txtInpt]}/>
      <TextInput 
        placeholder="Password"
        placeholderTextColor={"#5a5a5a"}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={[styles.txtInpt]}/>
      <TextInput 
        placeholder="Confirm Password"
        placeholderTextColor={"#5a5a5a"}
        secureTextEntry
        style={[styles.txtInpt]}/>
      <TouchableOpacity 
        onPress={handleAuth}
        style={[styles.primaryBtn]}>
        Sign up
      </TouchableOpacity>
      <Link 
        style={{
          marginTop: 8,
          textAlign: "center",
        }}
        href={"/login"}>
        <Text style={{
          fontFamily: "Inter-Semibold",
          fontSize: 16,
          color: "#0a0a0a"
        }}>
          I already have an account
        </Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({

  txtInptContainer: {
    gap: 12,
    marginBottom: 32,
    width: 296
  },
  xxsTxtInptContainer: {
    width: 296
  },
  xsTxtInptContainer: {
    width: 296
  },
  smTxtInptContainer: {
    width: 296
  },
  mdTxtInptContainer: {
    width: 360
  },
  lgTxtInptContainer: {

  },
  xlTxtInptContainer: {

  },
  "2xlTxtInptContainer": {

  },

  txtInpt: {
    backgroundColor: "#eaeaea",
    padding: 16,
    borderRadius: 12,
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#0a0a0a",
    width: "100%",
    borderWidth: 1,
    borderColor: "#5a5a5a",
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
    marginTop: 16,
    fontSize: 16
  },
})