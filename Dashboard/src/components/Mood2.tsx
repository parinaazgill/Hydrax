import {
  Center,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  IconMoodAngry,
  IconMoodNeutral,
  IconMoodSad,
  IconMoodSick,
  IconMoodSmileBeam,
  IconMoodSmileDizzy,
  IconMoodSuprised,
  IconMoodWrrr,
} from "@tabler/icons";

interface props {
  mood:
    | "Happy"
    | "Sad"
    | "Anger"
    | "Disgust"
    | "Fear"
    | "Mixed"
    | "Neutral"
    | "Surprise";
}
const color = {
  Fear: "#ff00ff",
  Happy: "#80ff80",
  Anger: "red",
  Sad: "#4d5d53",
  Surprise: "#FFEA00",
  Disgust: "#006600",
  Mixed: "#f2f2f2",
  Neutral: "#00ffff",
};
const icons = {
  Happy: IconMoodSmileBeam,
  Anger: IconMoodAngry,
  Surprise: IconMoodSuprised,
  Sad: IconMoodSad,
  Disgust: IconMoodWrrr,
  Fear: IconMoodSick,
  Mixed: IconMoodSmileDizzy,
  Neutral: IconMoodNeutral,
};

export function Mood2({ mood }: props) {
  const Icon = icons?.[mood];
  return (
    <SimpleGrid cols={1} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      <Paper>
        <Group>
          <RingProgress
            label={
              <Text size="xs" align="center">
                <Center>
                  <Icon size={35} stroke={2} />
                </Center>
              </Text>
            }
            roundCaps
            sections={[{ value: 100, color: color?.[mood] }]}
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
