import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Stack,
  Flex,
  Heading,
  Wrap,
  WrapItem,
  ButtonGroup,
  IconButton
} from "@chakra-ui/react";
import { BsListTask, BsGrid } from "react-icons/bs";

import AppContainer from "components/AppContainer";
import SEO from "components/seo";
import MenuItemCard from "components/menu-item-card";
import WithNoSSR from "components/WithNoSSR";
import { loadMenuSucceeded } from "redux/actions";

import { getMenuItems } from "pages/api/menu";

export default function Home({ menu }) {
  const dispatch = useDispatch();

  const [listViewOn, setListViewOn] = useState(false);
  const menuUpdatedAt = useSelector(state => state.menu.updatedAt);

  useEffect(() => {
    if (menu.length > 0) {
      dispatch(loadMenuSucceeded(menu));
    }
  }, [menu]);

  return (
    <AppContainer>
      <SEO
        title="Menu"
        description="View today's available items in Pizzeria's menu."
      />

      <Stack width="full" height="full" py={8}>
        <Stack>
          <Heading as="h1" fontSize="2xl" textAlign="center">
            Today's Menu
          </Heading>
          <Flex fontSize="0.9rem" justify="center">
            Last updated at{" "}
            <WithNoSSR>
              {menuUpdatedAt && new Date(menuUpdatedAt).toLocaleString()}
            </WithNoSSR>
          </Flex>
        </Stack>

        <Flex pt={2}>
          ** All the shown prices are discounts- and VAT- inclusive.
        </Flex>

        <Flex justify="flex-end" align="center">
          <ButtonGroup size="sm" isAttached variant="outline">
            <IconButton
              borderColor="gray.500"
              icon={<BsListTask />}
              mr="-1px"
              onClick={() => setListViewOn(true)}
            />
            <IconButton
              borderColor="gray.500"
              icon={<BsGrid />}
              onClick={() => setListViewOn(false)}
            />
          </ButtonGroup>
        </Flex>

        <Wrap
          width="auto"
          mx="auto"
          pt={8}
          spacing={12}
          justify={listViewOn ? "center" : "flex-start"}
        >
          {menu &&
            menu.map(item => (
              <MenuItemCard
                as={WrapItem}
                key={item._id}
                data={item}
                horizontal={listViewOn}
              />
            ))}
        </Wrap>
      </Stack>
    </AppContainer>
  );
}

export async function getServerSideProps() {
  const menu = await getMenuItems();

  return { props: { menu } };
}
