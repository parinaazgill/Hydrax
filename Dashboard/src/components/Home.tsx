import React, { useEffect, useState } from "react";
import { HeaderTabs } from "./Navbar2";
import { db } from "../firebase";
import { StatsRing } from "./StatsRing";
import { ref, onValue, set } from "firebase/database";
import {
  Badge,
  Center,
  Container,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { Mood2 } from "./Mood2";
import { Graph2 } from "./Graph2";
import { Graph } from "./Graph";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { IconCircle } from "@tabler/icons";
interface LatestData {
  "Emotional State":
    | "Happy"
    | "Sad"
    | "Anger"
    | "Disgust"
    | "Fear"
    | "Mixed"
    | "Neutral"
    | "Surprise";
  Heartbeat: number;
  "Hydration Status": number;
}
interface Graphdata {
  index: number;
  data: number;
}

export const Home = () => {
  const [HeartData, setHeartData] = useState<Graphdata>();
  const [HydrationData, setHydrationData] = useState<Graphdata>();
  const AuthFunc = useAuth();
  const navigate = useNavigate();
  const [lastData, setLastData] = useState<LatestData>({
    "Emotional State": "Neutral",
    "Hydration Status": 0.0,
    Heartbeat: 0,
  });
  useEffect(() => {
    if (AuthFunc?.currentUser === null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const dbref = ref(db, `${AuthFunc?.currentUser?.email?.split("@")[0]}`);
    // console.log(AuthFunc?.currentUser?.email?.split("@")[0]);
    // const dbref = ref(db, `John`);
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        setLastData(data[data.length - 1]);
        // console.log(Array.from(data));
        const Heartdata = data.map((user: LatestData, index: number) => {
          if (user) return { index: index, data: user.Heartbeat };
        });
        setHeartData(Heartdata);
        const Hydreationdata = data.map((user: LatestData, index: number) => {
          if (user) return { index: index, data: user["Hydration Status"] };
        });
        setHydrationData(Hydreationdata);
      }
    });
  }, []);
  // console.log();
  // console.log(HydrationData);

  return (
    <>
      <HeaderTabs
        tabs={[]}
        user={{
          name: `${AuthFunc?.currentUser?.email?.split("@")[0]}`,
          image: null,
        }}
      />

      <Container style={{ marginTop: "6vh" }}>
        <SimpleGrid cols={1} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <StatsRing
            data={[
              {
                label: "Heartbeat",
                stats: `${lastData?.Heartbeat}`,
                progress: (lastData?.Heartbeat / 180) * 100,
                color: "teal",
                icon: "heart",
              },
              {
                label: "Hydration",
                stats: `${lastData?.["Hydration Status"]}`,
                progress: (lastData?.["Hydration Status"] / 1.029) * 100,
                color: "blue",
                icon: "water",
              },
            ]}
          />
          <Mood2 mood={lastData?.["Emotional State"]} />
        </SimpleGrid>
      </Container>

      {HeartData && (
        <Container maw="600px" mt="10vh">
          <Graph2 data={HeartData} />
          <Center>
            <Text color="dimmed" size="md" transform="uppercase" weight={700}>
              HeartBeat
            </Text>
          </Center>
        </Container>
      )}

      {HydrationData && (
        <Container maw="600px" mt="10vh" mb="15vh">
          <Graph data={HydrationData} />
          <Center>
            <Flex
              w={"80%"}
              m={"auto"}
              style={{ justifyContent: "space-around" }}
            >
              <Group>
                <Badge size="xs" color={"red"}>
                  0 - 0.35
                </Badge>
                <Text size={"xs"}>Dehydrated</Text>
              </Group>
              <Group>
                <Badge size="xs">0.35 - 0.65</Badge>
                <Text size={"xs"}>M Hydrated</Text>
              </Group>
              <Group>
                <Badge size="xs" color={"green"}>
                  {"0.65 <"}
                </Badge>
                <Text size={"xs"}>Hydrated</Text>
              </Group>
            </Flex>
          </Center>
          <Center>
            <Text
              color="dimmed"
              size="md"
              transform="uppercase"
              weight={700}
              mt={"2vh"}
            >
              Hydration
            </Text>
          </Center>
        </Container>
      )}
    </>
  );
};
