# Cryptocurrency-Arbitrage-Algorithm
## A triangular cryptocurrency arbitrage algorithm for BinanceUS

#### What is Triangular Arbitrage?
Markets aren't perfectly efficient which leads to some inaccuracies when it comes to buying and selling assets. Specifically regarding triangular arbitrage, if we have three currencies that each have currency rates that do not match up, we can do a conversion between the three currencies to get a risk free profit (arbitrage) based on this inaccuracy.

#### Implementation and Results
This algorithm specifically targets inefficiencies in cryptomarkets, specifically BinanceUS. The main three assets traded/converted are XRP, ETH, and BTC. This algorithm was run in the fall of 2020 when all three of these currencies were still in the market (XRP has been removed from Binance due to legal issues with the SEC at the moment). To keep this algorithm running 24/7, I put it on a virtual environment using DigitalOcean. 

While this algorithm works in theory and the fact that cryptomarkets aren't perfectly efficient, triangular arbitrage has been "overdone" and the gaps created in the market are too small in volume or range for meaningful profit to be made. This is because when trading currencies, traders incur gas fees each time they sell and asset and they are larger than the profit of the arbitrage opportunity. That being said, the algorithm was able to successfully identify arbitrage opportunities, but rarely found profitable opportunities. Further work on this algorithm can be done using a statistical arbitrage strategy which incurs risk during each trade, but over time is market neutral.
