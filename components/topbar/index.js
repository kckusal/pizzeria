import dynamic from "next/dynamic";

import { Flex } from "@chakra-ui/react";

import AppContainer from "components/AppContainer";
import LeftPanel from "./LeftPanel";

const RightPanelWithNoSSR = dynamic(() => import("./RightPanel"), {
  ssr: false
});

function Topbar() {
  return (
    <Flex
      height="50px"
      position="sticky"
      top="0"
      bg="primary.400"
      color="gray.100"
      zIndex="banner"
      boxShadow="4"
    >
      <AppContainer
        justify="space-between"
        align="center"
        px={4}
        maxWidth={900}
      >
        <LeftPanel />
        <RightPanelWithNoSSR />
      </AppContainer>
    </Flex>
  );
}

export default Topbar;
