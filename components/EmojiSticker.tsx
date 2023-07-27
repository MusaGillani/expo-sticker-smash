import { Image, ImageSourcePropType, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

type Props = { imageSize: number; stickerSource: ImageSourcePropType };

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    });

  const drag = Gesture.Pan().onChange(
    (e: GestureUpdateEvent<PanGestureChangeEventPayload>) => {
      "worklet";
      translateX.value = e.changeX + translateX.value;
      translateY.value = e.changeY + translateY.value;
    }
  );

  return (
    <GestureDetector gesture={drag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </AnimatedView>
    </GestureDetector>
  );
}
