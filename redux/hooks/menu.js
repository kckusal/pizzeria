import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

function useMenu() {
  const itemsById = useSelector(state => state.menu.itemsById);
  const itemIds = useSelector(state => state.menu.itemIds);
  const count = Object.keys(itemIds).length;

  return { itemsById, count };
}

export default useMenu;
