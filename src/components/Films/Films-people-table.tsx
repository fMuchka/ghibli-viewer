import { FormattedFilm } from "@/pages/Films";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import CheckableTag from "antd/es/tag/CheckableTag";

interface FilmsSummaryTableProps {
    id: string;
    data: FormattedFilm[];
    isFetching: boolean;
    checkedPerson: string;
    setCheckedPerson: React.Dispatch<React.SetStateAction<string>>;
}

interface TableData {
    id: string;
    name: string;
    nOfFilmsAsProducer: number;
    nOfFilmsAsDirector: number;
    avgRTScoreProducer: number | null;
    avgRTScoreDirector: number | null;
}

function sortPeopleByProperties(a: TableData, b: TableData, sortKey: keyof TableData): number {

    if (typeof a[sortKey] === "string") {
        const aUpper = (a[sortKey] as string).toUpperCase();
        const bUpper = (b[sortKey] as string).toUpperCase();

        if (aUpper < bUpper) return -1;
        if (aUpper > bUpper) return 1;

        return 0;    
    } else {
        return (a[sortKey] as number ) - (b[sortKey] as number)   
    }
}

export default function FilmsPeopleTable(props: FilmsSummaryTableProps) {

     const EVENT_HANDLERS = {
        handlePersonOnChange : (person : string) => {
            if (props.checkedPerson !== person)
                props.setCheckedPerson(person);
            else
                props.setCheckedPerson("")
        },
    }

    function getTableData() : TableData[] {
        const dataCopy = props.data.slice();

        interface TempPersonObject{
            name: string;
            scoresAsProducer: number[];
            scoresAsDirector: number[];
        } 

        const tempMap = new Map<string, TempPersonObject>();

        dataCopy.forEach(film => {
            const producers = film.producer.split(",");
            const directors = film.director.split(",");
           
            producers.forEach(p => {
                const tr = p.trim();

                if (tempMap.has(tr)) {
                    const temp = tempMap.get(tr) as TempPersonObject;
                    temp.scoresAsProducer.push(film.rtScore);
                } else {
                    tempMap.set(tr, {
                        name: p,
                        scoresAsDirector: [],
                        scoresAsProducer: [film.rtScore]
                    });
                }
            })

            directors.forEach(d => {
                const tr = d.trim();

                if (tempMap.has(tr)) {
                    const temp = tempMap.get(tr) as TempPersonObject;
                    temp.scoresAsDirector.push(film.rtScore);
                } else {
                    tempMap.set(tr, {
                        name: d,
                        scoresAsProducer: [],
                        scoresAsDirector: [film.rtScore]
                    });
                }
            })
        })

        const returnArr : TableData[] = [];

        tempMap.forEach((value, key) => {
            returnArr.push({
                id: key,
                name: value.name,
                nOfFilmsAsDirector: value.scoresAsDirector.length,
                avgRTScoreDirector:
                    !value.scoresAsDirector.length
                        ? null
                        : Math.round(
                            value.scoresAsDirector.reduce((acc, curr) => acc + curr) / value.scoresAsDirector.length
                        ),
                nOfFilmsAsProducer: value.scoresAsProducer.length,
                avgRTScoreProducer:
                    !value.scoresAsProducer.length
                        ? null
                        : Math.round(
                            value.scoresAsProducer.reduce((acc, curr) => acc + curr) / value.scoresAsProducer.length
                        )
            })
        });

        return returnArr;
    }
    
    function getColumns() {
        const columns: ColumnsType<TableData> = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => sortPeopleByProperties(a, b, "name"),
                defaultSortOrder: "descend",
                render: (producer) => producer.split(",").map((p : string) => (
                    <CheckableTag
                        key={p}
                        checked={p === props.checkedPerson}
                        onChange={() => EVENT_HANDLERS.handlePersonOnChange(p)}
                    >
                        {p.trim()}
                    </CheckableTag>
                ))
            },
            {
                title: '# of Films as Producer',
                dataIndex: 'nOfFilmsAsProducer',
                key: 'nOfFilmsAsProducer',
                sorter: (a, b) => sortPeopleByProperties(a, b, "nOfFilmsAsProducer")
            },
            {
                title: 'Avg RT Score as Producer',
                dataIndex: 'avgRTScoreProducer',
                key: 'avgRTScoreProducer',
                sorter: (a, b) => sortPeopleByProperties(a, b, "avgRTScoreProducer"),
            },
            {
                title: '# of Films as Director',
                dataIndex: 'nOfFilmsAsDirector',
                key: 'nOfFilmsAsDirector',
                sorter: (a, b) => sortPeopleByProperties(a, b, "nOfFilmsAsDirector"),
            },
           {
                title: 'Avg RT Score as Director',
                dataIndex: 'avgRTScoreDirector',
                key: 'avgRTScoreDirector',
                sorter: (a, b) => sortPeopleByProperties(a, b, "avgRTScoreDirector"),
            },
        ];

        return columns;
    }
    
    return (
        <Card>
            <Table
                id={ props.id }
                columns={ getColumns() }
                dataSource={ getTableData() }

                rowKey={ (record) => record.id  }
                
                loading={ props.isFetching }
                pagination={ false }
            >

            </Table>
        </Card>
    )
} 