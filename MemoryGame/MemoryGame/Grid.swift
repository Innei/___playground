//
//  Grid.swift
//  MemoryGame
//
//  Created by Innei on 15/7/2020.
//  Copyright © 2020 Innei. All rights reserved.
//

import SwiftUI

struct Grid<Item, ItemView>: View where Item: Identifiable, ItemView: View {
    var items: [Item]
    var viewForItem: (Item) -> ItemView
    var body: some View {
        GeometryReader { proxy in
            self.body(for: GridLayout(itemCount: self.items.count, in: proxy.size))
        }
    }

    func body(for layout: GridLayout) -> some View {
        ForEach(items) { item in
            self.body(for: item, in: layout)
        }
    }

    func body(for item: Item, in layout: GridLayout) -> some View {
        let index = items.firstIndex(matching: item)
        return viewForItem(item).frame(width: layout.itemSize.width, height: layout.itemSize.height)
            .position(layout.location(ofItemAt: index))
    }
}

// struct Grid_Previews: PreviewProvider {
//    static var previews: some View {
//        Grid()
//    }
// }
