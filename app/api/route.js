import { supabase } from "../_lib/supabase";


export async function GET(){
    const {data, error} = await supabase.from('cabins').select('*').order('name');
    return Response.json(data);
}