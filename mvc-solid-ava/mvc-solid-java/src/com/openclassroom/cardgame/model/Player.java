package com.openclassroom.cardgame.model;

public class Player {
    private String name;

    public String getName() {
        return name;
    }

    private Hand hand;

    public Player(String name) {
        this.name = name;
        this.hand = new Hand();
    }

    public void addCardToHand(PlayingCard playingCard) {
        this.hand.addCard(playingCard);
    }

    public PlayingCard getCard(int index) {
        return this.hand.getCard(index);
    }

    public PlayingCard removeCard() {
        return this.hand.removeCard();
    }
}
