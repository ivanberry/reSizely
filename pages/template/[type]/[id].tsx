import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

import Controller from "../../../components/Controller";
import EditableTable from "../../../components/EditableTable";
import { IMAGE_MAP_WITH_TYPE } from "../../../utils/data";

interface IProps {
  type: string;
}

let count = 0;

/**
 * 模版编辑页面，包含了模板大类，小类 type.id
 */
export default function Template(props: IProps) {
  const router = useRouter();
  const { id, type } = router.query;

  const [tableBody, setTableBody] = useState<any>([]);
  const [tableHeader, setTableHeader] = useState<any>([]);

  useEffect(() => {
    // @ts-ignore
    const header = IMAGE_MAP_WITH_TYPE.get(type as string)
      .find((item: any) => item.imageType === id)
      .feature.map((f: any, index: number) => ({ name: f, key: index }));

    const body = Array(header.length + 2)
      .fill(0)
      .map((_, index) => {
        return { key: count++ };
      });

    // add custom header to the header
    header.unshift({ key: count++, name: "custom" });
    setTableHeader(header);
    setTableBody([body]);
  }, [type]);

  // 新增行, key值可以有更好的方案，比如自增数字，或者uuid
  const add = () => {
    const newTableBody = cloneDeep(tableBody);
    newTableBody.push(
      Array(tableHeader.length + 1)
        .fill(0)
        .map((_, index) => {
          return { key: count++ };
        })
    );
    setTableBody(newTableBody);
  };

  const update = (value: any) => {
    console.log("update value", value);
  };

  return (
    <section className="container gap-8 columns-1">
      <Controller />
      <Image src={`/images/${id}.jpg`} width={400} height={400} />
      <section>
        <button onClick={add}>Add</button>
        <EditableTable header={tableHeader} body={tableBody} update={update} />
      </section>
      <button className="py-3 px-10 rounded-full bg-sky-500 text-white my-4">
        Generate
      </button>
    </section>
  );
}

// why should add this?
export async function getServerSideProps() {
  return {
    props: {},
  };
}
