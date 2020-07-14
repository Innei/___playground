//
//  ContentView.swift
//  MemoryGame
//
//  Created by Innei on 14/7/2020.
//  Copyright © 2020 Innei. All rights reserved.
//

import SwiftUI

struct CardView: View {
    var vm: EmojiMemoryGame = EmojiMemoryGame(content: ["🌼", "🌻"])
//    @State var isFaceUp: Bool = false
    var body: some View {
        VStack {
            ForEach(0 ..< 4) { _ in
                HStack {
                    ForEach(self.vm.cards) { card in
                        ZStack {
                            if card.isFaceUp {
                                RoundedRectangle(cornerRadius: 5.0).stroke()
                                Text(card.content)
                            } else {
                                RoundedRectangle(cornerRadius: 5.0).fill()
                            }
                        }
                    }
                }
            }
        }

        .foregroundColor(Color.orange)
        .font(.system(size: 64.0))
        .padding()
        .cornerRadius(5.0)
    }
}

struct ContentView: View {
    var body: some View {
        HStack {
            CardView()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
