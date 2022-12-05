import type { IceMenu, FlavorName } from './types/types'

export class IceCreamGachaService {
  iceMenu: IceMenu

  constructor(iceMenu: IceMenu) {
    this.iceMenu = iceMenu
  }

  gacha(): FlavorName {
    // アイスのメニューからランダムで1つを返す
    const targetIndex = Math.floor(Math.random() * this.iceMenu.length)
    return this.iceMenu[targetIndex]
  }
}
