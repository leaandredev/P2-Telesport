package com.openclassroom.cardgame.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class Deck {
    private List<PlayingCard> cards;

    public Deck() {
        this.cards = new ArrayList<PlayingCard>();
        for (Rank rank : Rank.values()) {
            for (Suit suit : Suit.values()) {
                System.out.println("Creating card : [" + rank + "][" + suit + "]");
                this.cards.add(new PlayingCard(rank, suit));
            }
        }

        this.shuffle();
    }

    public void shuffle() {
        Random random = new Random();
        for (int i = 0; i < this.cards.size(); ++i) {
            Collections.swap(this.cards, i, random.nextInt(cards.size()));
        }
    }

    public PlayingCard removeTopCard() {
        return this.cards.remove(0);
    }

    public void returnCardToDeck(PlayingCard card) {
        this.cards.add(card);
    }

    public List<PlayingCard> getCards() {
        return this.cards;
    }
}
