//
//  Cardify.swift
//  Memorize
//
//  Created by Innei on 18/7/2020.
//  Copyright © 2020 Innei. All rights reserved.
//

import SwiftUI

struct Cardify: ViewModifier {
    var isFaceUp: Bool
    func body(content: Content) -> some View {
        ZStack {
            if isFaceUp {
                RoundedRectangle(cornerRadius: cornerRadius).fill(Color.white)

                RoundedRectangle(cornerRadius: cornerRadius).stroke(lineWidth: 3)
                content
            } else {
                RoundedRectangle(cornerRadius: cornerRadius).fill()
            }
        }
        .foregroundColor(Color.orange)

        .cornerRadius(cornerRadius)
    }

    // MARK: - constant

    private let cornerRadius: CGFloat = 15
}

extension View {
    func cardify(isFaceUp: Bool) -> some View {
        modifier(Cardify(isFaceUp: isFaceUp))
    }
}
