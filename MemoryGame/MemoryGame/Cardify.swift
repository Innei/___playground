//
//  Cardify.swift
//  Memorize
//
//  Created by Innei on 18/7/2020.
//  Copyright © 2020 Innei. All rights reserved.
//

import SwiftUI

struct Cardify: AnimatableModifier {
    var rotation: Double
    var isFaceUp: Bool {
        rotation < 90
    }

    init(isFaceUp: Bool) {
        rotation = isFaceUp ? 0 : 180
    }

    var animatableData: Double {
        get { rotation }
        set {
            rotation = newValue
        }
    }

    func body(content: Content) -> some View {
        ZStack {
            Group {
                RoundedRectangle(cornerRadius: cornerRadius).fill(Color.white)

                RoundedRectangle(cornerRadius: cornerRadius).stroke(lineWidth: 3)
                content
            }.opacity(isFaceUp ? 1 : 0)

            RoundedRectangle(cornerRadius: cornerRadius)
                .fill()
                .opacity(isFaceUp ? 0 : 1)
        }
        .cornerRadius(cornerRadius)
        .rotation3DEffect(Angle.degrees(animatableData), axis: (0, 1, 0))
    }

    // MARK: - constant

    private let cornerRadius: CGFloat = 15
}

extension View {
    func cardify(isFaceUp: Bool) -> some View {
        modifier(Cardify(isFaceUp: isFaceUp))
    }
}
