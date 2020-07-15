//
//  ArrayExtension.swift
//  MemoryGame
//
//  Created by Innei on 15/7/2020.
//  Copyright © 2020 Innei. All rights reserved.
//

extension Array where Element: Identifiable {
    func firstIndex(matching: Element) -> Int? {
        for i in 0 ..< count {
            if matching.id == self[i].id {
                return i
            }
        }
        return nil
    }
}

extension Array {
    var only: Element? {
        return count == 1 ? first : nil
    }
}
