export type IceCream = {
  flavor: FlavorName
  position: Position
};

export type Position = {
    x: number
    y: number
};
export type FlavorName = String

export type IceMenu = Array<FlavorName>

