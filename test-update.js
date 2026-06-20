const axios = require('axios');
const FormData = require('form-data');

async function test() {
  const form = new FormData();
  form.append('MatchFormat', 'T10');
  form.append('OversPerMatch', '10');
  form.append('BallType', 'Hard Tennis');
  form.append('PrizeDetails', JSON.stringify([ { title: 'First', amount: 5000 } ]));
  
  try {
    const res = await axios.put('http://localhost:3000/api/tournaments/1', form, {
      headers: form.getHeaders()
    });
    console.log(res.data);
  } catch(e) {
    console.error(e.response ? e.response.data : e.message);
  }
}
test();
