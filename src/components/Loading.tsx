import { Center, Spinner } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bg={"purple.900"}>
      <Spinner color={"orange.600"} size={"lg"} />
    </Center>
  )
}