import NextLink from "next/link";

import { Link as ChakraLink } from "@chakra-ui/react";

const Link = ({
  children,
  href,
  as,
  passHref = true,
  prefetch,
  scroll,
  replace,
  shallow,
  ...restProps
}) => {
  const handleMouseUp = e => {
    console.log("should blur");
    e.target.blur();
  };

  return (
    <NextLink
      href={href}
      as={as}
      passHref
      prefetch={prefetch}
      scroll={scroll}
      replace={replace}
      shallow={shallow}
      onMouseUp={handleMouseUp}
    >
      <ChakraLink {...restProps}>{children}</ChakraLink>
    </NextLink>
  );
};

export default Link;
