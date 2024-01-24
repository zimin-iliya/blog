// supabaseClient.js
require('dotenv').config();



async function showImg() {
    const publicUrl = await supabase.storage.from(`avatar/${userInfo}`).getPublicUrl('ME2.jpg');

}

module.exports = supabase;
