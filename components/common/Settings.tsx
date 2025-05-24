import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { clearUserStatistics } from '@/firebase/firebaseGameService';
import { getAuth, signOut } from "firebase/auth";
import { router } from 'expo-router';

// Define the types for the props your MyPopup component will accept
interface MyPopupProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode; // Allows you to pass any React content as children
  title?: string; // Optional title prop
}

const handleSignOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    console.log("User signed out");
    router.replace("/login"); // or navigate to login screen
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

const Settings: React.FC<MyPopupProps> = ({ visible, onClose, children, title }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            {title && <Text style={styles.modalTitle}>{title}</Text>}
            {children}
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <TouchableOpacity 
              onPress={async () => {
                try {
                  await clearUserStatistics();
                  alert("Statistics cleared successfully.");
                } catch (err) {
                  console.error("Failed to clear stats:", err);
                  alert("Failed to clear statistics.");
                }
              }}
              style={{flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
              <Text style={{fontFamily: "Inter-Semibold", fontSize: 16}}>Clear Statistics</Text>
              <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSignOut}
              style={{flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
              <Text style={{fontFamily: "Inter-Semibold", fontSize: 16}}>Sign out</Text>
              <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"
  },
  modalBody: {
    width: "100%",
    marginTop: 32,
    gap: 24
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 280
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: "Martires-Heavy"
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Settings;