# BasicEthereumAPI

## What is this Project about?
It's a small (extremely) example in nodeJS using BlockCypher API which shows
  * Create Ethereum Wallet on test net
  * Add money to one's wallet - using BlockCypher faucet.
  * Check balance of one's wallet
  * Send money from one wallet to another
  
  
  
## Steps to Run the project
* Clone/Download the project
* UnZip the Project
* cd to the project path
* run npm install to install the packages in package.json
* run npm start - this will start the server on 3000 port.
* Goto console and goto http://localhost:3000


Resources Referred
* https://github.com/blockcypher/node-client - Main API used
* https://www.blockcypher.com/dev/ethereum/#introduction - API referrence
* http://blockchain.mit.edu/how-blockchain-works - To basically understand BlockChain, Bitcoin and Ethereum.


What improvements can be done?
* Right now I am using just two addresses to check balances, send money and add money. We can take input from the client side.
* Port and token configuration can be done via the application.properties file.
* Better UI but this was just a POC
* Dockerizing everything



