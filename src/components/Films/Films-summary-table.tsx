import { Card, Rate, Table, Tooltip } from "antd";
import { FormattedFilm } from "../../pages/Films";
import { ColumnsType } from "antd/es/table";
import CheckableTag from "antd/es/tag/CheckableTag";
import { convertToStarValue } from "@/app/utils";

function sortFilmByProperties(a: FormattedFilm, b: FormattedFilm, sortKey: keyof FormattedFilm): number {

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

interface FilmsSummaryTableProps {
    id: string;
    data: FormattedFilm[];
    isFetching: boolean;
    checkedPerson: string;
    setCheckedPerson: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilmsSummaryTable( props: FilmsSummaryTableProps ) {

    const EVENT_HANDLERS = {
        handlePersonOnChange : (person : string) => {
            if (props.checkedPerson !== person)
                props.setCheckedPerson(person);
            else
                props.setCheckedPerson("")
        },
    }

    function getColumns() {
        const columns: ColumnsType<FormattedFilm> = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'name',
                sorter: (a, b) => sortFilmByProperties(a, b, "title")
            },
            {
                title: 'Producer',
                dataIndex: 'producer',
                key: 'producer',
                sorter: (a, b) => sortFilmByProperties(a, b, "producer"),
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
                title: 'Director',
                dataIndex: 'director',
                key: 'director',
                sorter: (a, b) => sortFilmByProperties(a, b, "director"),
                render: (director) => director.split(",").map((d : string) => (
                    <CheckableTag
                        key={d}
                        checked={d === props.checkedPerson}
                        onChange={() => EVENT_HANDLERS.handlePersonOnChange(d)}
                    >
                        {d.trim()}
                    </CheckableTag>
                ))
            },
            {
                title: 'Release Year',
                dataIndex: 'releaseDate',
                key: 'releaseDate',
                defaultSortOrder: "ascend",
                sorter: (a, b) => sortFilmByProperties(a, b, "releaseDate")
            },
            {
                title: 'Rotten Tomatoes Score',
                dataIndex: 'rtScore',
                key: 'rtScore',
                sorter: (a, b) => sortFilmByProperties(a, b, "rtScore"),
                render: (score) =>
                    <Tooltip title={ `${score} / 100` }>
                        <Rate
                            disabled
                            allowHalf
                            value={convertToStarValue(score)}
                        />
                    </Tooltip>
            }
        ];

        return columns;
    }

    
    return (
        <Card> 
                <Table
                    id={ props.id }
                    columns={ getColumns() }
                    dataSource={ props.data }

                    rowKey={ (record) => record.id  }
                    
                    loading={ props.isFetching }
                    pagination={ false }
                />
            </Card>
    )
}