
import { useState } from "react";

import { Anchor } from "antd";

import { useFetchFilmsQuery } from "@/app/slices/ghibli-api-slice"

import FilmsSummaryTable from "@/components/Films/Films-summary-table";

import FilmsPeopleTable from "@/components/Films/Films-people-table";

//const { Title, Text } = Typography;

export interface FormattedFilm {
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

type PageComponentsKeys = "tableSummary" | "peopleTable";

const PAGE_COMPONENTS: {
    key: PageComponentsKeys,
    id: string,
    title: string
}[] = [
    { key: "tableSummary", id: "tableSummary", title: "Table Summary" },
    { key: "peopleTable", id: "personTable", title: "Producer/Director Overview" }
];



export default function Films() {
    const { data = [], isFetching } = useFetchFilmsQuery();
    const [checkedPerson, setCheckedPerson] = useState<string>("");


    const EVENT_HANDLERS = {
        handleAnchorClick: (
                e: React.MouseEvent<HTMLElement>,
            ) => {
                e.preventDefault();
        }
    } as const;

    // only data we care about on this page
    function getFormattedData() {

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

    
    const formattedData = getFormattedData();

    return (
        <div className="pageContent">
            <Anchor
                direction="horizontal"
                onClick={EVENT_HANDLERS.handleAnchorClick}
                items={PAGE_COMPONENTS.map(comp => {
                    return {
                        key: comp.key,
                        href: comp.id,
                        title: comp.title
                    }
                })}
            >
                
            </Anchor>

            <FilmsSummaryTable
                id={(PAGE_COMPONENTS.find(e => e.key as PageComponentsKeys === "tableSummary") as { key: PageComponentsKeys, title: string, id: string }).id}
                isFetching={isFetching}
                data={formattedData}
                checkedPerson={checkedPerson}
                setCheckedPerson={setCheckedPerson}
            />

            <FilmsPeopleTable
                id={(PAGE_COMPONENTS.find(e => e.key as PageComponentsKeys === "peopleTable") as { key: PageComponentsKeys, title: string, id: string }).id}
                isFetching={isFetching}
                data={formattedData}
                checkedPerson={checkedPerson}
                setCheckedPerson={setCheckedPerson}
            />
        </div>
    )
} 