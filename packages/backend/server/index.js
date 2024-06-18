const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// ⌱Endpoint to deploy the Move contracts
app.post('/deploy', async (req, res) => {
  try {
    // Assuming there's an API to deploy Move contracts, e.g., Sui DevNet
    const deployResponse = await axios.post('https://api.sui.dev/deploy', {
      contracts: req.body.contracts // List of contracts to deploy
    });
    
    res.status(200).send(deployResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deploying contracts');
  }
});

// ⌱Endpoint to call encrypt_file function
app.post('/encrypt_file', async (req, res) => {
  const { account, file_id, raw_data } = req.body;

  try {
    const response = await axios.post('https://api.sui.dev/call', {
      module: 'FileTransfer',
      function: 'encrypt_file',
      args: [account, file_id, raw_data]
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error calling encrypt_file function');
  }
});

// ⌱Endpoint to call tokenize_file_hash function
app.post('/tokenize_file_hash', async (req, res) => {
  const { account, file_id } = req.body;

  try {
    const response = await axios.post('https://api.sui.dev/call', {
      module: 'FileTransfer',
      function: 'tokenize_file_hash',
      args: [account, file_id]
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error calling tokenize_file_hash function');
  }
});

// ⌱Endpoint to call transfer_token_via_wormhole function
app.post('/transfer_token_via_wormhole', async (req, res) => {
  const { account, file_id } = req.body;

  try {
    const response = await axios.post('https://api.sui.dev/call', {
      module: 'FileTransfer',
      function: 'transfer_token_via_wormhole',
      args: [account, file_id]
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error calling transfer_token_via_wormhole function');
  }
});

// ⌱Endpoint to call verify_and_retrieve_file function
app.post('/verify_and_retrieve_file', async (req, res) => {
  const { account, file_id, token_hash, message_hash } = req.body;

  try {
    const response = await axios.post('https://api.sui.dev/call', {
      module: 'FileTransfer',
      function: 'verify_and_retrieve_file',
      args: [account, file_id, token_hash, message_hash]
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error calling verify_and_retrieve_file function');
  }
});

// ..Start..
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
