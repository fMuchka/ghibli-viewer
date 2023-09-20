import { Card, Divider, Row, Col, Statistic, Typography, Spin } from "antd";

import { useFetchPeopleQuery } from "../app/slices/ghibli-api-slice"

const { Title, Text } = Typography;

interface FormattedPeople {
    id: string;
    name: string;
    gender: string;
    age: number;
    eyeColor: string;
    hairColor: string;
    films: string[];
    species: string;
}

export function DashboardPeopleCard() {
    const { data = [], isFetching } = useFetchPeopleQuery();

    // only data we care about on this page
    const getFormattedData = (): FormattedPeople[] => {

        const formatted: FormattedPeople[] = [];
        const dataCopy = data.slice();

        dataCopy.forEach(people => {
            const formattedPeople: FormattedPeople = {
                id: people.id,
                name: people.name,
                gender: people.gender,
                age: parseInt(people.age),
                eyeColor: people.eye_color,
                hairColor: people.hair_color,
                films: people.films,
                species: people.species
            };

            formatted.push(formattedPeople);
        })

        return formatted;
    }

    const formattedData = getFormattedData();

    const getNumberOfPeople = () : number => {
        return data.length;
    }

    const getAgeOfYoungestCharacter = (): number => {
        let smallest = Number.POSITIVE_INFINITY;

        formattedData.forEach(e => {
            if (isNaN(e.age) === false) smallest = Math.min(e.age, smallest);
        })

        
        return smallest;
    }

    const getAgeOfOldestCharacter = (): number => {
        let biggest = Number.NEGATIVE_INFINITY;

        formattedData.forEach(e => {
            if (isNaN(e.age) === false) biggest = Math.max(e.age, biggest);
        })

        return biggest;
    }

    const getNumberOfSpeciesAcrossCharacters = (): number => {
        const speciesMap = new Map<string, boolean>();

        formattedData.forEach(e => {
            if (speciesMap.has(e.species) === false) {
                speciesMap.set(e.species, true);
            } 
        })

        return speciesMap.size;
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
                    Variety of Characters
                </Title>
            }

                style={{
                    width: "90%",
                    marginTop: "2rem"
                }}

            >

                <Text className="darkText">
                    Studio Ghibli characters are known for their complexity, relatability, and charm. They are often flawed and imperfect, but they are also brave, kind, and determined.
                    <br />
                    Over <Text strong>{getNumberOfPeople()}</Text> have appeared across their movies. They are of various ages and species.
                </Text>

                <Divider></Divider>

                <Row style={{
                    textAlign: "center"
                }}>
                    <Col span={8}>
                        <Statistic
                            title="Age of Youngest Portrayed Character"
                            value={ getAgeOfYoungestCharacter() }
                        />
                    </Col>


                    <Col span={8}>
                        <Statistic
                            title="Age of Oldest Portrayed Character"
                            value={ getAgeOfOldestCharacter() }
                        />
                    </Col>

                    <Col span={8}>
                        <Statistic
                            title="Number of Portrayed Species"
                            value={getNumberOfSpeciesAcrossCharacters()}
                        />
                    </Col>
                </Row>

            </Card>
    )
} 