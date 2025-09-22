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

<Stack.Screen
  name="new"
  options={{
    presentation: "modal",
    title: "New Plant",
    animation: "fade",
  }}
/>;

// Keyboard

// npx expo install react-native-keyboard-aware-scroll-view
// Use this not to let the keyboard cover the input fields

<KeyboardAwareScrollView
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
  keyboardShouldPersistTaps="handled"
>
  <View style={styles.centered}>
    <PlantlyImage />
  </View>
  <Text style={styles.label}> Name</Text>
  <TextInput
    style={styles.input}
    value={plant.name}
    onChangeText={text => setPlant({ ...plant, name: text })}
    placeholder="Add a plant"
    autoCapitalize="words"
  />
  <Text style={styles.label}>Watering Frequency (every x days)</Text>
  <TextInput
    style={styles.input}
    value={plant.wateringFrequency}
    onChangeText={text => setPlant({ ...plant, wateringFrequency: text })}
    placeholder="E.g. Every 5 days"
    keyboardType="number-pad"
  />
  <PlantlyButton title="Add Plant" onPress={handleSubmitPlant} />
</KeyboardAwareScrollView>;
//
