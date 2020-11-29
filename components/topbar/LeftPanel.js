import { Flex, Heading } from "@chakra-ui/react";

import Link from "components/Link";

function LeftPanel() {
  return (
    <Flex width="full" height="full" align="center">
      <Heading as="h1" fontSize="3xl">
        <Link href="/">Pizzeria</Link>
      </Heading>
    </Flex>
  );
}

export default LeftPanel;
