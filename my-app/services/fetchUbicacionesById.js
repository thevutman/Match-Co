import { supabase } from "@/lib/supabase";

export const fetchCanchaById = async (id) => {
  const { data, error } = await supabase
    .from("ubicaciones")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};
