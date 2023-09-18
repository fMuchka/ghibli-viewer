import { Card, Divider, Row, Col, Statistic, Typography, Spin } from "antd";

import { useFetchFilmsQuery } from "../app/slices/ghibli-api-slice"

const { Title, Text } = Typography;

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

export function DashboardFilmCard() {
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

    const formattedData = getFormattedData();

    // sum of running time across movies
    const getTotalFilmRunningTime = () : number => {
        return formattedData.reduce((valSoFar, currentItem) => {
            return valSoFar + currentItem.runningTime
        }, 0)
    }   

    const getNumberOfFilms = (): number => {
        return data.length;
    }

    const getAverageRottenTomatoesScore = () : number => {
        return (formattedData.reduce((valSoFar, currentItem) => {
            return valSoFar + currentItem.rtScore
        }, 0) / formattedData.length)
    }

    return (
        isFetching
            ? <div style={{
                display: "flex",
                margin: "auto",
                placeContent: "center",
                height: "100%",
                alignItems: "center"
            }}>
                <Spin size="large" className="darkText" />
            </div>
            : <Card title={
                        <Title className={"darkText"} style={{
                            fontSize: "2rem"
                        }} >
                            About Ghibli's Films
                        </Title>
                    }

                    style={{
                        width: "90%",
                        marginTop: "2rem"
                    }}

                >

                    <Text className="darkText">
                        Studio Ghibli is a Japanese animation studio based in Koganei, Tokyo. It has a strong presence in the animation industry. Their work has been well-received by audiences and recognized with numerous awards. <Text underline>Five of the studio's films</Text> are among the ten highest-grossing anime feature films made in Japan.
                    </Text>

                    <Divider></Divider>

                    <Row style={{
                        textAlign: "center"
                    }}>
                        <Col span={8}>
                            <Statistic
                                title="Number of Films"
                                value={getNumberOfFilms()}
                            />
                        </Col>


                        <Col span={8}>
                            <Statistic
                                title="Total Running Time in Minutes"
                                value={getTotalFilmRunningTime()}
                            />
                        </Col>

                        <Col span={8}>
                            <Statistic
                                title="Average Rotten Tomatoes Score"
                                value={getAverageRottenTomatoesScore()}
                                precision={2}
                                suffix="%"
                            />
                        </Col>
                    </Row>

                </Card>
    )
} 