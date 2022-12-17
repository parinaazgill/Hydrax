import React from "react";
import { IconRun } from "@tabler/icons";
import { Title } from "@mantine/core";
export const TitleIcon = () => {
  return (
    <div>
      <Title style={{ fontSize: "30px", fontWeight: "500" }}>
        <IconRun size={"27"} style={{ marginRight: "3px" }} />
        Hydrax
      </Title>
      {/* <p>DashBoard</p> */}
    </div>
  );
};
