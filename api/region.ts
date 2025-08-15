import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase"; // your supabase client

export async function saveRegionToProfile() {
  try {
    const region = await AsyncStorage.getItem("userLocation");
    if (!region) return; // nothing to save

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return; // not logged in

    // Update the profile
    const { error } = await supabase
      .from("users")
      .update({ region })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile region:", error);
    }
  } catch (err) {
    console.error("AsyncStorage or update error:", err);
  }
}
