package com.openclassroom.cardgame;

import com.openclassroom.cardgame.controller.GameController;
import com.openclassroom.cardgame.games.HighCardGameEvaluator;
import com.openclassroom.cardgame.model.Deck;
import com.openclassroom.cardgame.view.CommandViewLine;
import com.openclassroom.cardgame.view.GameSwingView;

public class App {

    public static void main(String args[]) {
        GameController gameController = new GameController(new Deck(), new GameSwingView(),
                new HighCardGameEvaluator());
        gameController.run();
    }
}