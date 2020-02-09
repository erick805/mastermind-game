<h1 align="center">Mastermind_Game</h1>

<p align="center">
You are pitted against a computer "Master Mind". This is a game where you take turns attempting to
pick a lock. The lock is generated from https://www.random.org/clients/http/api/ API. Random.org is
a true random number generator that generates randomness from atmospheric noise.
</p>

**Link:** [https://rickylaufitness.github.io/mastermind-game/public](https://rickylaufitness.github.io/mastermind-game/public) // Note - turn up or down volume for sound //

**Development Mode:**
<ol>
     <li>`$ git clone https://github.com/rickylaufitness/mastermind-game.git`</li>
- `$ cd mastermind-game`
- Install live server. [live server vs code ext](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Find index.html inside public dir. Right click and press "Open with Live Server".
</ol>
![open live](./public/images/open-live.png)

<h3>Rules of the Game:</h3>
<li>Game starts immediately after initial load.</li>
<li>You have 10 attempts to get the right combination.</li>
<li>The computer will provide feedback in three ways:</li>

     - `Sorry your number is incorrect`
     -  `You got a correct number`
     - `Got a correct number and place!`

![feedback](./public/images/feedback.png)

<li>The "Provide Hint" Button displays how many numbers you got right && in the right location.</li>

![provide hint](./public/images/provide-hint.png)

<li> "View History" displays your latest historyafter you submitted the combination by clicking "Unlock".</li>

![view history](./public/images/view-history.png)
