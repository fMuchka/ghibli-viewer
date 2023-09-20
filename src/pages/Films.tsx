import { Card, Table, Typography, Spin } from "antd";

import { useFetchFilmsQuery } from "../app/slices/ghibli-api-slice"
import { ColumnsType } from "antd/es/table";

//const { Title, Text } = Typography;

interface FormattedFilm {
    id: string;
    title: string;
    originalTitle: string;
    originalTitleRomanised: string;
    image: string;
    movieBanner: string;
    description: string;
    director: string;
    producer: string;
    releaseDate: number;
    runningTime: number;
    rtScore: number;
}

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

export default function Films() {
    const { data = [] , isFetching } = useFetchFilmsQuery();

    // only data we care about on this page
    const getFormattedData = (): FormattedFilm[] => {

        const formatted : FormattedFilm[] = [];
        const dataCopy = data.slice();

        dataCopy.forEach(film => {
            const formattedFilm: FormattedFilm = {
                id: film.id,
                title: film.title,
                originalTitle: film.original_title,
                originalTitleRomanised: film.original_title_romanised,
                image: film.image,
                movieBanner: film.movie_banner,
                description: film.description,
                producer: film.producer,
                director: film.director,
                releaseDate: parseInt(film.release_date),
                runningTime: parseInt(film.running_time),
                rtScore: parseInt( film.rt_score )
            };

            formatted.push(formattedFilm);
        })

        return formatted;
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
                sorter: (a, b) => sortFilmByProperties(a, b, "producer")
            },
            {
                title: 'Director',
                dataIndex: 'director',
                key: 'director',
                sorter: (a, b) => sortFilmByProperties(a, b, "director")
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
                sorter: (a, b) => sortFilmByProperties(a, b, "rtScore")
            }
        ];

        return columns;
    }

    const formattedData = getFormattedData();

    return (
        <div className="pageContent">
            <Card> 
                <Table
                    columns={ getColumns() }
                    dataSource={formattedData}

                    rowKey={ (record) => record.id  }
                    
                    loading={ isFetching }
                    pagination={ false }
                />
            </Card>
        </div>
    )
} 