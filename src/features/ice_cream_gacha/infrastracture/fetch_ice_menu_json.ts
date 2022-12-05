import type { IceMenu } from '../types/types'

export async function fetchIceMenu(): Promise<IceMenu> {
  let iceMenu: IceMenu = []

  await fetch('ice_menu.json')
    .then((res) => res.json())
    .then((data) => {
      iceMenu = Object.keys(data)
    })
  return iceMenu
}

export async function fetchAllFlavorImages(iceMenu: IceMenu): Promise<void>{
  // 全Flavorの画像を先読みする
  await Promise.all(
    iceMenu.map((flavorName) => {
      fetch(`image/flavors/${flavorName}.png`)
    })
  )
}