import { Flex } from "@chakra-ui/react";

import Link from "components/Link";

function LeftPanel() {
  return (
    <Flex width="full" height="full" align="stretch" pt="1px" pb="2px">
      <Flex as={Link} fontSize="3xl" fontWeight="600" href="/">
        Pizzeria
      </Flex>
    </Flex>
  );
}

export default LeftPanel;
