import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconChevronDown } from "@tabler/icons";
import { TitleIcon } from "./title";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    // marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

interface HeaderTabsProps {
  user: { name: string; image: string | null };
  tabs: string[];
}

export function HeaderTabs({ user, tabs }: HeaderTabsProps) {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [error, setError] = useState("");
  const AuthFunc = useAuth();

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab}>
      {tab}
    </Tabs.Tab>
  ));

  async function handleLogout() {
    setError("");

    try {
      await AuthFunc?.logout();
      // navigate(`/login`);
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <div className={classes.header}>
        <Container className={classes.mainSection}>
          <Group position="apart">
            <TitleIcon />

            {/* <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          /> */}

            <Menu
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={user.image}
                      alt={user.name}
                      radius="xl"
                      size={20}
                    />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  icon={<IconLogout size={14} stroke={1.5} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        <Container>
          <Tabs
            defaultValue="Home"
            variant="outline"
            classNames={{
              root: classes.tabs,
              tabsList: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      </div>
    </>
  );
}
