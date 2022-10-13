import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { Container } from "./styles";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function gotoNewGroup() {
    navigation.navigate("newGroup");
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Só executa quando a aplicação inicializa
  // useEffect(() => {
  //   fetchGroups();
  // }, []);

  function gotoPressedGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      console.log("UseFocusEffect executou");
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => gotoPressedGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title="Criar nova turma" onPress={gotoNewGroup} />
    </Container>
  );
}
