import { Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";

const { width } = Dimensions.get("window");
export const MARGIN = 20;
export const SIZE = width / 2 - MARGIN;
export const COL = 2;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 300,
};

export const getPosition = (pos) => {
  "worklet";
  return {
    x: pos % COL === 0 ? 0 : SIZE * (pos % COL),
    y: Math.floor(pos / COL) * SIZE,
  };
};

export const getOrder = (tx, ty, max) => {
  "worklet";
  const x = Math.floor(tx / SIZE) * SIZE;
  const y = Math.floor(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
};
