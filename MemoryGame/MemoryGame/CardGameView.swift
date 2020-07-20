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

    @ViewBuilder
    func body(proxy: GeometryProxy) -> some View {
        if card.isFaceUp || !card.isMatched {
            ZStack {
                Pie(startAngle: .degrees(-90), endAngle: .degrees(110 - 90)).opacity(0.4)
                    .padding(6)

                Text(self.card.content)
                    .font(Font.system(size: getFontSize(size: proxy.size)))
                    .rotationEffect(Angle.degrees(card.isMatched ? 360 : 0))
                    .animation(card.isMatched ? Animation.linear(duration: 1).repeatForever(autoreverses: false) : .default)
            }
            .cardify(isFaceUp: card.isFaceUp)

            .transition(AnyTransition.scale)
        }
    }

    private func getFontSize(size: CGSize) -> CGFloat {
        min(size.height, size.width) * 0.65
    }
}

struct CardGameView: View {
    @ObservedObject var vm: EmojiMemoryGame = EmojiMemoryGame(content: ["🌼", "🌻", "🥧", "🌚", "🍦"])
    var body: some View {
        ZStack {
            Color(UIColor.systemBackground).edgesIgnoringSafeArea(.all)
            VStack {
                HStack {
                    Grid(items: vm.cards) { card in

                        CardView(card: card).onTapGesture {
                            withAnimation(.linear(duration: 0.75)) {
                                self.vm.choice(card: card)
                            }
                        }
                        .foregroundColor(Color.orange)
                        .padding(3)
                    }
                }.padding()

                Button(action: {
                    self.vm.resetGame()
                }, label: {
                    Text("Reset").foregroundColor(.red)
                })
            }
        }
    }
}

class ContentView_Previews: PreviewProvider {
    static var previews: some View {
        let game = EmojiMemoryGame()
        game.choice(card: game.cards[0])
        return CardGameView(vm: game)
    }
}
