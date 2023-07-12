const axios = require('axios');
require('dotenv').config();
const cheerio = require('cheerio');

const twk_uuid_5eccf3638ee2956d73a4a6c6 = process.env.TWK_UUID_5ECCF3638EE2956D73A4A6C6;
const sia_app_session = process.env.SIA_APP_SESSION;
const nim = process.env.NIM;

const url = 'https://siap.undip.ac.id/evaluasi_perkuliahan/mhs/evaluasi/ajax/simpan-kuisioner';
const headers = {
  'Cookie': 'twk_uuid_5eccf3638ee2956d73a4a6c6=' + twk_uuid_5eccf3638ee2956d73a4a6c6 + '; sia_app_session=' + sia_app_session,
};

async function getcominationmkanddosen() {
  try {
    const response = await axios.get('https://siap.undip.ac.id/evaluasi_perkuliahan/mhs/evaluasi', { headers });
    const $ = cheerio.load(response.data);
    const options = $("select option");
    const combination = [];

    options.each((index, option) => {
      const value = $(option).val();
      combination.push(value);

      if (value === undefined) {
        return false; // Stop the loop if the condition is met
      }
    });
    combination.forEach((element) => {
    });
    return combination;
  } catch (error) {
    console.error(error);
  }
  
}
getcominationmkanddosen();

async function sendRequests() {
    const combination = await getcominationmkanddosen();
    console.log(nim);
    // console.log(combination);
    for (const element of combination.slice(1)) {
        const [id_mks, id_dosen] = element.split('|');
        const data = new FormData();
        data.append('data_jawaban', `{"nim":"${nim}","id_dosen":"${id_dosen}","id_mks":"${id_mks}","list_jawaban":["1|Ada","2|Ada","3|Ada","4|Ada","5|Ada","6|Ada","7|Ada","8|Ada","9|Ada","10|Ada","11|Ada","12|Tidak","13|Wifi Rumah/Kos","14|Laptop","15|Tatap Muka","16|Ms Teams","17|Ada","18|Ada","19|Ada","20|Ada","21|Ada","22|Ada","23|Ada","24|Ada","25|Ya","26|Ya","27|Ya","28|Ya","29|Ya","30|Ya","31|Ya","32|Ya","33|Ya","34|Ya"]}`);
        try {
          const response = await axios.post(url, data, { headers });
          console.log(`Response for combination ${element}:`, response.data);
        } catch (error) {
          console.error(`Error for combination ${element}:`, error);
        }
      }
      
}
sendRequests();