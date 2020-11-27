import { Flex } from "@chakra-ui/react";

import AppContainer from "components/AppContainer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function Topbar() {
  return (
    <Flex
      height="50px"
      position="sticky"
      top="0"
      bg="primary.400"
      color="gray.100"
      zIndex="sticky"
      boxShadow="4"
    >
      <AppContainer
        justify="space-between"
        align="center"
        px={4}
        maxWidth={900}
      >
        <LeftPanel />
        <RightPanel />
      </AppContainer>
    </Flex>
  );
}

export default Topbar;
