import {
  Center,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUpLeft,
  IconArrowUpRight,
} from "@tabler/icons";

interface props {
  mood: "Happy" | "Sad" | "Anger";
}

const icons = {
  Happy: IconArrowUpRight,
  Anger: IconArrowUpLeft,
  Sad: IconArrowDown,
};

export function Mood({ mood }: props) {
  const Icon = icons?.[mood];
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      <Paper>
        <Group>
          <RingProgress
            label={
              <Text size="xs" align="center">
                <Center>
                  <Icon size={30} stroke={2} />
                </Center>
              </Text>
            }
            roundCaps
            sections={[
              { value: 33, color: "green", tooltip: "Happy" },
              { value: 33, color: "#FFEA00", tooltip: "Sad" },
              { value: 34, color: "red", tooltip: "Anger" },
            ]}
          />
          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {"Emotional State"}
            </Text>
            <Text weight={700} size="xl">
              {mood}
            </Text>
          </div>
        </Group>
      </Paper>
    </SimpleGrid>
  );
}
