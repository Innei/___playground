//
//  EmojiMemoryGame.swift
//  detail
//
//  Created by Innei on 14/7/2020.
//  Copyright © 2020 mx-space. All rights reserved.
//

import SwiftUI

class EmojiMemoryGame: ObservableObject {
    @Published private(set) var model: MemoryGameModel<String>

    init() {
        model = EmojiMemoryGame.createGame(contents: ["🌝", "🌚", "🌎"])
    }

    init(content: [String]) {
        model = EmojiMemoryGame.createGame(contents: content)
    }

    static func createGame(contents: [String]) -> MemoryGameModel<String> {
        return MemoryGameModel<String>(numberOfParis: contents.count) { i in
            contents[i]
        }
    }

    func choice(card: MemoryGameModel<String>.Card) {
        model.choice(card: card)
    }

    var cards: [MemoryGameModel<String>.Card] {
        model.cards
    }
}
