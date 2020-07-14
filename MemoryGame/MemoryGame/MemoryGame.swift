//
//  MemoryGame.swift
//  detail
//
//  Created by Innei on 14/7/2020.
//  Copyright © 2020 mx-space. All rights reserved.
//

import Foundation

struct MemoryGameModel<CardContent> {
    var cards: [Card] = []

    struct Card: Identifiable {
        var isFaceUp = false
        var isMatched = false
        var content: CardContent
        var id: Int
    }

    init(numberOfParis: Int, contentFactory: (Int) -> CardContent) {
        for index in 0 ..< numberOfParis {
            cards.append(Card(content: contentFactory(index), id: index * 2))
            cards.append(Card(content: contentFactory(index), id: index * 2 + 1))
        }
    }

    func choise() {
        print(cards)
    }
}
