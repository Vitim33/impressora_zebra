import { Pressable, Text, TextStyle, ViewStyle } from 'react-native';

interface Props {
  item: { name: string; address: string };
  ativo: boolean;
  onPress: () => void;
  style: {
    item: ViewStyle;
    itemAtivo: ViewStyle;
    itemTxt: TextStyle;
    itemTxtAtivo: TextStyle;
  };
}

export function PrinterItem({ item, ativo, onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[style.item, ativo && style.itemAtivo]}
    >
      <Text style={[style.itemTxt, ativo && style.itemTxtAtivo]}>
        {item.name} — {item.address}
      </Text>
    </Pressable>
  );
}
