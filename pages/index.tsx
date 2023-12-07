/* eslint-disable */
import { cacheItems, getItems, getItem } from "@/utils/cacheItems";
import { useMemo, useState } from "react";
import { createAssetsStructure } from "@/utils/createAssetsStructure";
import "../items/index";

import { Header } from "aminhp93header";

cacheItems(require.context("../items", true, /^(?!.*.test.tsx$).*\.tsx$/));

const Page = (props: any) => {
  console.log({ props });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const itemList: any = useMemo(() => {
    return createAssetsStructure(getItems(), {}).flatMap(
      (item: any) => item.content
    );
  }, []);

  console.log({ itemList, selectedItem });
  const ItemComponent = selectedItem && getItem(selectedItem?.id).component;

  return (
    <div>
      Items
      <Header />
      {itemList.map((i: any) => {
        return (
          <div onClick={() => setSelectedItem(i)}>
            {i.id} - {i.name}{" "}
          </div>
        );
      })}
      {selectedItem && (
        <ItemComponent {...getItem(selectedItem?.id).properties} />
      )}
    </div>
  );
};

export default Page;
