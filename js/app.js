import WelcomeScreen from './screens/1-welcome/welcomeScreen';
import GameArtist from './screens/2-game-artist/gameArtistScreen';
import initialState from './data/initialState';
// import GameGenreScreen from './screens/3-';
// import statsScreen from './screen/stats-screen';

export default class Application {

  static showWelcome() {
    WelcomeScreen.init();
  }

  static startGame() {
    const firstScreen = new GameArtist(initialState);
    firstScreen.init();
  }

}
