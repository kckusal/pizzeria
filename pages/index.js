import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

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

export default function Home({ menu: { items } }) {
  const dispatch = useDispatch();

  const [listViewOn, setListViewOn] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      dispatch(loadMenu(items));
    }
  }, []);

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

        <Wrap pt={8} spacing={8}>
          {items.map((item, i) => (
            <MenuItemCard
              as={WrapItem}
              key={i}
              data={item}
              horizontal={listViewOn}
            />
          ))}
        </Wrap>
      </Stack>
    </AppContainer>
  );
}

Home.getInitialProps = async () => {
  return {
    menu: {
      items: [
        {
          id: 1,
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/f863041741c3f9ee037075aed8012aa3.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "20",
          currencyCode: "usd",
          discount: 20
        },

        {
          id: 2,
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/d091ceb09c21e319a51cc8df10784dfb.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "40",
          currencyCode: "usd"
        },

        {
          id: 3,
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/07251fc98d3c680af6f65c672eccc26a.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "25",
          currencyCode: "usd",
          discount: 50
        },

        {
          id: 4,
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/de184c7f73f381efcd5e79ef61ea7b95.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "30",
          currencyCode: "usd"
        },

        {
          id: 5,
          title: "Sample Pizza Title",
          type: "dominos",
          image:
            "https://oop2.pizzahut.ru/product_pics/small//4/065e0d76b81b09780c04e8ce95a423ad.png",
          ingredients:
            "Томатный соус, сыр Моцарелла, курица, грибы, сладкий перец, красный лук, маслины",
          price: "28",
          currencyCode: "usd"
        }
      ]
    }
  };
};
