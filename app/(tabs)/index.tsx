// import { Ionicons } from "@expo/vector-icons";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function HomeScreen() {
//   const recentActivities = [
//     {
//       id: 1,
//       type: "suspicious",
//       title: "Suspicious vehicle parked on Elm...",
//       reporter: "Sarah Chen",
//       time: "2 hours ago",
//       icon: "car" as const,
//     },
//     {
//       id: 2,
//       type: "meeting",
//       title: "Community meeting scheduled for...",
//       reporter: "Michael Davis",
//       time: "4 hours ago",
//       icon: "people" as const,
//     },
//     {
//       id: 3,
//       type: "theft",
//       title: "Package theft reported on Oak...",
//       reporter: "Emily Rodriguez",
//       time: "6 hours ago",
//       icon: "cube" as const,
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Neighborhood Watch</Text>
//           <TouchableOpacity style={styles.settingsButton}>
//             <Ionicons name="settings" size={24} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.searchContainer}>
//           <View style={styles.searchBar}>
//             <Ionicons name="search" size={20} color="#B0B8C4" />
//             <Text style={styles.searchPlaceholder}>
//               Search for incidents or alerts
//             </Text>
//           </View>
//         </View>

//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Recent Activity</Text>

//           <View style={styles.activityList}>
//             {recentActivities.map((activity) => (
//               <TouchableOpacity key={activity.id} style={styles.activityItem}>
//                 <View style={styles.activityIcon}>
//                   <Ionicons name={activity.icon} size={20} color="#1A2A44" />
//                 </View>
//                 <View style={styles.activityContent}>
//                   <Text style={styles.activityTitle}>{activity.title}</Text>
//                   <Text style={styles.activityMeta}>
//                     Reported by {activity.reporter}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.reportButton}
//           onPress={() => console.log("Report incident")}
//         >
//           <Ionicons name="add" size={24} color="#1A2A44" />
//           <Text style={styles.reportButtonText}>Report Incident</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1A2A44",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 24,
//     paddingTop: 16,
//     paddingBottom: 24,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontFamily: "Manrope-Bold",
//     color: "#FFFFFF",
//   },
//   settingsButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   searchContainer: {
//     paddingHorizontal: 24,
//     marginBottom: 32,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.2)",
//   },
//   searchPlaceholder: {
//     fontSize: 16,
//     fontFamily: "Inter-Regular",
//     color: "#B0B8C4",
//     marginLeft: 12,
//   },
//   sectionContainer: {
//     paddingHorizontal: 24,
//     marginBottom: 32,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontFamily: "Manrope-SemiBold",
//     color: "#FFFFFF",
//     marginBottom: 16,
//   },
//   activityList: {
//     gap: 12,
//   },
//   activityItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.2)",
//   },
//   activityIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   activityContent: {
//     flex: 1,
//   },
//   activityTitle: {
//     fontSize: 16,
//     fontFamily: "Inter-SemiBold",
//     color: "#FFFFFF",
//     marginBottom: 4,
//   },
//   activityMeta: {
//     fontSize: 14,
//     fontFamily: "Inter-Regular",
//     color: "#B0B8C4",
//   },
//   reportButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFFFFF",
//     marginHorizontal: 24,
//     marginBottom: 32,
//     paddingVertical: 16,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   reportButtonText: {
//     fontSize: 16,
//     fontFamily: "Inter-SemiBold",
//     color: "#1A2A44",
//     marginLeft: 8,
//   },
// });

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A2A44" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.p}>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 20,
  },
  p: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Inter-Medium",
  },
});
