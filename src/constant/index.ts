/*
creatorEnum：创建人枚举
*/
interface CreatorItem {
  name: string;
  id: string;
}

const creatorGen = () => {
  const list: CreatorItem[] = new Array(13).fill('').map((el, idx) => {
    return {
      name: `黑客松第 ${idx + 1} 组(202303)`,
      id: `黑客松第 ${idx + 1} 组(202303)`,
    };
  });

  return list.reduce(
    (res: any, cur: any) => {
      res[cur.id] = {
        text: cur.name,
        id: cur.id,
      };
      return res;
    },
    {} as {
      text: string;
      id: string;
    },
  );
};
export const creatorEnum = creatorGen();

/*
creatorEnum：数据库枚举
*/
export const projectEnum = [
  { label: 'web3_maxCompute', value: 'web3_maxCompute' },
  { label: 'web3_maxCompute_dev', value: 'web3_maxCompute_dev' },
  { label: 'web3_co', value: 'web3_co' },
  { label: 'web3_co_dev', value: 'web3_co_dev' },
];
