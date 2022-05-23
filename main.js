const { waitForDebugger } = require('inspector');
const Binance = require('node-binance-api');
const { exit } = require('process');
const binance = new Binance().options({
  APIKEY: '',
  APISECRET: ''
});
 
const pairOne = 'XRPETH'
const pairTwo = 'ETHBTC'
const pairThree = 'XRPBTC'
var pairOneBid;
var pairOneAsk;
var pairTwoBid;
var pairTwoAsk;
var pairThreeBid;
var pairThreeSpread;
var pairThreeAsk;
var direction = 0;
var tradesOpen = false;
var gotData = false;
var longPathRate = 0;
var shortPathRate = 0;
var holding;
 
 
setInterval(decideFunction,150);
function getMarketData()
  {
    gotData = true;
    binance.bookTickers(pairOne, (error, ticker) => {
      if(ticker != undefined && ticker.bidPrice != undefined && ticker.askPrice != undefined)
      {
        pairOneBid = ticker.bidPrice;
        pairOneAsk = ticker.askPrice;
        console.info("Bid of Pair 1: ", pairOneBid);
        console.info("Ask of Pair 1: ", pairOneAsk);
      }
      else{gotData = false;}
        
      });
    binance.bookTickers(pairTwo, (error, ticker) => {
      if(ticker != undefined && ticker.bidPrice != undefined && ticker.askPrice != undefined)
      {
        pairTwoBid = ticker.bidPrice;
        pairTwoAsk = ticker.askPrice;
        console.info("Bid of Pair 2: ", pairTwoBid);
        console.info("Ask of Pair 2: ", pairTwoAsk);
      }
      else{gotData = false;}
      
        
      });
    binance.bookTickers(pairThree, (error, ticker) => {
      if(ticker != undefined && ticker.bidPrice != undefined && ticker.askPrice != undefined)
      {
        pairThreeBid = ticker.bidPrice;
        pairThreeAsk = ticker.askPrice;
        pairThreeSpread = pairThreeAsk - pairThreeBid;
        console.info("Bid of Pair 3: ", pairThreeBid);
        console.info("Ask of Pair 3: ", pairThreeAsk);
        console.info("Spread of Pair 3: ", pairThreeSpread);
      }
      else{gotData = false;}
          
      });
      
    
    
    
  }
function decideFunction()
  {
    setTimeout(getMarketData,100);
    if(tradesOpen && gotData)
      {
        manageTrade();
 
        gotData = false;
      }
    else
    {
      placeTrade();
      gotData = false;
    }
  }
function placeTrade()
  {
    if (((pairOneAsk*pairTwoAsk) - pairThreeAsk) / pairThreeAsk > 0.008)
      {
        /* PLACING TRADE RIGHT HERE IN REAL-TIME TRADING*/
        longPathRate = pairOneAsk*pairTwoAsk;
        shortPathRate = pairThreeAsk;
        direction = 1;
        console.log("direction: ", direction);
        tradesOpen = true;
 
      }
    else if(((pairOneBid*pairTwoBid) - pairThreeBid) / pairThreeBid < -0.008) 
      {
        /* PLACING TRADE RIGHT HERE IN REAL-TIME TRADING*/
        longPathRate = pairOneBid*pairTwoBid;
        shortPathRate = pairThreeBid;
        direction = 2;
        console.log("direction: ", direction);
        tradesOpen = true;
 
      }
    //decideFunction();
      
  }

function placeMarketOrder() {
  getMarketData();
  binance.balance();
  if (((pairOneAsk*pairTwoAsk) - pairThreeAsk) / pairThreeAsk < -0.008) 
  {
    // place buy order
    binance.marketBuy(pairOne, holding);
    binance.marketBuy(pairTwo, holding);

    // place sell order
    binance.marketSell(pairThree, holding);

  }

}

function manageTrade()
  {
    getMarketData();
    //decideFunction();
    //listOpenOrders();
    console.log("You made it to manageTrade()");
 
  }

function placeStopLoss() {
  binance.balance((error, balances) => {
    if ( error ) return console.error(error);
    console.log("balances()", balances);
    console.log("ETH balance: ", balances.ETH.available);
  });

  if (binance.balance((error, balance) < 350)) {
    var ETHAvailable = balances.ETH.available;
    binance.sell("ETHBTC", ETHAvailable, )
    marketSell(t)
  }
}

function listOpenOrders() {
  binance.openOrders(false, (error, openOrders) => {
    console.info("openOrder()", openOrders);
  });
}
