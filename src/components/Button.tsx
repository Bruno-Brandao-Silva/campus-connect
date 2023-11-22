import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';
import { useState } from 'react';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <ButtonNativeBase
      w="full"
      h={14}
      bg={variant === 'outline' ? (isPressed ? 'yellow.100' : 'transparent') : 'yellow.100'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="yellow.100"
      rounded="sm"
      onPress={() => setIsPressed(true)}
      _pressed={{
        bg: variant === 'outline' ? 'yellow.100' : 'yellow.600'
      }}
      {...rest}
    >
      <Text
        fontFamily="heading"
        fontSize="lg"
        color={variant === 'outline' ? (isPressed ? 'green.100' : 'yellow.100') : 'green.200'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}