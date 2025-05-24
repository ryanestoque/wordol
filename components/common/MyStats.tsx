import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { getUserStats } from "@/firebase/firebaseGameService";

// Define the types for the props your MyPopup component will accept
interface MyPopupProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode; // Allows you to pass any React content as children
  title?: string; // Optional title prop
}

const MyStats: React.FC<MyPopupProps> = ({ visible, onClose, children, title }) => {
  const [stats, setStats] = useState<{ gamesPlayed: number; wins: number; losses: number } | null>(null);

  useEffect(() => {
    if (visible) {
      const fetchStats = async () => {
        try {
          const userStats = await getUserStats();
          setStats(userStats);
        } catch (err) {
          console.error("Failed to fetch stats:", err);
        } finally {
        }
      };
      fetchStats();
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Use the onClose prop
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            {title && <Text style={styles.modalTitle}>{title}</Text>} {/* Render title if provided */}
            {children} {/* This is where your custom content goes */}
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={{alignItems: "center"}}>
              <Text style={{fontSize: 32, fontFamily: "Inter-Bold"}}>
                {stats?.gamesPlayed}
              </Text>
              <Text style={{fontSize: 16, fontFamily: "Inter-Medium"}}>
                Games
              </Text> 
            </View>
            <View style={{alignItems: "center"}}>
              <Text style={{fontSize: 32, fontFamily: "Inter-Bold"}}>
                {stats?.wins}
              </Text>
              <Text style={{fontSize: 16, fontFamily: "Inter-Medium"}}>
                Win/s
              </Text> 
            </View>
            <View style={{alignItems: "center"}}>
              <Text style={{fontSize: 32, fontFamily: "Inter-Bold"}}>
                {stats?.losses}
              </Text>
              <Text style={{fontSize: 16, fontFamily: "Inter-Medium"}}>
                Loss/es
              </Text> 
            </View>
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
    gap: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

export default MyStats;