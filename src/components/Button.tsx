import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      bg={variant === 'outline' ? 'transparent' : 'yellow.100'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'yellow.200'
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'white' : 'green.200'}
        fontFamily="heading"
        fontSize="lg"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}