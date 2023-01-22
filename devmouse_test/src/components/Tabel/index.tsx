import React from 'react';
import { ITableConfig } from '../../exports/types';


interface IProps<DataType> {
  table_config: ITableConfig;
  data: DataType[];
  handleTableAction: (actionKey: string, item: DataType) => void;
  countSummary: {keyToCount: keyof DataType},
  handleContentEditable?: (e: React.FormEvent<HTMLTableDataCellElement>, item: DataType) => void;
}

const Table = <DataType extends {id: number | string}>({data, table_config, handleTableAction, countSummary, handleContentEditable}: IProps<DataType>): React.ReactElement => {

  return (
    <table className=" w-[70%] max-w-[800px] min-w-[280px]">
      {/* TABLE HEADERS */}
      <thead className=" bg-slate-300">
        <tr>
          {table_config.table_header.map((table_header) => (
            <th key={table_header.key}>{table_header.label}</th>
          ))}
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody>
        {data.map((item) => (
          <tr key={item.id + "_order"}>
            {table_config.table_header.map((table_header) =>
            // if type of this row = action, display action component
              table_header.action ? (
                <td
                  className={
                    table_header?.style +
                    "  cursor-pointer select-none hover:underline"
                  }
                  key={item.id + table_header.key}
                  onClick={() => {
                    table_header.action && handleTableAction(table_header.action, item);
                  }}
                >
                  {table_header.action}
                </td>
              ) : (
                <td
                  contentEditable={table_header.contentEditable}
                  suppressContentEditableWarning={true}
                  onKeyDown={e => {
                    if (
                      e.code.includes("Digit") ||
                      e.code === "Backspace" ||
                      e.code === "Period" || e.code === "ArrowLeft" || e.code === "ArrowRight"
                    ) {
                    } else {
                      e.preventDefault();
                    }
                  }}
                  onBlur={e => {handleContentEditable && handleContentEditable(e, item);}}
                  className={table_header?.style}
                  key={item.id + table_header.key}
                >
                  {/* item typed as any for avoid typescript error on accessing obj param by external string key */}
                  {(item as any)[table_header.key]}{" "}
                </td>
              )
            )}
          </tr>
        ))}
        {/* SUMMARY ROW */}
        {/* dispayed only if passed key to count */}
        {countSummary.keyToCount && 
          <tr>
            <td colSpan={2} className=" text-right">
              Summary:
            </td>
            <td className=' text-center'>
              {data.reduce((cost, order) => cost + (order[countSummary.keyToCount] as number), 0).toFixed(2)} USD
            </td>
          </tr>
        }
      </tbody>
    </table>
  );
};

export default Table;
