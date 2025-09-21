//Images

// use Expo-Image to load images, use useWindowDimensions to get the width of the screen and render the image in the proper width

// import { Image, useWindowDimensions } from "react-native";

export function PlantlyImage() {
  const { width } = useWindowDimensions();
  const imageSize = Math.min(width / 1.5, 400);
  return (
    <Image
      source={require("@/assets/plantly.png")}
      style={{ width: imageSize, height: imageSize }}
    />
  );
}

// Navigation
// for Link if you render a component you need to pass asChild prop to render the component as a child of the Link
// to make a full screen modal you need to place the modal to the same level to render it on top of the tabs
