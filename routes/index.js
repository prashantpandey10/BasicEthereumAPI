var express = require('express');
var router = express.Router();
var http = require("http");
bcypher = require('blockcypher');

var bitcoin = require("bitcoinjs-lib");
var bigi = require("bigi");
var buffer = require('buffer');

var keys    = new bitcoin.ECPair(bigi.fromHex("9b7ac42d20131dddca501c10e73a4e077601b6b5636e7241bbce773a6f943640"));


var bcapi = new bcypher('beth', 'test', '44e1ba8f9c584f8cabca01a089a910d2');

//Token = 44e1ba8f9c584f8cabca01a089a910d2
/*

Wallet 1 Info
{ private:
   '9b7ac42d20131dddca501c10e73a4e077601b6b5636e7241bbce773a6f943640',
  public:
   '042f66fcc64b80e5487babd056fc699988cc2dc549af416aa1ebba6b56332ded9479ddb5ca1fd47d4dc64f669a5cfc7ff6b302e91cfb2c7570d23af979efcb0e59',
  address: 'a139ee383a88ffe0e7cc6efdf6028ee9b143c5eb' }


Wallet 2 Info
{ private:
   '439fb0b4d12b78d60dc592cd22bf699219445e9e3006dfa31f8fbd0692e70640',
  public:
   '04bb13d7803bac043ce1737998ee9b51030712e49b89cf4e7d110fbc900b3126e0a04956bcf928f9f127046fba40d7d5f607d1630be645db15ad040abd4fca3414',
  address: 'd4a0ae0461cb251cfec4babcea0c5d4fe727235c' }
 */


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'KeyRock'});
});

//create wallet
router.post("/createWallet", function (req, res, next) {
    bcapi.genAddr({}, function (err, data) {
        console.log("Error " + err);
        console.log(data);
    });
});

//add money to test
router.post("/addMoney", function (req, res, next) {
    bcapi.faucet("a139ee383a88ffe0e7cc6efdf6028ee9b143c5eb", 10000 * 10000, function (err, data) {
        console.log("Sending 10000 eth");
        console.log(err);
        console.log(data);
    });
});

//Get the balance of an ethereum address
router.get("/getBalance", function (req, res, next) {

    bcapi.getAddrBal("a139ee383a88ffe0e7cc6efdf6028ee9b143c5eb", null, function (err, data) {
        console.log("Balance2 for a139ee383a88ffe0e7cc6efdf6028ee9b143c5eb (wallet 1) ");
        console.log(data);
    });

    bcapi.getAddrBal("d4a0ae0461cb251cfec4babcea0c5d4fe727235c", null, function (err, data) {
        console.log("Balance1 for d4a0ae0461cb251cfec4babcea0c5d4fe727235c (wallet 2)");
        console.log(data);
    });


});

/*
    Creates a transaction to send ETH from one address to another.
    It can receive 3 raw JSON params: privateKey of the source ETH address,
    destination is the ETH destination address and amount the number of ETH to be send.
 */
router.post("/transaction", function (req, res, next) {
    var newtx = {
        inputs: [{addresses: ['a139ee383a88ffe0e7cc6efdf6028ee9b143c5eb']}],
        outputs: [{addresses: ['d4a0ae0461cb251cfec4babcea0c5d4fe727235c'], value: 10000}]
    };


    bcapi.newTX(newtx, function (err, data) {
        console.log(err);
        console.log(data);
        data.pubkeys = [];
        data.signatures = data.tosign.map(function (tosign, n) {
            data.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
            return keys.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
        });

        bcapi.sendTX(data,function (err,data) {
            console.log(err);
            console.log(data);
           console.log("Transaction published");
        });
    });
});
module.exports = router;
