import { BackButton, HomeButton, BackIcon, Container, Logo } from "./styles";
import { useNavigation } from "@react-navigation/native";

import logoImg from "@assets/logo.png";

type props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: props) {
  const navigation = useNavigation();

  function gotoBackScreen() {
    navigation.goBack();
  }

  function gotoHomeScreen() {
    navigation.navigate("groups");
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={gotoBackScreen}>
          <BackIcon />
        </BackButton>
      )}
      <HomeButton onPress={gotoHomeScreen}>
        <Logo source={logoImg} />
      </HomeButton>
    </Container>
  );
}
