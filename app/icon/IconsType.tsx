export const IconType = (id: number) => {
  switch (id) {
    case IconTypes.Solid: {
      return "solid";
    }
    case IconTypes.Regular: {
      return "regular";
    }
    case IconTypes.Brands: {
      return "brands";
    }
    case IconTypes.Light: {
      return "light";
    }
  }
  return "regular";
};

export enum IconTypes {
  Solid,
  Regular,
  Light,
  Brands,
}
export enum Levels {
  level1,
  level2,
  level3,
}
