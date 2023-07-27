import { Image, ImageSourcePropType, View } from "react-native";

type Props = { imageSize: number; stickerSource: ImageSourcePropType };

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
