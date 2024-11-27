package com.openclassroom.cardgame.games;

import java.util.List;

import com.openclassroom.cardgame.model.Player;

public interface GameEvaluator {
    public Player evaluateWinner(List<Player> players);
}
