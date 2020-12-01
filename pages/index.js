import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";
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
import { loadMenu } from "redux/actions";

export default function Home({ menu }) {
  const dispatch = useDispatch();

  const [listViewOn, setListViewOn] = useState(false);

  useEffect(() => {
    if (menu.length > 0) {
      dispatch(loadMenu(menu));
    }
  }, [menu]);

  return (
    <AppContainer>
      <SEO
        title="Menu"
        description="View today's available items in Pizzeria's menu."
      />

      <Stack width="full" height="full" py={8}>
        <Heading as="h1" fontSize="2xl" textAlign="center">
          Today's Menu
        </Heading>

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
          pt={8}
          spacing={12}
          justify={listViewOn ? "center" : "flex-start"}
        >
          {menu.map(item => (
            <MenuItemCard
              as={WrapItem}
              key={item.id}
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
  const props = { menu: [] };

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
    const response = await axios.get(url);

    if (response.data?.menu) props.menu = response.data.menu;

    console.log(">> Menu items fetched server-side.");
  } catch (err) {
    console.log("Fetch Menu ERROR:", err.message);
  }

  return { props };
}
