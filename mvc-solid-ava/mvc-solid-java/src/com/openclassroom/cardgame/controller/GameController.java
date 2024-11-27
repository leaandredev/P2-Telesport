package com.openclassroom.cardgame.controller;

import java.util.ArrayList;
import java.util.List;

import com.openclassroom.cardgame.games.GameEvaluator;
import com.openclassroom.cardgame.model.Deck;
import com.openclassroom.cardgame.model.Player;
import com.openclassroom.cardgame.model.PlayingCard;
import com.openclassroom.cardgame.view.GameViewable;

public class GameController {

    enum GameState {
        AddingPlayers, CardsDealt, WinnerRevealed;
    }

    Deck deck;
    List<Player> players;
    Player winner;
    GameViewable view;
    GameState gameState;
    GameEvaluator evaluator;

    public GameController(Deck deck, GameViewable view, GameEvaluator evaluator) {
        super();
        this.deck = deck;
        this.view = view;
        this.players = new ArrayList<Player>();
        this.gameState = GameState.AddingPlayers;
        this.evaluator = evaluator;
        this.view.setController(this);
    }

    public void run() {
        while (gameState == GameState.AddingPlayers) {
            view.promptForPlayerName();
        }

        switch (gameState) {
            case CardsDealt:
                view.promptForFlip();
                break;
            case WinnerRevealed:
                view.promptForNewGame();
                break;
        }
    }

    public void addPlayer(String playerName) {
        if (gameState == GameState.AddingPlayers) {
            players.add(new Player(playerName));
            view.showPlayerName(players.size(), playerName);
        }
    }

    public void startGame() {
        if (gameState != GameState.CardsDealt) {
            deck.shuffle();
            int playerIndex = 1;
            for (Player player : players) {
                player.addCardToHand(deck.removeTopCard());
                view.showFaceDownCardForPlayer(playerIndex++, player.getName());
            }
            gameState = GameState.CardsDealt;
        }
        this.run();
    }

    public void endGame() {
        System.exit(0);
    }

    public void nextAction(String answer) {
        if (answer == "Y") {
            this.startGame();
        } else {
            this.endGame();
        }
    }

    public void flipCards() {
        int playerIndex = 1;
        for (Player player : players) {
            PlayingCard pc = player.getCard(0);
            pc.flip();
            view.showCardForPlayer(playerIndex++, player.getName(),
                    pc.getRank().toString(), pc.getSuit().toString());
        }

        evaluateWinner();
        displayWinner();
        rebuildDeck();
        gameState = GameState.WinnerRevealed;
        this.run();
    }

    void evaluateWinner() {
        this.winner = this.evaluator.evaluateWinner(players);
    }

    void displayWinner() {
        view.showWinner(winner.getName());
    }

    void rebuildDeck() {
        for (Player player : players) {
            deck.returnCardToDeck(player.removeCard());
        }
    }

}
