import PropertyList from "@/components/property/PropertyList";
import { cacheItems, getItems, getItem } from "@/utils/cacheItems";
import { useMemo, useState } from "react";
import { createAssetsStructure } from "@/utils/createAssetsStructure";

// load content of all files in components folder
// let xxx: any;
// import("../components").then((res) => {
//   console.log(res);
//   xxx = res;
// });

cacheItems(require.context("../items", true, /^(?!.*.test.tsx$).*\.tsx$/));

const Page = () => {
  // if (!xxx) return;

  // const handleChange = (data: any) => {
  //   console.log("changed", data);
  // };

  console.log(getItems());

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const props = {
    data: {},
    // instance: oneSelectedItemKey,
    // id: items[oneSelectedItemKey]?.legacy?.itemType,
    // properties: items[oneSelectedItemKey]?.legacy?.itemProperties,
  };

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
      <PropertyList
        {...props}
        isMultiSelect={false}
        // onChange={(data: ItemLegacyItemProperties) => handleChange({ data })}
        // onSave={handleSave}
      />
    </div>
  );
};

export default Page;
