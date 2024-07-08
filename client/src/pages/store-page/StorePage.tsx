import ItemCard from "./components/ItemCard"
import PageNavigator from "../base.components/PageNavigator";
import { useEffect, useState } from "react";
import { ItemCardType } from "../../types";
import axios from "axios";
import MenuBar from "./components/MenuBar";

const StorePage = () => {
    const API_URL = 'http://10.4.53.25:9999';
    const [items, setItems] = useState<ItemCardType[]>([]);

    useEffect(() => {
      const url = `${API_URL}/inventory?filter=getItems`;
      axios.get(url).then(res => {
        setItems([...res.data]);
      });
    }, []);
    
      return (
        <div className="h-screen bg-secondary-800 flex">
          <div className="w-[10%] flex justify-center items-center">
            <PageNavigator page="" />
          </div>
          <div className="w-[80%] flex flex-col justify-center gap-5">
            <MenuBar />
            <div className="grid grid-flow-row auto-rows-min grid-cols-6 gap-5">
              {
                items.map((item, idx) => {
                  return <ItemCard key={idx} itemCard={item} />
                })
              }
            </div>
          </div>
          <div className="w-[10%] flex justify-center items-center">
          </div>
        </div>
      );
}

export default StorePage;