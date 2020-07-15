//
//  ContentView.swift
//  MemoryGame
//
//  Created by Innei on 14/7/2020.
//  Copyright © 2020 Innei. All rights reserved.
//

import SwiftUI

struct CardView: View {
    var card: MemoryGameModel<String>.Card

    var body: some View {
        GeometryReader { proxy in
            self.body(proxy: proxy)
        }
    }

    func body(proxy: GeometryProxy) -> some View {
        ZStack {
            if self.card.isFaceUp {
                RoundedRectangle(cornerRadius: cornerRadius).stroke(lineWidth: 3)
                Text(self.card.content)
            } else {
                if !card.isMatched {
                    RoundedRectangle(cornerRadius: cornerRadius).fill()
                }
            }
        }
        .foregroundColor(Color.orange)
        .font(Font.system(size: getFontSize(size: proxy.size)))

        .cornerRadius(cornerRadius)
    }

    // MARK: - constant

    let cornerRadius: CGFloat = 15
    func getFontSize(size: CGSize) -> CGFloat {
        min(size.height, size.width) * 0.75
    }
}

struct CardGameView: View {
    @ObservedObject var vm: EmojiMemoryGame = EmojiMemoryGame(content: ["🌼", "🌻", "🥧", "🌚", "🍦"])
    var body: some View {
        HStack {
            Grid(items: vm.cards) { card in

                CardView(card: card).onTapGesture {
                    self.vm.choice(card: card)
                }.padding(3)
            }
        }.padding()
    }
}

class ContentView_Previews: PreviewProvider {
    static var previews: some View {
        CardGameView()
    }
}
