import Game from './Classes'
import init from './assetInit'

window.onload = () => {
    init()
    var game = new Game.GameManager()
}

